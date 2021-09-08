import { addPostNaPagina, irParaRota } from '../../lib/index.js';
import { sair } from '../../services/index.js';

export const TemplateFeed = () => {
  const main = document.createElement('div');
  main.setAttribute('class', 'pagina');
  main.innerHTML = `
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
                    <li id="logout-id"><p><a href=""> <i class="fas fa-sign-out-alt"></i> Sair</a></p></li>
                </ul>
            
        </nav>
    </header>
    <div class="titulo-principal">
        <h1 class="titulo-feed"> FEED </h1>
    </div>
    <div id="div-gif">
        <img class="gif" src="../img/48531-htmlcssjs.gif" alt="gif">
    </div>
     
    <div id="feed" class="container"></div>
    `;

  function carregarPost() {
    const colecaoPost = firebase.firestore().collection('posts');
    colecaoPost.where('id_usuario', '!=', firebase.auth().currentUser.uid)
      .get().then((snap) => {
        snap.forEach((post) => {
          addPostNaPagina(post, main);
        });
      });
  }

  carregarPost();

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
  });

  return main;
};
