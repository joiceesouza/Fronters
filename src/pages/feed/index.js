import { removerComentario, efeitoRemover } from '../../lib/index.js';
import { sair } from '../../services/index.js';

export const TemplateFeed = () => {
  const main = document.createElement('div');
  main.innerHTML = `
    <header class="container-header">
        <h1 class="logo">FRONTERS</h1>
        <nav id="nav-id">
            <button aria-label="Abrir Menu" id="btn-mobile" aria-haspopup="true" aria-controls="menu" aria-expanded="false">
                <span id="hamburguer"></span>
            </button>
            <div class="mobile-menu">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
            
                <ul id="menu" role="menu">
                    <li><a href="/feed"> <i class="far fa-list-alt"></i> Feed</a></li>
                    <li><a href="/perfil"> <i class="fas fa-user-alt"></i> Perfil</a></li>
                    <li id="logout-id"><p><a href=""> <i class="fas fa-sign-out-alt"></i> Sair</a></p></li>
                </ul>
            
        </nav>
    </header>
    <div class="perfil">
        <h1 class="titulo-feed"> FEED </h1>
    </div>
    <div id="div-gif">
        <img class="gif" src="../img/48531-htmlcssjs.gif" alt="gif">
    </div>
     
    <div id="feed"></div>
    `;

  function carregarPost() {
    const colecaoPost = firebase.firestore().collection('posts');
    colecaoPost
     
     .where('id_usuario', '!=', firebase.auth().currentUser.uid)
      .get().then((snap) => {
        snap.forEach((post) => {
          addPostNaPagina(post);
        });
      });
  }

  carregarPost();

  function addPostNaPagina(post) {
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

    // let conteudoComentarios = '';
    post.data().comentarios.forEach((comentario) => {
      divComentarioPost.prepend(gerarTemplateComentario(comentario, post.id));
    });

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
          <span class="likes">
              <i class="${classeCurtir} fa-heart icone-curtir"></i>
              <span class="numero-curtidas">${post.data().curtidas.length || 0}</span>
          </span>
                  
          <span class="likes"><i class="far fa-comment-alt icone-comentar"></i></span>               
            
      </div>
      <div class="comentarios">
          <input class="escrever-comentario" type="textarea" placeholder="Comentar"></input>
          <button class="publicar-comentario" type="button">Publicar</button>

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
      //templateComentario.dataset.id = comentario;
      templateComentario.innerHTML =
        `
        <header class="header-comentario">
        <img class="foto-perfil-comentario" src="${comentario.foto}" /><p class="nome-comentario">${comentario.nome} </p>
            <p class="hora-comentario">${new Date(comentario.data).toLocaleString()}</p>            
        </header>
        <p class="texto-comentario-template" contentEditable="false">${comentario.textoComentario}</p>
        
        ${(ehDonoDoComentario)
          ? `<i class="fas fa-pen editar-comentario"></i>
          <i class="fas fa-trash-alt deletar-comentario"></i>`
          : ''
        }            
                        
      `;

      const seletorDelete = templateComentario.querySelector('.deletar-comentario');
      
      if (seletorDelete) {
        seletorDelete.addEventListener('click', () => {
          removerComentario(comentario, idDoPost).then(() => {//removendo do firebase
            efeitoRemover(templateComentario)// removendo da tela e fazendo efeito
          });

        });
      }
      
      return templateComentario;

    }

// Efeito remover comentario
// function efeitoRemoverComentario(comentario) {
//   const target = document.querySelector(`[data-id="${comentario}"]`);
//   target.addEventListener('transitionend', () => target.remove());
//   target.style.opacity = '0';
// }

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

  // Menu Hamburguer
  const btnMobile = main.querySelector('#btn-mobile');

  function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const nav = main.querySelector('#nav-id');
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    if (active) {
      event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else { event.currentTarget.setAttribute('aria-label', 'Abrir Menu'); }
  }
  btnMobile.addEventListener('click', toggleMenu);
  btnMobile.addEventListener('touchstart', toggleMenu);


  // sair do site
  const btnSair = main.querySelector('#logout-id');
  btnSair.addEventListener('click', (event) => {
    event.preventDefault();
    sair()
      .then(() => {
        localStorage.clear();
        irParaRota('/login');
      }).catch(() => {
        // An error happened.
      });

  })

  return main;
};
