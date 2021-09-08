/* eslint-disable no-console */
import { irParaRota, mostrarPopup, addPostNaPagina } from '../../lib/index.js';
import { sair } from '../../services/index.js';

export const TemplatePerfil = () => {
  const main = document.createElement('div');
  main.innerHTML = ` 
    <main class="pagina-perfil pagina">
        <header class="container-header">
        <img class="logo" src="/img/logo-fronters.png" alt="Logo">
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

                <p class="conf-atualizacao" hidden>Alterações salvas com sucesso!</p>
            </div>                   

        </div>
        
        <form action="" id="postForm" class="container">
            <div class="div-textarea">
                <textarea type="text" name="post" id="post" cols="30" rows="10" placeholder="O que você quer publicar hoje?"required minlength="1"></textarea>
            </div>        
        
            <div class="upload-feed">
                <input type="file" id="input-escolher-arquivo"></input>
                <div class="msg-carregando"></div>
                <div class="div-img-feed">  
                  <img id="imagem-feed"/> 
                </div> 
              
                         
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
       <div id="feed" class="container"></div>         
       
    </main>

    <div class="popup-wrapper">
        <div class="popup">
            <div class="fechar-popup">X</div>
            <div class="conteudo-popup"></div>
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

  // POPUP
  const popup = main.querySelector('.popup-wrapper');
  const fecharPopup = main.querySelector('.fechar-popup');
  const conteudoPopup = main.querySelector('.conteudo-popup');

  fecharPopup.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  const botaoPublicar = main.querySelector('#publicar');
  botaoPublicar.addEventListener('click', (event) => {
    event.preventDefault();
    const text = main.querySelector('#post').value;
    const linkGithub = main.querySelector('#link-github');

    if (text === '') {
      mostrarPopup(` <h2>Algo deu errado!</h2> 
      <p> Por gentileza, escreva algo antes de salvar </p>`, popup, conteudoPopup);
    } else {
      if (linkGithub.checkValidity() === false) {
        mostrarPopup('<p> Por gentileza, colocar um link válido</p>', popup, conteudoPopup);
        return;
      }

      const objetoUsuario = firebase.auth().currentUser;
      const nomeUsuario = objetoUsuario.displayName;
      const idDoUsuario = objetoUsuario.uid;
      const horaPublicacao = Date.now();
      const fotoUsuario = objetoUsuario.photoURL;
      const refImg = document.querySelector('#imagem-feed').src;

      const post = {
        fotoDoUsuario: fotoUsuario,
        nome: nomeUsuario,
        id_usuario: idDoUsuario,
        data: horaPublicacao,
        texto: text,
        link_github: linkGithub.value,
        curtidas: [],
        comentarios: [],
        imgPost: refImg,
      };

      const colecaoPost = firebase.firestore().collection('posts');
      colecaoPost.add(post)
        .then(() => {
          irParaRota('/perfil');
        });
    }
  });

  // SAIR DO SITE
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
  });

  function carregarPost() {
    const colecaoPost = firebase.firestore().collection('posts');
    colecaoPost
      .orderBy('data')
      .where('id_usuario', '==', firebase.auth().currentUser.uid)
      .get().then((snap) => {
        snap.forEach((post) => {
          addPostNaPagina(post, main);
        });
      });
  }

  carregarPost();

  // ---------------------------------FOTO POST --------------------------//

  // imagem feed
  const escolherArquivo = main.querySelector('#input-escolher-arquivo'); // input file
  const divImagemPost = main.querySelector('#imagem-feed');

  escolherArquivo.addEventListener('change', (e) => {
    e.preventDefault();
    divImagemPost.style.display = 'block';
    divImagemPost.src = '';
    const file = escolherArquivo.files[0];
    divImagemPost.src = URL.createObjectURL(file);

    const addImagemFeed = (photo, callback) => {
      const filePhoto = photo.files[0];
      const posExtensao = filePhoto.name.lastIndexOf('.');
      const novoNomeFoto = Date.now() + filePhoto.name.substr(posExtensao);
      const storageRef = firebase.storage().ref(`imagens/feed/${novoNomeFoto}`);
      storageRef.put(filePhoto).then(() => {
        storageRef.getDownloadURL().then((url) => {
          callback(url);
        });
      });
    };

    const validarUrlFeed = (url) => {
      divImagemPost.src = '';
      divImagemPost.src = url;
    };

    addImagemFeed(escolherArquivo, validarUrlFeed);
  });

  const btnPublicarPost = main.querySelector('#publicar');
  btnPublicarPost.addEventListener('click', (event) => {
    event.preventDefault();
    const atualizarFotoPost = (url, idDoPost) => {
      const documentoPost = firebase.firestore().collection('posts').doc(idDoPost);
      documentoPost.update({
        imgPost: url,

      }).then(() => {
        console.log('Perfil atualizado');
      }).catch(() => {
        //     getError(error);
      });
    };

    atualizarFotoPost(divImagemPost.src);
  });

  // --------------------FOTO PERFIL ---------------------------------------------//
  // aparecer o escolher foto
  const botaoFoto = main.querySelector('#button-foto');
  const esconderButton = main.querySelector('#foto-id');
  botaoFoto.addEventListener('click', () => {
    esconderButton.style.opacity = 1;
  });

  // carregar imagens perfil do usuário
  const carregarImagens = main.querySelector('#foto-id');
  const imagemPerfil = main.querySelector('#image');
  const botaoSalvarFoto = main.querySelector('#btn-salvar');
  carregarImagens.addEventListener('change', () => {
    imagemPerfil.src = '';
    const file = carregarImagens.files[0];
    console.log('file', file);
    imagemPerfil.src = URL.createObjectURL(file);

    const addImagem = (photo, callback) => {
      const filePhoto = photo.files[0];
      const posExtensao = filePhoto.name.lastIndexOf('.');
      const novoNomeFoto = Date.now() + filePhoto.name.substr(posExtensao);
      const storageRef = firebase.storage().ref(`imagens/perfil/${novoNomeFoto}`);
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
  });

  const btnSaveProfile = main.querySelector('#btn-salvar');
  btnSaveProfile.addEventListener('click', (event) => {
    const confirmMessage = main.querySelector('.conf-atualizacao');
    carregarImagens.style.display = 'none';
    btnSaveProfile.style.display = 'none';
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
  });

  // MENU HAMBURGUER
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

  return main;
};
