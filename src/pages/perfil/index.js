/* eslint-disable no-console */
import { deletarPost, irParaRota } from '../../lib/index.js';
import { addImagem, sair } from '../../services/index.js';


export const TemplatePerfil = () => {
  let mainUrl=''
  const main = document.createElement('div');
  main.innerHTML = ` 
    <main class="pagina-perfil">
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
                <li><a href="" id="logout-id"> <i class="fas fa-sign-out-alt"></i> Sair</a></li>
               
            </ul>
        </nav>
        </header>

        <div class="perfil">
            <div class="foto">
                
                <img src="${firebase.auth().currentUser.photoURL || '/img/profile.png'}" class="foto-perfil" id="image" alt="Foto do perfil" />
                <button id="button-foto" src="img/camera.png" alt="botao perfil"><i class="fas fa-camera" id="escolher-foto"></i></button>
                <input type="file" id="foto-id"></input>
                <button type="submit" id="btn-salvar">Salvar</button>

                <div class="editar-nome"><p class="nome" contentEditable='false'>${firebase.auth().currentUser.displayName || 'Nome do Usuário'}</p><i class="fas fa-save btn-salvar-edicao-nome"></i><i class="fas fa-edit btn-editar-nome"></i></div>

                <p class="conf-atualizaçao" id="conf-atualizaçao" hidden>Alterações salvas com sucesso!</p>
            </div>                   

        </div>
        
        <form action="" id="postForm" class="container">
            <div class="div-textarea">
                <textarea type="text" name="post" id="post" cols="30" rows="10" placeholder="O que você quer publicar hoje?"required minlength="1"></textarea>
            </div>        
        
            <div class="upload-feed">
                <input type="file" id="foto"></input>
                <div class="msg-carregando"></div>  
                <img id="imagem-feed"/>   
                <button id="carregar-img"> Salvar </button>          
            </div>
            <div class="div-link-do-github">
                <i class="fab fa-github icone-github"></i>
                <input id="link-github" type="url" placeholder="Colocar link do GitHub"/>
            </div>
            <div class="btn-publicar">
                <button type="submit" id="publicar">Publicar</button>
            </div>
        </form>
        
        <div class="minhas-publicacoes container"><h2>Minhas Publicações</h2></div>
        <div id="div-minhas-publicacoes" class="container"></div>
            


       
    </main>

    <div class="popup-wrapper">
        <div class="popup">
            <div class="fechar-popup">X</div>
            <div class="conteudo-popup">
                <h2>Cadastro finalizado com sucesso!</h2>
                <button id="loginPopup"><a href="/#">Fazer Login</a></button>
            </div>
        </div>
    </div>

    `;

  // EDITAR NOME USUÁRIO
  main.querySelector('.btn-editar-nome').addEventListener('click', () => {
    const nomeEditar = main.querySelector('.nome');
    const btnSalvarEdicao = main.querySelector('.btn-salvar-edicao-nome');
    nomeEditar.contentEditable = true;
    nomeEditar.focus();
    btnSalvarEdicao.style.display = 'block';
  });

  // SALVAR NOME USUÁRIO
  main.querySelector('.btn-salvar-edicao-nome').addEventListener('click', (event) => {
    event.preventDefault();
    const nomeEditar = main.querySelector('.nome');
    const btnSalvarEdicao = main.querySelector('.btn-salvar-edicao-nome');
    nomeEditar.contentEditable = false;
    btnSalvarEdicao.style.display = 'none';
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: nomeEditar.innerHTML,
    }).then(() => {
      console.log('Nome atualizado');
    });
  });

  const botaoPublicar = main.querySelector('#publicar');
  botaoPublicar.addEventListener('click', (event) => {
    event.preventDefault();
    const text = main.querySelector('#post').value;
    const linkGithub = main.querySelector('#link-github');
    // pop up
    const popup = main.querySelector('.popup-wrapper');
    const fecharPopup = main.querySelector('.fechar-popup');
    const conteudoPopup = main.querySelector('.conteudo-popup');

    if (text === '') {
      popup.style.display = 'block';
      conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
      <p> Por gentileza, escreva algo antes de salvar </p>`;
      fecharPopup.style.display = 'block';
      fecharPopup.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    } else {
      if (linkGithub.checkValidity() === false) {
        alert('Por gentileza, colocar um link válido');
        return;
      }

      const objetoUsuario = firebase.auth().currentUser;
      const nomeUsuario = objetoUsuario.displayName;
      const idDoUsuario = objetoUsuario.uid;
      const horaPublicacao = new Date().toLocaleString();
      const fotoUsuario = objetoUsuario.photoURL;
 //     const fotofeed = objetoUsuario.photoURL.imagemPost

      const refImg = main.querySelector('#foto').value

      const post = {
        fotoDoUsuario: fotoUsuario,
        nome: nomeUsuario,
        id_usuario: idDoUsuario,
        data: horaPublicacao,
        texto: text,
        link_github: linkGithub.value,
        curtidas: [],
        comentarios: [],
        imgPost: mainUrl
      };

      const colecaoPost = firebase.firestore().collection('posts');
      colecaoPost.add(post)
        .then(() => {
          window.history.pushState({}, null, '/perfil');
          const popStateEvent = new PopStateEvent('popstate', {});
          dispatchEvent(popStateEvent);
        });
    }
  });

  // sair do site 
  const btnSair = main.querySelector('#logout-id');
  btnSair.addEventListener('click', (event) => {
    event.preventDefault(); 
    sair().then(() => { 
    localStorage.clear(); irParaRota('/login'); })
    .catch(() => { 
    // An error happened. }); 
    }) 
  }) 

  function carregarPost() {
    const colecaoPost = firebase.firestore().collection('posts');
    colecaoPost.where('id_usuario', '==', firebase.auth().currentUser.uid)

      .get().then((snap) => {
        snap.forEach((post) => {
          addPostNaPagina(post);
        });
      });
  }

  carregarPost();

  function addPostNaPagina(post) {
    const postTemplate = document.createElement('div');
    postTemplate.setAttribute('class', 'div-post container');
    postTemplate.dataset.id = post.id;
    postTemplate.innerHTML = `
                
        <input type="hidden" class="id-post" value="${post.id}"/>
        <div class="nome-usuario">
            <div class="foto-usuario-comentario">
                <img class="foto-perfil-comentario" src="${firebase.auth().currentUser.photoURL || '/img/profile.png'}" />
            </div>
            ${post.data().nome || post.data().nomeSalvoPerfil} 
            <p class="fez-publicacao">publicou.</p>  <i class="fas fa-pen editar-publicacao" title="Editar"></i> 
        </div>
        
        <div class="texto-publicado-usuario">${post.data().texto}</div>
        <img class="foto-feed" src="${post.data().imgPost || "../../img/foto-projeto.png"}" />
        <div class="conteudo-editar-texto">
            <input class="campo-editar-texto" />
        </div>
        
        <div class="div-link-github-publicado">
            <i class="fab fa-github icone-github"></i>
            <div class="link-github">${post.data().link_github}</div> 
        </div>
        <div class="conteudo-editar-github">
            <input class="campo-editar-github" />
        </div>

        <div class="icones">
            <span class="likes">
                <i class="far fa-heart icone-curtir"></i>
                <span class="numero-curtidas"> ${post.data().curtidas.length || 0}</span>
            </span>
                    
            <span class="likes"><i class="far fa-comment-alt icone-comentar"></i></span>
            <span class="deletar"><i class="fas fa-trash-alt icone-deletar" title="Excluir"></i></span>
             
        </div>

        <div class="comentarios">
            <input class="escrever-comentario" type="textarea"></input>
            <button class="publicar-comentario" type="button">Publicar</button>
        </div>
        
        <button type="button" class="salvar-edicao id=""">Salvar</button>
         <div class="comentario-publicado"></div>            

        <div class="popup-wrapper">
         <div class="popup">
                 <div class="fechar-popup">X</div>
             <div class="conteudo-popup">
                 <h2>Tem certeza que deseja deletar sua postagem?</h2>
                 <p> <button type="button" class="delete-class">Deletar</button> </p>
             </div>
         </div>
        </div>
    `;
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
    });

    postTemplate.querySelector('.publicar-comentario').addEventListener('click', () => {
      const comentarioEscrito = postTemplate.querySelector('.escrever-comentario');
      const divComentarioPublicado = postTemplate.querySelector('.comentario-publicado');
      const inputComentar = postTemplate.querySelector('.comentarios');

      divComentarioPublicado.innerHTML = comentarioEscrito.value;
      divComentarioPublicado.style.display = 'block';
      inputComentar.style.display = 'none';
      comentarioEscrito.value = '';
    });

    // EDITAR PUBLICAÇÃO
    postTemplate.querySelector('.editar-publicacao').addEventListener('click', () => {
      const salvarEdicao = postTemplate.querySelector('.salvar-edicao');
      salvarEdicao.style.display = 'block';

      // texto
      const conteudoEditarTexto = postTemplate.querySelector('.conteudo-editar-texto');
      conteudoEditarTexto.style.display = 'block';
      const editarTexto = postTemplate.querySelector('.campo-editar-texto');
      const divTextoEscrito = postTemplate.querySelector('.texto-publicado-usuario');
      const textoEscrito = divTextoEscrito.innerHTML;
      divTextoEscrito.style.display = 'none';

      // link github
      const conteudoEditarGithub = postTemplate.querySelector('.conteudo-editar-github');
      conteudoEditarGithub.style.display = 'block';
      const editarGithub = postTemplate.querySelector('.campo-editar-github');
      const divGithubEscrito = postTemplate.querySelector('.link-github');
      const linkGithubEscrito = divGithubEscrito.innerHTML;
      divGithubEscrito.style.display = 'none';

      editarTexto.value = textoEscrito;
      editarGithub.value = linkGithubEscrito;
    });

    // SALVAR EDICAO
    postTemplate.querySelector('.salvar-edicao').addEventListener('click', () => {
      const valorInputEditarTexto = postTemplate.querySelector('.campo-editar-texto').value;
      const valorInputEditarGithub = postTemplate.querySelector('.campo-editar-github').value;

      const divTextoEscrito = postTemplate.querySelector('.texto-publicado-usuario');
      const divLinkGithubEscrito = postTemplate.querySelector('.link-github');
      const inputEdicaoTexto = postTemplate.querySelector('.conteudo-editar-texto');
      const inputEdicaoLink = postTemplate.querySelector('.conteudo-editar-github');
      const idPost = postTemplate.querySelector('.id-post').value;

      inputEdicaoTexto.style.display = 'none';
      inputEdicaoLink.style.display = 'none';
      divTextoEscrito.style.display = 'block';
      divLinkGithubEscrito.style.display = 'block';

      divTextoEscrito.innerHTML = valorInputEditarTexto;
      divLinkGithubEscrito.innerHTML = valorInputEditarGithub;

      firebase.firestore().collection('posts').doc(idPost)
        .update({
          texto: valorInputEditarTexto,
          link_github: valorInputEditarGithub,
        })
        .then(() => {
          console.log('atualizado');
        })
        .catch((error) => {
          console.log('não atualizado-', error);
        });
    });

    // Efeito remover post
    function efeitoRemoverPost(postId) {
      const target = document.querySelector(`[data-id="${postId}"]`);
      target.addEventListener('transitionend', () => target.remove());
      target.style.opacity = '0';
    }

    // Deletar post
    const deletar = postTemplate.querySelector('.icone-deletar');
    deletar.addEventListener('click', () => {
      const popup = postTemplate.querySelector('.popup-wrapper');
      const fecharPopup = postTemplate.querySelector('.fechar-popup');
      const conteudoPopup = postTemplate.querySelector('.conteudo-popup');
      popup.style.display = 'block';
      conteudoPopup.innerHTML = ` <h2>Tem certeza que deseja deletar sua postagem?</h2> 
            <p> <button type="button" class="delete-class">Deletar</button> </p>`;
      fecharPopup.style.display = 'block';
      fecharPopup.addEventListener('click', () => {
        popup.style.display = 'none';
      });
      const button = postTemplate.querySelector('.delete-class');
      button.addEventListener('click', () => {
        deletarPost(post.id).then(() => {
          efeitoRemoverPost(post.id);
        });
        popup.style.display = 'none';
      });
    });

    // EM ANDAMENTO ( FOTO PARA APARECER NO POST)   

   /*         main.querySelector('#btn-foto').addEventListener('click', (event) => {
                event.preventDefault();
                const btnfile = main.querySelector('#photoFeed');
                btnfile.style.visibility = 'visible';
              });*/
 


            
              
                
          /*      imagemPost.src = '';
                //const file = event.target.files[0];
                const file = imagensFeed.files[0];
                imagemPost.src = URL.createObjectURL(file);
                
                const addImagemFeed = (photo, callback) => {
                    const file = photo.files[0];
                    const storageRef = firebase.storage().ref(`imagens/feed/${file.name}`);
                    storageRef.put(file).then(() => {
                      storageRef.getDownloadURL().then((url) => {
                        callback(url);
                      });
                    });
                  };

                const validarUrlFeed = (url) => {
                    imagemPost.src = '';
                    imagemPost.src = url;
                    botaoSalvarFotoFeed.style.display = "block"
                };

                addImagemFeed(imagensFeed, validarUrlFeed);*/
            


  /*          const idImagemFeed = main.querySelector('#foto')
            idImagemFeed.addEventListener('click', () => {
             /*   const username = firebase.auth().currentUser.displayName;
                const userImageUrl = firebase.auth().currentUser.photoURL;*/
       /*         const ref = firebase.storage().ref('imagens/feed');
                //ref caminho onde ira salvar a imagem
                const file = main.querySelector('#carregar-img').files[0];
                //file 
                const name = `${new Date()}-${file.name}`;
                const metadata = {
                    contentType: file.type,
                };
                const task = ref.child(name).put(file, metadata);
                //child nomeia a imagem
                //put comando q faz o upload da imagem
                task
                    .then((snapshot) => snapshot.ref.getDownloadURL())
                    .then((url) => {
                        console.log('deu certo')
                        const imagefeed = main.querySelector('#imagem-feed')
                        imagefeed.src = url
              //      photoMsgMobile.innerHTML = ''
                    });

                

                updateUserProfile(inputName.value, idImagemFeed.src);
                    confirmMessage.hidden = false;
                    main.style.display = 'block';
           })*/      
   
    main.querySelector('#div-minhas-publicacoes').appendChild(postTemplate);
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

  // aparecer o escolher foto
  const botaoFoto = main.querySelector('#button-foto');
  const esconderButton = main.querySelector('#foto-id');
  botaoFoto.addEventListener('click', () => {
    esconderButton.style.opacity = 1;
  });

  // carregar imagens perfil do usuário
  const carregarImagens = main.querySelector('#foto-id'); // input file
  const imagemPerfil = main.querySelector('#image');
  const botaoSalvarFoto = main.querySelector('#btn-salvar');
  carregarImagens.addEventListener('change', () => {
    imagemPerfil.src = '';
    const file = carregarImagens.files[0];
    imagemPerfil.src = URL.createObjectURL(file);
    const validarUrl = (url) => {
      imagemPerfil.src = '';
      imagemPerfil.src = url;
      botaoSalvarFoto.style.display = 'block';
    };
    addImagem(carregarImagens, validarUrl);
  });
  

  /*const carregarImagens = main.querySelector('#foto-id'); // input file
  const imagemPerfil = main.querySelector('#image');
  const botaoSalvarFoto = main.querySelector('#btn-salvar');
  //   const inputPhoto = container.querySelector('#photo');
  carregarImagens.addEventListener('change', () => {
    imagemPerfil.src = '';
    // const file = event.target.files[0];
    const file = carregarImagens.files[0];
    console.log('file', file);
    imagemPerfil.src = URL.createObjectURL(file);

    const addImagem = (photo, callback) => {
      const filePhoto = photo.files[0];
      const storageRef = firebase.storage().ref(`imagens/${filePhoto.name}`);
      storageRef.put(file).then(() => {
        storageRef.getDownloadURL().then((url) => {
          callback(url);
        });
      });
    };

    const validarUrl = (url) => {
      imagemPerfil.src = '';
      imagemPerfil.src = url;
      botaoSalvarFoto.style.display = 'block';
    };

    addImagem(carregarImagens, validarUrl);
  });*/

 /* const inputName = main.querySelector('.nome');
  const confirmMessage = main.querySelector('#conf-atualizaçao');
  const btnSaveProfile = main.querySelector('#btn-salvar');
  btnSaveProfile.addEventListener('click', (event) => {
    event.preventDefault();
    const atualizarPerfil = (url) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        photoURL: url,
      }).then(() => {
        console.log('Perfil atualizado');
      }).catch(() => {
        //     getError(error);
      });
    };
    atualizarPerfil(imagemPerfil.src);
    confirmMessage.hidden = false;
    // main.style.display = 'block';
  });*/

  //imagem feed
  const imagensFeed = main.querySelector('#foto'); //input file
  const imagemPost = main.querySelector('#imagem-feed');
  const botaoSalvarFotoFeed = main.querySelector('#carregar-img');
  imagensFeed.addEventListener('change', () => {
      imagemPost.src = '';
      //const file = event.target.files[0];
      const file = imagensFeed.files[0];
      imagemPost.src = URL.createObjectURL(file);

      const validarUrlFeed = (urlFeed) => {
        imagemPost.src = '';
        imagemPost.src = urlFeed;
        botaoSalvarFotoFeed.style.display = "block"
      //  console.log(urlFeed)
        mainUrl =urlFeed
      };
      
      addImagem(imagensFeed, validarUrlFeed);
      console.log("Main/" +mainUrl)    
  })  
  
  return main;
};

/*          const goBackToFeed = () => {
                    getTheRoad('/feed');
                  };

                  const goBackToProfileFeed = () => {
                    getTheRoad('/profile');
                  };

                    const iconFeed = main.querySelector('#feed-id');
                    iconFeed.addEventListener('click', (event) => {
                        event.preventDefault();
                        goBackToFeed();
                    }); */

/*       const iconPerson = container.querySelector('#person-btn');
                    iconPerson.addEventListener('click', (event) => {
                        event.preventDefault();
                        goBackToProfileFeed();
                    }); */

//          });
/* const msgImg = main.querySelector('.msg-carregando');

            msgImg.innerHTML = 'Carregando imagem...'; */

/*   const ref = firebase.storage().ref('imagens/perfil');
            //ref caminho onde ira salvar a imagem
            const file = main.querySelector('#foto-id').files[0];
            //file
            const name = `${new Date()}-${file.name}`;
            const metadata = {
                contentType: file.type,
            };
            const task = ref.child(name).put(file, metadata);
            //child nomeia a imagem
            //put comando q faz o upload da imagem
            task
                .then((snapshot) => snapshot.ref.getDownloadURL())
                .then((url) => {
                    console.log('deu certo')
                //    msgImg.innerHTML = ''
                    const image = main.querySelector('#image');
                    image.src = url;

                }); */
