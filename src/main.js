// Este é o ponto de entrada da sua aplicação

// import { testeCadastro } from './lib/index.js';
import {TemplateLogin, AddEventoLogin, AddEventoLoginComGoogle, AddEventoLoginComGitHub } from './pages/login/index.js';
import { TemplateCadastro, AddEventoCadastro, PopUpCadastro } from './pages/cadastro/index.js';
import perfil from './pages/perfil/index.js';
import {TemplateRecuperar, PopUpRecuperar}  from './pages/recuperar/index.js';

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
            AddEventoLoginComGitHub();
            break;
        case "#perfil":
            main.appendChild(perfil())
            break;
        case "#cadastro":
            main.appendChild(TemplateCadastro())
            AddEventoCadastro();
            PopUpCadastro();
            break;
        case "#recuperar":
            main.appendChild(TemplateRecuperar());
            PopUpRecuperar();
            break;
        default:
            main.appendChild(TemplateLogin())
            AddEventoLogin();
            AddEventoLoginComGoogle();
            AddEventoLoginComGitHub();
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



// Este é o ponto de entrada da sua aplicação


