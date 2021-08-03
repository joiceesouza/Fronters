import { redefinirSenha } from "../../services/index.js";

export const TemplateRecuperar = () => {
    const container = document.createElement('div');
    const template = ` 
  
    <div id="banner-section">
    <img id="banner" src="img/foto-capa.jpg" alt="Foto demonstrativo do site">
    <div id="texto-sobre">
        <h2 id="logo">Fronters</h2>
        <h3>De frente com o Front</h3>
        <h4>Está preparado para invadir 
        o mundo dos Devs?</h4>

    </div>
    </div>

  <form class="campo-form">
  <div>
    <label for="emailUsuario">Email:</label>
    <input type="email" id="recuperar-email" placeholder="Digite o seu email">
  </div>
  <div id="botao-recuperar">
    <button type="button" id="reset-id">Recuperar</button>
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

