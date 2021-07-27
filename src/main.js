// Este é o ponto de entrada da sua aplicação

// import { testeCadastro } from './lib/index.js';
import {TemplateLogin, AddEventoLogin, AddEventoLoginComGoogle} from './pages/login/index.js';
import { TemplateCadastro, AddEventoCadastro, PopUpCadastro } from './pages/cadastro/index.js';
import perfil from './pages/perfil/index.js';

const main = document.querySelector('#conteudo-principal');
const init = () => {
    carregarPaginaURL();
    window.addEventListener("hashchange", carregarPaginaURL);
}

function carregarPaginaURL() {
    main.innerHTML = "";
    switch (window.location.hash) {
        case " ":
            main.appendChild(TemplateLogin())
            AddEventoLogin();
            AddEventoLoginComGoogle();
            break;
        case "#perfil":
            main.appendChild(perfil())
            break;
        case "#cadastro":
            main.appendChild(TemplateCadastro())
            AddEventoCadastro();
            PopUpCadastro();
            break;
        default:
            main.appendChild(TemplateLogin())
            AddEventoLogin();
            AddEventoLoginComGoogle();
    }
}



window.addEventListener("load", () => {
    //main.appendChild(login());
    init();

});


// const menuHamburguer = document.querySelector('#menu-hamburguer')
// menuHamburguer.addEventListener("click", () => {

//     const nav = document.querySelector('#nav-list')
//     nav.classList.toggle('active');


// })
















// //Para redirecionar os usuários à página de login, chame signInWithRedirect:
// firebase.auth().signInWithRedirect(provider);



//   //DESLOGAR
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });

