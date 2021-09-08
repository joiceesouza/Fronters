/* eslint-disable no-console */
import { redefinirSenha } from '../../services/index.js';

export const TemplateRecuperar = () => {
  const container = document.createElement('div');
  const template = ` 
    <main class="principal pagina-login">
      <div class="foto-principal"></div>

      <section class="conteudo-login" >
        <div class="texto-sobre">
          <img class="logo-login" src="/img/logo-fronters.png" alt="Logo">
          <h3>De frente com o Front</h3>
          <h4>Está preparado para invadir 
          o mundo dos Devs?</h4>
        </div>

        <div class="texto-reset">
          <h3 class="text-id">Esqueci minha senha</h3>
          <h4 class="text-h4">Uma nova senha será enviada 
          ao seu email de cadastro</h4><br>
        </div>
        <form >
          <!--<div class="campo-form">
            <label for="emailUsuario">Email:</label>
            <input type="email" id="recuperar-email" placeholder="Digite o seu email">
          </div>-->
          <div class="campo-form">
                <label for="emailUsuario">Email:</label>
                <input type="email" class="input-login" id="email-usuario" placeholder="Digite o seu email" />
                <p id="text"> </p>
            </div>
          <div id="botao-recuperar">
            <button type="button" class="botoes" id="reset-id">Enviar</button>
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

  container.innerHTML = template;

  // Recuperar senha
  const recuperarSenha = container.querySelector('#email-usuario');
  const buttonReset = container.querySelector('#reset-id');

  buttonReset.addEventListener('click', () => {
    const popup = container.querySelector('.popup-wrapper');
    const fecharPopup = container.querySelector('.fechar-popup');
    const conteudoPopup = container.querySelector('.conteudo-popup');
    const email = recuperarSenha.value;
    redefinirSenha(email);
    firebase
      .auth().sendPasswordResetEmail(email)
      .then(() => {
        popup.style.display = 'block';
        conteudoPopup.innerHTML = `<h2>Você receberá um link para redefinir sua senha em seu email!</h2>
          <button id="loginPopup"><a class="login-recuperar" href="/#">Fazer Login</a></button>`;
        fecharPopup.style.display = 'none';
      })
      .catch((err) => {
        console.log(err);
        popup.style.display = 'block';
        conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
          <p> Preencha corretamente os campos </p>`;
        fecharPopup.style.display = 'block';
        fecharPopup.addEventListener('click', () => {
          popup.style.display = 'none';
        });
      });
  });

  return container;
};
