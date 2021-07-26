// Este é o ponto de entrada da sua aplicação

// import { testeCadastro } from './lib/index.js';
import login from './pages/login/index.js';
import cadastro from './pages/cadastro/index.js';
import perfil from './pages/perfil/index.js';

const main = document.querySelector('#conteudo-principal');
const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML = "";
        switch (window.location.hash) {
            case " ":
                main.appendChild(login())
                break;
            case "#perfil":
                main.appendChild(perfil())
                break;
            case "#cadastro":
                main.appendChild(cadastro())
                break;
            default:
                main.appendChild(login())


        }
    })
}



window.addEventListener("load", () => {
    main.appendChild(login());
    init();

});


// const menuHamburguer = document.querySelector('#menu-hamburguer')
// menuHamburguer.addEventListener("click", () => {

//     const nav = document.querySelector('#nav-list')
//     nav.classList.toggle('active');


// })


const botaoDoCadastro = document.querySelector('#botaoFinalizarCadastro');

botaoDoCadastro.addEventListener("click", () => {
    const email = document.getElementById('emailUsuarioCadastro').value;
    const password = document.getElementById('confirmaSenhaUsuario').value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user, 'Cadastrado!');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Infelizmente aconteceu algum erro!', errorCode, errorMessage);
            // ..
        });
})



// //CONECTAR USUARIO com endereço de e-mail e senha

const botaoDoLogin = document.getElementById('botaoLogin');
botaoDoLogin.addEventListener("click", () => {

    const email = document.getElementById('emailUsuario').value;
    const password = document.getElementById('senhaUsuario').value;

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            //window.location = "pagina que ira depois q fazer login"
            const user = userCredential.user;
            console.log(user, 'Deu certo o login! ihull');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Infelizmente aconteceu algum com login!', errorCode, errorMessage);
        });

});




//   //LOGIN GOOGLE
const botaoDoGoogle = document.getElementById('botaoGoogle')
botaoDoGoogle.addEventListener('click', (event) => {
    alert(1)
    event.preventDefault()
    let provider = new firebase.auth.GoogleAuthProvider();

    //Para fazer login com uma janela pop-up, chame signInWithPopup
    firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result)
            alert(1)
            /** @type {firebase.auth.OAuthCredential} */
            let credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // The email of the user's account used.
            let email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            let credential = error.credential;
            // ...
        });





})






// //Para redirecionar os usuários à página de login, chame signInWithRedirect:
// firebase.auth().signInWithRedirect(provider);



//   //DESLOGAR
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });

