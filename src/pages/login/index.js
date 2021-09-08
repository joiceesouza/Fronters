/* eslint-disable no-console */
import { login, loginComGoogle, loginComGithub } from '../../services/index.js';
import { ocultarSenha, irParaRota, mostrarPopup } from '../../lib/index.js';

export const TemplateLogin = () => {
  const main = document.createElement('div');
  main.innerHTML = `
<main class="principal pagina-login">
        <div class="foto-principal"></div>
        
    <section class="conteudo-login" >
            <div class="texto-sobre">
                <img class="logo-login" src="/img/logo-fronters.png" alt="Logo">
                <h3>De frente com o Front</h3>
                <h4>Está preparado para invadir 
                o mundo dos Devs?</h4>
            </div>
        
        <nav id="nav">
            <ul id="login-cadastro">                  
                <li><button class="nav-btn" id="nav-login">Login</button></li>
                <li><button class="nav-btn" id="nav-cadastro">Cadastro</button></li>
            </ul>
        </nav>

        <form id="form-login">
            <div class="campo-form">
                <label for="emailUsuario">Email:</label>
                <input type="email" class="input-login" id="email-usuario" placeholder="Digite o seu email" />
                <p id="text"> </p>
            </div>
            <div class="campo-form">
                <label for="senhaUsuario">Senha:</label>
                <div class="campo-senha">
                    <input type="password" class="input-senha input-login" id="senha-usuario" placeholder="Digite a sua senha" />
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
  <div class="conteudo-popup"></div>
</div>
</div>
    `;

  main.querySelector('#nav-login').addEventListener('click', () => {
    setTimeout(() => {
      irParaRota('/login');
    }, 500);
  });

  main.querySelector('#nav-cadastro').addEventListener('click', () => {
    setTimeout(() => {
      irParaRota('/cadastro');
    }, 500);
  });

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

    // seletores função mostrar popup
    const popup = main.querySelector('.popup-wrapper');
    const conteudoPopup = main.querySelector('.conteudo-popup');
    const fecharPopup = main.querySelector('.fechar-popup');

    // fechar pop up
    fecharPopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    const email = main.querySelector('#email-usuario').value;
    const password = main.querySelector('#senha-usuario').value;
    if (email === '' || password === '') {
      mostrarPopup('<h2>Algo deu errado!</h2> <p>Preencha corretamente todos os campos </p>', popup, conteudoPopup);
    } else {
      login(email, password)
        .then(() => {
          irParaRota('/perfil');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Infelizmente aconteceu algum com login! Conta não cadastrada', errorCode, errorMessage);
          console.log('Infelizmente aconteceu algum erro!', errorCode, errorMessage);
          switch (errorCode) {
            case 'auth/invalid-email':
              mostrarPopup('<h2>Algo deu errado!</h2> <p>E-mail inválido</p>', popup, conteudoPopup);
              break;
            case 'auth/user-disabled':
              mostrarPopup('<h2>Algo deu errado!</h2> <p>Usuário desabilitado</p>');
              break;
            case 'auth/user-not-found':
              mostrarPopup('<h2>O email está incorreto!!</h2> <p>Usuário não encontrado</p>', popup, conteudoPopup);
              break;
            case 'auth/wrong-password':
              mostrarPopup('<h2>Algo deu errado!</h2> <p>Usuário ou senha inválido </p>', popup, conteudoPopup);
              break;
            case 'auth/too-many-requests':
              mostrarPopup('<h2>Algo deu errado!</h2> <p>Senha inválida</p>', popup, conteudoPopup);
              break;
            default:
              console.log(error);
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
      .then(() => {
        irParaRota('/perfil');
        /** @type {firebase.auth.OAuthCredential} */
      }).catch(() => {
      });
  });

  // LOGIN GITHUB
  const botaoDoGit = main.querySelector('#botaoGitHub');
  botaoDoGit.addEventListener('click', (event) => {
    event.preventDefault();

    loginComGithub()
      .then((result) => {
        console.log('github', result);
        irParaRota('/perfil');
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // OCULTAR SENHA
  main.querySelector('.ocultar-senha').addEventListener('click', () => {
    ocultarSenha('.input-senha', '.ocultar-senha');
  });

  return main;
};
