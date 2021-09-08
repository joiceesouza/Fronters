/* eslint-disable no-console */
import { cadastro } from '../../services/index.js';
import { ocultarSenha, irParaRota, mostrarPopup } from '../../lib/index.js';

export const TemplateCadastro = () => {
  const main = document.createElement('div');
  main.innerHTML = ` 
  <main class="principal pagina-login">
    <div class="foto-principal"></div>

    <section class="conteudo-login" >
      <div id="banner-section">
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
       
      <form >
       <div class="campo-form">
          <label for="nome-cadastro">Nome:</label>                 
          <input class="input-login" type="text" id="nome-cadastro" placeholder="Digite o seu nome" required maxlength="25" minlength="2">
          <div id="imp-error-name" class="erros"></div>

        </div>
        <div class="campo-form">
          <label for="sobrenome-cadastro">Sobrenome:</label>
          <input class="input-login" type="text" id="sobrenome-cadastro" placeholder="Digite o seu sobrenonome">
        </div>
        <div class="campo-form">
          <label for="emailUsuario">Email:</label>

          <input type="email" class="input-login" id="email-cadastro" placeholder="Digite o seu email" required>
          <div id="imp-error-email" class="erros"></div>
        </div>
        <div class="campo-form">
          <label for="senhaUsuario">Senha:</label>
            <div class="campo-senha">
              <input type="password" class="input-senha input-login" id="senha-cadastro" placeholder="Digite a sua senha" required />
              <i class="fas fa-eye-slash ocultar-senha"></i>
            </div>
        </div>
        <div class="campo-form">

            <label for="confirma-senha-cadastro">Senha:</label>
            <div class="campo-senha">
              <input type="password" id="confirma-senha-cadastro"  class="input-confirma-senha input-login" placeholder="Confirme a sua senha" required min="6">
               <i class="fas fa-eye-slash ocultar-confirma-senha"></i>
            </div>
          <div id="imp-error-senha" class="erros"></div>                 

        </div>
        
        <div id="botao-cadastro">
          <button type="button" class="botoes" id="botao-finalizar-cadastro">Cadastrar</button>
        </div>
      </form>
    </section>

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

  const botaoDoCadastro = main.querySelector('#botao-finalizar-cadastro');
  botaoDoCadastro.addEventListener('click', () => {
    const name = main.querySelector('#nome-cadastro').value;
    const email = main.querySelector('#email-cadastro').value;
    const password = main.querySelector('#senha-cadastro').value;
    const senhaConf = main.querySelector('#confirma-senha-cadastro').value;
    const sobreNome = main.querySelector('#sobrenome-cadastro').value;
    const erroNome = main.querySelector('#imp-error-name');
    const erroEmail = main.querySelector('#imp-error-email');
    const erroSenha = main.querySelector('#imp-error-senha');
    const formatoEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // seletores função mostrar popup
    const popup = main.querySelector('.popup-wrapper');
    const conteudoPopup = main.querySelector('.conteudo-popup');
    const fecharPopup = main.querySelector('.fechar-popup');

    // fechar pop up
    fecharPopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    if (email === '' || password === '' || sobreNome === '') {
      mostrarPopup(` <h2>Algo deu errado!</h2> 
      <p> Preencha corretamente todos os campos </p>`, popup, conteudoPopup);
    } else if (name.length < 3) {
      erroNome.innerHTML = '<p><i class="fas fa-exclamation-triangle"></i><strong> Escreva um nome válido</strong></p>';
    } else if (formatoEmail.test(email) === false) {
      erroNome.innerHTML = '';
      erroEmail.innerHTML = '<p><i class="fas fa-exclamation-triangle"></i><strong> Escreva um email válido </strong></p>';
    } else if (password.length < 6) {
      erroNome.innerHTML = '';
      erroEmail.innerHTML = '';
      erroSenha.innerHTML = '<p><i class="fas fa-exclamation-triangle"></i><strong> A senha deve ter no mínimo 6 dígitos </strong></p>';
    } else if (password !== senhaConf) {
      erroNome.innerHTML = '';
      erroEmail.innerHTML = '';
      erroSenha.innerHTML = '<p><i class="fas fa-exclamation-triangle"></i><strong> As senhas não conferem</strong></p>';
    } else {
      cadastro(email, password)
        .then(() => {
          mostrarPopup(`<h2>Cadastro finalizado com sucesso!</h2>
          <a href='/login'><button class="loginPopup">Fazer Login</button></a>`, popup, conteudoPopup);
        })
        .catch((error) => {
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/email-already-in-use':
              mostrarPopup('<h2>Algo deu errado!</h2><p> E-mail já cadastrado </p>', popup, conteudoPopup);
              break;
            default:
              console.error(error, error.message);
              break;
          }
        });
    }
  });

  // OCULTAR SENHA
  main.querySelector('.ocultar-senha').addEventListener('click', () => {
    ocultarSenha('.input-senha', '.ocultar-senha');
  });

  main.querySelector('.ocultar-confirma-senha').addEventListener('click', () => {
    ocultarSenha('.input-confirma-senha', '.ocultar-confirma-senha');
  });

  return main;
};
