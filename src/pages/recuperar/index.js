import { redefinirSenha } from "../../services/index.js";

export const TemplateRecuperar = () => {
    const container = document.createElement('div');
    const template = ` 
    <div class = 'recuperar-class'>
    <h5>Para recuperar o seu acesso, precisamos do seu e-mail</h5>
    <input type="email" placeholder="Digite seu e-mail" id="recuperar-email">
    <button type="button" id="reset-id">Recuperar</button>
    </div>
    `;

container.innerHTML = template;

//Recuperar senha
//const reset = document.getElementById('reset-id')
const recuperarSenha = container.querySelector('#recuperar-email')
const buttonReset = container.querySelector('#reset-id')

buttonReset.addEventListener("click", () => {
    //const auth = firebase.auth()
    const email = recuperarSenha.value
    console.log(email)

    redefinirSenha(email)
    firebase
        .auth().sendPasswordResetEmail(email)
        .then(result => console.log(result))
        .catch(err => console.log(err))
   
    
})

return container;
}

export const PopUpRecuperar = () => {

    const botaoRecuperar = container.querySelector('#reset-id');
    botaoRecuperar.addEventListener("click", () => {
   
      const container = document.createElement('div');
      const template = `
    
  <div class="popup-wrapper">
    <div class="pop-up">
        <div class="fechar-popup">X</div>
      <div class="conteudo-popup">
        <h2>Você receberá um link para redefinir sua senha em seu e-mail!</h2>
        <button id="recuperarPopup"><a href="/#">Fazer Login</a></button>
      </div>
    </div>
  </div>
  `
      container.innerHTML = template;
      return container;
  
    })
  }

