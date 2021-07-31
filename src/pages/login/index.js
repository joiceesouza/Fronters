
export const TemplateLogin = () => {
    const divLogin = document.createElement('div');
    divLogin.innerHTML = `

    <div id="banner-section">
    <img id="banner" src="img/foto-capa.jpg" alt="Foto demonstrativo do site">
    <div id="texto-sobre">
        <h2>Fronters</h2>
        <h3>De frente com o Front</h3>
        <h4>Está preparado para invadir 
        o mundo dos Devs?</h4>

    </div>
    </div>

    <nav id="nav">
        <ul id="login-cadastro">
           <!-- <li><a href="/#">Login</a></li> -->
            <!-- <li><a href="/#cadastro">Cadastro</a></li> -->
            <li><button class="nav-btn" id="nav-login"><a href="/#">Login</a></button></li>
            <li><button class="nav-btn" id="nav-cadastro"><a href="/#cadastro">Cadastro</a></button></li>
           
        </ul>
    </nav>


    <form>
        <div>
            <label for="emailUsuario">Email:</label>
            <input type="email" id="email-usuario" placeholder="Digite o seu email">
        </div>
        <div>
            <label for="senhaUsuario">Senha:</label>
            <input type="password" id="senha-usuario" placeholder="Digite a sua senha">
        </div>
        <div class="btn-login">
            <button id="botaoLogin">Entrar</button>
        </div>
    </form>
        
            
        <div class="btn-contas">
            <p>-------------Ou-------------</p>
            <div>
                <button id="botaoGoogle"><i class="fab fa-google"></i>Entrar com a conta Google</button>
            </div>
            <div>
                <button id="botaoGitHub"><i class="fab fa-github"></i>Entrar com a conta GitHub</button>
            </div>
        </div>
    

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
