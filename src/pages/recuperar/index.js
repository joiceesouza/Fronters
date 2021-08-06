import { redefinirSenha } from "../../services/index.js";

export const TemplateRecuperar = () => {
    const container = document.createElement('div');
    const template = ` 
  
    <div id="banner-section">
      <img id="banner" src="img/foto-capa.jpg" alt="Foto demonstrativo do site">
      <div id="texto-sobre">
          <h1 class="logo">FRONTERS</h1>
          <h3>De frente com o Front</h3>
          <h4>Está preparado para invadir 
          o mundo dos Devs?</h4><br>
      </div>
    </div>
    <div class="texto-reset">
      <h3 class="text-id">Esqueci minha senha</h3>
      <h3 class="text-h4">Uma nova senha será enviada 
      ao seu email de cadastro</h3><br>
    </div>
    <form class="campo-form">
      <div>
        <label for="emailUsuario">Email:</label>
        <input type="email" id="recuperar-email" placeholder="Digite o seu email">
      </div>
      <div id="botao-recuperar">
        <button type="button" id="reset-id">Enviar</button>
      </div>
    </form>

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

//Recuperar senha
//const reset = document.getElementById('reset-id')
const recuperarSenha = container.querySelector('#recuperar-email')
const buttonReset = container.querySelector('#reset-id')

buttonReset.addEventListener("click", () => {

    const popup = container.querySelector('.popup-wrapper');
    const fecharPopup = container.querySelector('.fechar-popup');
    const conteudoPopup = container.querySelector('.conteudo-popup');

    //const auth = firebase.auth()
    const email = recuperarSenha.value
    console.log(email)

    redefinirSenha(email)
    firebase
        .auth().sendPasswordResetEmail(email)
        .then((result) => {
          console.log(result)
          popup.style.display = 'block';
          conteudoPopup.innerHTML = `<h2>Você receberá um link para redefinir sua senha em seu email!</h2>
          <button id="loginPopup"><a href="/#">Fazer Login</a></button>`
          fecharPopup.style.display = 'none'
        })
        .catch((err) => {
          console.log(err)
          popup.style.display = 'block';
          conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
          <p> Preencha corretamente os campos </p>`;
          fecharPopup.style.display = 'block';
          fecharPopup.addEventListener("click", () => {
          popup.style.display = 'none';
          })
         
        }) 
        
})

return container;
}

