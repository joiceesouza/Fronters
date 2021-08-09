import { login, loginComGoogle, loginComGithub } from '../../services/index.js';

export const TemplateLogin = () => {
    const main = document.createElement('div');
    main.innerHTML = `
<main class="principal pagina-login">
        <div class="foto-principal"></div>
        
    <section class="conteudo-login" >
            <div id="texto-sobre">
                <h2 id="logo">Fronters</h2>
                <h3>De frente com o Front</h3>
                <h4>Está preparado para invadir 
                o mundo dos Devs?</h4>
            </div>
        

        <nav id="nav">
            <ul id="login-cadastro">
                    
                <li><a href="/#"><button class="nav-btn" id="nav-login">Login</button></a></li>
                <li><a href="/cadastro"><button class="nav-btn" id="nav-cadastro">Cadastro</button></a></li>
            
            </ul>
        </nav>


        <form>
            <div class="campo-form">
                <label for="emailUsuario">Email:</label>
                <input type="email" id="email-usuario" placeholder="Digite o seu email">
            </div>
            <div class="campo-form">
                <label for="senhaUsuario">Senha:</label>
                <input type="password" id="senha-usuario" placeholder="Digite a sua senha">
            </div>
            <div>
                <a href="/recuperar" id="esqueci-senha">Esqueci minha senha </a>
            </div>
            <div class="btn">
                <div>
                    <button class="botoes" id="botaoLogin" type="button">Entrar</button>
                </div>
        
                    <p> Ou </p>
                <div>
                    <button  class="botoes" id="botaoGoogle" type="button"><i class="fab fa-google"></i>Entrar com a conta Google</button>
                </div>
                <div>
                    <button  class="botoes" id="botaoGitHub"><i class="fab fa-github"></i>Entrar com a conta GitHub</button>
                </div>
            </div>
        </form>
    </section>
</main>
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
            let user = result.user;
            window.history.pushState({}, null, '/perfil')
            const popStateEvent = new PopStateEvent("popstate", {})
            dispatchEvent(popStateEvent)
        })    
        .catch(error=> {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
            console.log(error)
        });
        

    });


    return main;
}

