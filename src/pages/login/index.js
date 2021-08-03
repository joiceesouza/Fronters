import { login, loginComGoogle, loginComGithub } from '../../services/index.js';

export const TemplateLogin = () => {
    const main = document.createElement('div');
    main.innerHTML = `

    <div id="banner-section">
    <img id="banner" src="img/foto-capa.jpg" alt="Foto demonstrativo do site"> 
    <div id="texto-sobre">
        <h2 id="logo">Fronters</h2>
        <h3>De frente com o Front</h3>
        <h4>Está preparado para invadir 
        o mundo dos Devs?</h4>

    </div>
    </div>

    <nav id="nav">
        <ul id="login-cadastro">
                
            <li><a href="/#"><button class="nav-btn" id="nav-login">Login</button></a></li>
            <li><a href="/cadastro"><button class="nav-btn" id="nav-cadastro">Cadastro</button></a></li>
           
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
        <div>
         <ul>
         <li><a href="/recuperar">Esqueci minha senha </a></li>
         </ul>

        </div>
        <div class="btn">
            <button id="botaoLogin" type="button">Entrar</button>
        </div>
    
                    
        <div class="btn-contas">
            <p>-------------Ou-------------</p>
            <div class="btn">
                <button  id="botaoGoogle" type="button"><i class="fab fa-google"></i>Entrar com a conta Google</button>
            </div>
            <div class="btn">
                <button  id="botaoGitHub"><i class="fab fa-github"></i>Entrar com a conta GitHub</button>
            </div>
        </div>
    </form>

    `

    //LOGIN
    const botaoDoLogin = main.querySelector('#botaoLogin');
    botaoDoLogin.addEventListener("click", () => {

        const email = main.querySelector('#email-usuario').value;
        const password = main.querySelector('#senha-usuario').value;

        login(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user, 'Deu certo o login! ihull');
                window.history.pushState({}, null, '/perfil')
                const popStateEvent = new PopStateEvent("popstate", {})
                dispatchEvent(popStateEvent)
               // OU window.location.pathname='/perfil';


            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Infelizmente aconteceu algum com login! Conta não cadastrada', errorCode, errorMessage);
            });

    });

    //GOOGLE

    const botaoDoGoogle = main.querySelector('#botaoGoogle')
    botaoDoGoogle.addEventListener('click', (event) => {

        event.preventDefault()

        loginComGoogle()
            .then((result) => {
                console.log(result)
                window.history.pushState({}, null, '/perfil')
            const popStateEvent = new PopStateEvent("popstate", {})
            dispatchEvent(popStateEvent)

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
      
        });



//LOGIN GITHUB

    const botaoDoGit = main.querySelector('#botaoGitHub')
    botaoDoGit.addEventListener('click', (event)=> {
        
        event.preventDefault()
        
        loginComGithub()
        .then((result) => {
            console.log(result)
            let credential = result.credential;
            let token = credential.accessToken;
            window.history.pushState({}, null, '/perfil')
            const popStateEvent = new PopStateEvent("popstate", {})
            dispatchEvent(popStateEvent)
        
        }).catch((error) => {
            
            // alert('Erro ao logar')
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            console.log(error)
        });
        

    });


    return main;
}

