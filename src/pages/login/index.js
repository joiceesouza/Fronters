import { login, loginComGoogle, loginComGithub } from '../../services/index.js';
import { ocultarSenha } from '../../lib/index.js';

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
                <input type="email" id="email-usuario" placeholder="Digite o seu email" />
                <p id="text"> </p>
            </div>
            <div class="campo-form">
                <label for="senhaUsuario">Senha:</label>
                <div class="campo-senha">
                    <input type="password" class="input-senha" id="senha-usuario" placeholder="Digite a sua senha" />
                    <i class="fas fa-eye-slash ocultar-senha"></i>
                </div>
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
    `;

  function validacao() {
    const form = main.querySelector('.campo-form');
    const email = main.querySelector('#email-usuario').value;
    const text = main.querySelector('#text');
    const pattern = /^[^ ]+@[^]+\.[a-z]{2,3}$/;
    let retorno;

    if (email.match(pattern)) {
      form.classList.remove('invalid');
      text.innerHTML = '';
      retorno = true;
    } else {
      form.classList.add('invalid');
      text.innerHTML = 'O email não é válido';
      text.style.color = '#ff0000';
      retorno = false;
    }

    return retorno;
  }

  // LOGIN
  const botaoDoLogin = main.querySelector('#botaoLogin');
  botaoDoLogin.addEventListener('click', () => {
    if (validacao() === false) {
      return;
    }

    function mostrarPopup(mensagem) {
      const popup = document.querySelector('.popup-wrapper');
      const conteudoPopup = document.querySelector('.conteudo-popup');
      conteudoPopup.innerHTML = mensagem;
      popup.style.display = 'block';
    }

    // fechar pop up
    const popup = main.querySelector('.popup-wrapper');
    const fecharPopup = main.querySelector('.fechar-popup');
    fecharPopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    const email = main.querySelector('#email-usuario').value;
    const password = main.querySelector('#senha-usuario').value;
    if (email === '' || password === '') {
      mostrarPopup('<h2>Algo deu errado!</h2> <p>Preencha corretamente todos os campos </p>');
      // <p> Preencha corretamente todos os campos </p>`)
      // error.innerHTML = `<span> Preencha todos os campos </span>`;
    } else {
      login(email, password)
        .then(() => {
          window.history.pushState({}, null, '/perfil');
          const popStateEvent = new PopStateEvent('popstate', {});
          dispatchEvent(popStateEvent);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Infelizmente aconteceu algum com login! Conta não cadastrada', errorCode, errorMessage);
          console.log('Infelizmente aconteceu algum erro!', errorCode, errorMessage);
          switch (errorCode) {
            case 'auth/invalid-email':
              mostrarPopup('<h2>Algo deu errado!</h2> <p>E-mail inválido</p>');
              break;
            case 'auth/user-disabled':
              mostrarPopup('<h2>Algo deu errado!</h2> <p>Usuário desabilitado</p>');
              break;
            case 'auth/user-not-found':
              mostrarPopup('<h2>O email está incorreto!!</h2> <p>Usuário não encontrado</p>');
              break;
            case 'auth/wrong-password':
              mostrarPopup('<h2>Algo deu errado!</h2> <p>Usuário ou senha inválido </p>');
              break;
            case 'auth/too-many-requests':
              mostrarPopup('<h2>Algo deu errado!</h2> <p>Senha inválida</p>');
              break;
            default:
              error.innerHTML = `<span> ${errorMessage} </span>`;
              break;
          }
        });
    }
  });

  // GOOGLE
  const botaoDoGoogle = main.querySelector('#botaoGoogle');
  botaoDoGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    loginComGoogle()
      .then((userCredential) => {
        window.history.pushState({}, null, '/perfil');
        const popStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popStateEvent);

        /** @type {firebase.auth.OAuthCredential} */
        // let credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // let token = credential.accessToken;
        // The signed-in user info.
        // let user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
      });
  });

  // LOGIN GITHUB
  const botaoDoGit = main.querySelector('#botaoGitHub');
  botaoDoGit.addEventListener('click', (event) => {
    event.preventDefault();

    loginComGithub()
      .then((result) => {
        console.log('github', result);
        window.history.pushState({}, null, '/perfil');
        const popStateEvent = new PopStateEvent('popstate', {});
        dispatchEvent(popStateEvent);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.log(error);
      });
  });

  // OCULTAR SENHA
  main.querySelector('.ocultar-senha').addEventListener('click', () => {
    ocultarSenha('.input-senha', '.ocultar-senha');
  });

  return main;
};
