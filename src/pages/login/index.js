
export const TemplateLogin = () => {
    const divLogin = document.createElement('div');
    divLogin.innerHTML = `
<div id="banner-section">
  <img id="banner" src="img/banner.jpg" alt="Foto demonstrativo do site">
  <div id="texto-sobre">
    <h2>Fronters</h2>
    <h3>De frente com o Front</h3>
    <h4>Está preparado para invadir 
      o mundo dos Devs? Venha trocar experiências, aprender, ensinar e conhecer novas pessoas</h4>

  </div>
</div>

    <form>
        <div>
            <label for="emailUsuario">Email:</label>
            <input type="email" id="emailUsuario">
        </div>
        <div>
            <label for="senhaUsuario">Senha:</label>
            <input type="password" id="senhaUsuario">
        </div>
        <div>
            <button id="botaoLogin">Login</button>
            <button id="botaoCadastrar"><a href="/#cadastro">Cadastrar</a></button>

        </div>
        <div>
            <button id="botaoGoogle">Entrar com a conta Google</button>
        </div>
    </form>
    `
    return divLogin;

}

// //CONECTAR USUARIO com endereço de e-mail e senha
export const AddEventoLogin = () => {

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
                console.log('Infelizmente aconteceu algum com login! Conta não cadastrada', errorCode, errorMessage);
            });

    });

}

//LOGIN GOOGLE
export const AddEventoLoginComGoogle = () => {

    const botaoDoGoogle = document.getElementById('botaoGoogle')
    botaoDoGoogle.addEventListener('click', (event) => {
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



}
