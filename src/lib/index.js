export function ocultarSenha(seletorInputSenha, seletorOlho) {
  const inputSenha = document.querySelector(seletorInputSenha);
  const iconeOcultar = document.querySelector(seletorOlho);

  if (inputSenha.type === 'password') {
    inputSenha.type = 'text';
    iconeOcultar.classList.replace('fa-eye-slash', 'fa-eye');
  } else {
    inputSenha.type = 'password';
    iconeOcultar.classList.replace('fa-eye', 'fa-eye-slash');
  }
}

export function deletarPost(postId) {
  const postCollection = firebase.firestore().collection('posts');
  return postCollection.doc(postId).delete();
}

export function irParaRota(rota) {
  window.history.pushState({}, null, rota);
  const popStateEvent = new PopStateEvent('popstate', {});
  dispatchEvent(popStateEvent);
}

export function mostrarPopup(mensagem, popup, divConteudoPopup) {
  divConteudoPopup.innerHTML = mensagem
  popup.style.display = 'block';

}

export function removerComentario(comentario, idDoPost) {
   const documentoPost = firebase.firestore().collection('posts').doc(idDoPost);
  return documentoPost.update({
    comentarios: firebase.firestore.FieldValue.arrayRemove(comentario),
  });
}

export function efeitoRemover(target) {
  target.addEventListener('transitionend', () => target.remove());
  target.style.opacity = '0';
}

export function addPostNaPagina(post, main) {
  const postTemplate = document.createElement('div');
  postTemplate.setAttribute('class', 'div-post');
  const arrayMinhasCurtidas = post.data().curtidas.filter((item) => {
    if (item.uid === firebase.auth().currentUser.uid) {
      return true;
    }
    return false;
  });

  const classeCurtir = (arrayMinhasCurtidas.length === 1) ? 'fas' : 'far';
  const divComentarioPost = document.createElement('div');
  divComentarioPost.setAttribute('class', 'mostrar-comentarios');

  post.data().comentarios.forEach((comentario) => {
    divComentarioPost.prepend(gerarTemplateComentario(comentario, post.id));
  });
  
const user = firebase.auth().currentUser.uid
const donoPost = post.data().id_usuario;
const donoDoPost = (user === donoPost);

  postTemplate.innerHTML = `
    <input type="hidden" class="id-post" value="${post.id}"/>
    <div><p class="hora-post">${new Date(post.data().data).toLocaleString()}</p></div>
    <div class="nome-usuario">
      <div class="foto-usuario-autor">
        <img src="${post.data().fotoDoUsuario}" id="imagem-id" class="foto-perfil-autor" />
      </div>
        ${post.data().nome || post.data().nomeSalvoPerfil } 
        <p class="fez-publicacao">publicou.</p> 
    </div>
    
    <div class="texto-publicado-usuario">${post.data().texto}</div>
    <div class="img-publicada">
        <img class="foto-publicada" src="../../img/foto-projeto.png">
    </div>
    <div class="conteudo-editar-texto">
        <input class="campo-editar-texto" />
    </div>
    
    <div class="div-link-github-publicado">
        <i class="fab fa-github"></i>
        <div class="link-github">${post.data().link_github}</div> 
    </div>
    <div class="conteudo-editar-github">
        <input class="campo-editar-github" />
    </div>

    <div class="icones">        
        <span class="icone-likes">
            <i class="${classeCurtir} fa-heart icone-curtir"></i>
            <span class="numero-curtidas"> ${post.data().curtidas.length || 0}</span>
            <i class="far fa-comment-alt icone-comentar"></i>
        </span>
         
        ${(donoDoPost)? `
        <span class="icone-acao">
          <i class="far fa-save salvar-edicao" title="Salvar"></i>
          <i class="fas fa-pen editar-publicacao" title="Editar"></i>
          <i class="fas fa-trash-alt icone-deletar" title="Excluir"></i>
        </span>               
        `
        : ""
      }           
     
    </div>
    <div class="comentarios">
        <input class="escrever-comentario" type="textarea" placeholder="Comentar"></input>
        <button class="publicar-comentario" type="button">Publicar</button>
    </div>
         
    <div class="popup-wrapper">
      <div class="popup">
        <div class="fechar-popup">X</div>
        <div class="conteudo-popup"></div>             
      </div>
    </div>        

`;

  postTemplate.appendChild(divComentarioPost);

  const linkGithub = postTemplate.querySelector('.link-github');
  const conteudoLinkGithub = linkGithub.innerHTML;
  const divlinkGithub = postTemplate.querySelector('.div-link-github-publicado');
  const editarlinkGithub = postTemplate.querySelector('.conteudo-editar-github');

  if (conteudoLinkGithub === '') {
    divlinkGithub.style.display = 'none';
    editarlinkGithub.style.display = 'none';
  }

  postTemplate.querySelector('.icone-comentar').addEventListener('click', () => {
    postTemplate.querySelector('.comentarios').style.display = 'block';
    postTemplate.querySelector('.escrever-comentario').focus();
    const mostrarComentarios = postTemplate.querySelector('.mostrar-comentarios');
    mostrarComentarios.style.display = 'block';
  });

  function comentar(idDoPost, texto) {
      const comentario = {
      uid: firebase.auth().currentUser.uid,
      nome: firebase.auth().currentUser.displayName,
      foto: firebase.auth().currentUser.photoURL,
      textoComentario: texto,
      data: Date.now()

    };

    const documentoPost = firebase.firestore().collection('posts').doc(idDoPost);
    documentoPost.update({
      comentarios: firebase.firestore.FieldValue.arrayUnion(comentario),
    });
    return comentario;
  }

  function gerarTemplateComentario(comentario, idDoPost) {
    const ehDonoDoComentario = (comentario.uid === firebase.auth().currentUser.uid);
    const templateComentario = document.createElement('div');
    templateComentario.setAttribute('class', 'template-comentario');
    templateComentario.innerHTML =
      `
      <header>
      <p class="hora-comentario">${new Date(comentario.data).toLocaleString()}</p> 
        <div class="header-comentario">
          <img class="foto-perfil-comentario" src="${comentario.foto}" /><p class="nome-comentario">${comentario.nome} </p>
        </div>       
      </header>
      <p class="texto-comentario-template" contentEditable="false">${comentario.textoComentario}</p>
      
      ${(ehDonoDoComentario)
        ? `<div class="icones-template-comentario">
            <span><i class="far fa-save salvar-edicao-comentario"></i></span>
            <span><i class="fas fa-pen editar-comentario"></i>
            <i class="fas fa-trash-alt deletar-comentario"></i></span>
        </div>
        `          
        : ''
      }            
                      
    `;

    if (ehDonoDoComentario) {
      const seletorDelete = templateComentario.querySelector('.deletar-comentario');
      seletorDelete.addEventListener('click', () => {
        removerComentario(comentario, idDoPost).then(() => {//removendo do firebase
          efeitoRemover(templateComentario)// removendo da tela e fazendo efeito
        });
      });

      const seletorEditar = templateComentario.querySelector('.editar-comentario')
      seletorEditar.addEventListener('click', () => {
        const btnSalvarEdicaoComentario = templateComentario.querySelector('.salvar-edicao-comentario');
        const textoComentario = templateComentario.querySelector('.texto-comentario-template');
        textoComentario.focus();
        textoComentario.contentEditable = true;
        btnSalvarEdicaoComentario.style.display = 'block';
      })

      //salvar edicão comentário
      templateComentario.querySelector('.salvar-edicao-comentario').addEventListener('click', (event) => {
        event.preventDefault();
        const textoDoComentario = templateComentario.querySelector('.texto-comentario-template');
        const btnSalvarEdicaoComentario = templateComentario.querySelector('.salvar-edicao-comentario')
        btnSalvarEdicaoComentario.style.display = 'none'
        textoDoComentario.contentEditable = false;

        //atualizando texto do comentário atual
        comentario.textoComentario = textoDoComentario.innerHTML;
        const documentoPost = firebase.firestore().collection('posts').doc(idDoPost);
        documentoPost.update({
          comentarios: [comentario]
        }).then(() => {
          console.log('Comentario atualizado');
        });
        return comentario;
      });

    }
    return templateComentario;
  }
  
  postTemplate.querySelector('.publicar-comentario').addEventListener('click', () => {
    const idDoPost = postTemplate.querySelector('.id-post').value;
    const comentarioEscrito = postTemplate.querySelector('.escrever-comentario');
    const divComentarioPublicado = postTemplate.querySelector('.mostrar-comentarios');
    const inputComentar = postTemplate.querySelector('.comentarios');
    const objetoComentario = comentar(idDoPost, comentarioEscrito.value);
    const templateComentarioPublicado = gerarTemplateComentario(objetoComentario, idDoPost);

    divComentarioPublicado.prepend(templateComentarioPublicado);
    inputComentar.style.display = 'none';
    comentarioEscrito.value = '';
  });

 // pop up
 const popup = postTemplate.querySelector('.popup-wrapper');
 const fecharPopup = postTemplate.querySelector('.fechar-popup');
 const conteudoPopup = postTemplate.querySelector('.conteudo-popup');

 fecharPopup.addEventListener('click', () => {
   popup.style.display = 'none';
 });

  if(user === donoPost) {

  // EDITAR PUBLICAÇÃO
  postTemplate.querySelector('.editar-publicacao').addEventListener('click', () => {
    const salvarEdicao = postTemplate.querySelector('.salvar-edicao');
    salvarEdicao.style.display = 'inline-block';

    // texto
    const divTextoEscrito = postTemplate.querySelector('.texto-publicado-usuario');
    divTextoEscrito.contentEditable = true;
    divTextoEscrito.focus()

    // link github
    const divGithubEscrito = postTemplate.querySelector('.link-github');
    divGithubEscrito.contentEditable = true;

  });

  // SALVAR EDICAO
  postTemplate.querySelector('.salvar-edicao').addEventListener('click', (event) => {
    event.preventDefault();
    const idPost = postTemplate.querySelector('.id-post').value;
    const divTextoEscrito = postTemplate.querySelector('.texto-publicado-usuario');
    const divGithubEscrito = postTemplate.querySelector('.link-github');
    const btnSalvarEdicao = postTemplate.querySelector('.salvar-edicao');
    btnSalvarEdicao.style.display = 'none';
    divTextoEscrito.contentEditable = false;
    divGithubEscrito.contentEditable = false;
    firebase.firestore().collection('posts').doc(idPost)
      .update({
        texto: divTextoEscrito.innerHTML,
        link_github: divGithubEscrito.innerHTML,
      })
      .then(() => {
        console.log('atualizado');
      })
      .catch((error) => {
        console.log('não atualizado-', error);
      });

  });


  // Deletar post
  const deletar = postTemplate.querySelector('.icone-deletar');
  deletar.addEventListener('click', () => {
    mostrarPopup(` <h2>Tem certeza que deseja deletar sua postagem?</h2> 
    <p> <button type="button" class="delete-class">Deletar</button> </p>`, popup, conteudoPopup)

    const button = document.querySelector('.delete-class');
    button.addEventListener('click', () => {
      deletarPost(post.id).then(() => {
        // efeitoRemover(post.id);
        efeitoRemover(postTemplate);
      });
      popup.style.display = 'none';
    });
  });
  }

  function curtirPost(idDoPost) {
    const curtida = {
      uid: firebase.auth().currentUser.uid,
      nome: firebase.auth().currentUser.displayName,
    };

    const documentoPost = firebase.firestore().collection('posts').doc(idDoPost);
    documentoPost.update({
      curtidas: firebase.firestore.FieldValue.arrayUnion(curtida),
    });
  }

  function descurtirPost(idDoPost) {
    const curtida = {
      uid: firebase.auth().currentUser.uid,
      nome: firebase.auth().currentUser.displayName,
    };

    const documentoPost = firebase.firestore().collection('posts').doc(idDoPost);
    documentoPost.update({
      curtidas: firebase.firestore.FieldValue.arrayRemove(curtida),
    });
  }

  const curtir = postTemplate.querySelector('.icone-curtir');
  curtir.addEventListener('click', () => {
    // fas = coração preenchido
    const naoEstavaCurtido = curtir.classList.contains('far');
    const numeroDeCurtidas = postTemplate.querySelector('.numero-curtidas');
    let conteudoNumeroDeCurtidas = Number(numeroDeCurtidas.innerHTML);
    const idPost = postTemplate.querySelector('.id-post').value;

    if (naoEstavaCurtido === true) {
      curtir.classList.replace('far', 'fas');
      conteudoNumeroDeCurtidas++;
      curtirPost(idPost);
    } else {
      curtir.classList.replace('fas', 'far');
      conteudoNumeroDeCurtidas--;
      descurtirPost(idPost);
    }

    numeroDeCurtidas.innerHTML = conteudoNumeroDeCurtidas;
  });

  main.querySelector('#feed').appendChild(postTemplate);
}