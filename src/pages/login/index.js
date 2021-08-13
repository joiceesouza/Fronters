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

<div class="popup-wrapper">
<div class="popup">
    <div class="fechar-popup">X</div>
  <div class="conteudo-popup">
    <h2>Cadastro finalizado com sucesso!</h2>
    <button id="loginPopup"><a href="/#">Fazer Login</a></button>
  </div>
</div>
</div>
    `

    //LOGIN
    const botaoDoLogin = main.querySelector('#botaoLogin');
    botaoDoLogin.addEventListener("click", () => {
        //pop up
        const popup = main.querySelector('.popup-wrapper');
        const fecharPopup = main.querySelector('.fechar-popup');
        const conteudoPopup = main.querySelector('.conteudo-popup');

        const email = main.querySelector('#email-usuario').value;
        const password = main.querySelector('#senha-usuario').value;

        if (email === '' || password === '') {
           // error.innerHTML = `<span> Preencha todos os campos </span>`;
           popup.style.display = 'block';
           conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
           <p> Preencha corretamente todos os campos </p>`;
           fecharPopup.style.display = 'block';
           fecharPopup.addEventListener("click", () => {
           popup.style.display = 'none';
               });
        } 
        else {

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
                console.log('Infelizmente aconteceu algum erro!', errorCode, errorMessage);
                switch (errorCode) {
                    
                    case 'auth/invalid-email':
                        popup.style.display = 'block';
                        conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
                        <p> E-mail inválido </p>`;
                        fecharPopup.style.display = 'block';
                        fecharPopup.addEventListener("click", () => {
                        popup.style.display = 'none';
                        });
                    break;
                    case 'auth/user-disabled':
                        popup.style.display = 'block';
                        conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
                        <p> Usuário desabilitado </p>`;
                        fecharPopup.style.display = 'block';
                        fecharPopup.addEventListener("click", () => {
                        popup.style.display = 'none';
                        });
                    break;
                    case 'auth/user-not-found':
                        popup.style.display = 'block';
                        conteudoPopup.innerHTML = ` <h2>O email está incorreto!</h2> 
                        <p> Usuário não encontrado </p>`;
                        fecharPopup.style.display = 'block';
                        fecharPopup.addEventListener("click", () => {
                        popup.style.display = 'none';
                        });
                    break;
                    case 'auth/wrong-password':
                        popup.style.display = 'block';
                        conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
                        <p> Usuário ou senha inválido </p>`;
                        fecharPopup.style.display = 'block';
                        fecharPopup.addEventListener("click", () => {
                        popup.style.display = 'none';
                        });
                    break;
                    case 'auth/too-many-requests':
                        popup.style.display = 'block';
                        conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
                        <p> Senha inválida </p>`;
                        fecharPopup.style.display = 'block';
                        fecharPopup.addEventListener("click", () => {
                        popup.style.display = 'none';
                            });  
                    default:
                      error.innerHTML = `<span> ${errorMessage} </span>`;
                    break;
                  }
                
       
            });
        }
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

    function validação(){
        var form = main.querySelector('#campo-form')
        var email= main.querySelector('#email-usuario').value
        var text = main.querySelector('#text')
        var pattern = /^[^ ]+@[^]+\.[a-z]{2,3}$/

        if(email.match(pattern)){
            form.classList.add("Valid")
            form.classList.remove("Invalid")
            text.innerHTML = "Seu email é válido"
            text.style.color = "#00ff00"
        }
        else{
            form.classList.remove("Valid")
            form.classList.add("Invalid")
            text.innerHTML = "O email não é válido"
            text.style.color = "#ff0000"
        }
      }

    return main;
}

