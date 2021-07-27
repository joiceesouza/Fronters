export const TemplateCadastro = () => {

  const container = document.createElement('div');

  const template = ` 
    <h1>Cadastro</h1>
  <form class="campo-form">
  <div>
    <label for="emailUsuario">Email:</label>
    <input type="email" id="emailUsuarioCadastro" placeholder="Digite o seu email">
  </div>
  <div>
    <label for="senhaUsuario">Senha:</label>
    <input type="password" id="senhaUsuarioCadastro" placeholder="Digite a sua senha">
  </div>
  <div>
    <label for="confirmaSenhaUsuario">Senha:</label>
    <input type="password" id="confirmaSenhaUsuario" placeholder="Confirme a sua senha">
  </div>
  <div>
    <button type="button" id="botaoFinalizarCadastro">Finalizar o Cadastro</button>
  </div>
 
</form>
    
    
    `;

  container.innerHTML = template;
  return container;
}

export const AddEventoCadastro = () => {

  const botaoDoCadastro = document.querySelector('#botaoFinalizarCadastro');

  botaoDoCadastro.addEventListener("click", () => {
    const email = document.getElementById('emailUsuarioCadastro').value;
    const password = document.getElementById('confirmaSenhaUsuario').value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, 'Cadastrado!');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Infelizmente aconteceu algum erro!', errorCode, errorMessage);
        // ..
      });
  })
}




export const PopUpCadastro = () => {

  const botaoDoCadastro = document.querySelector('#botaoFinalizarCadastro');
  // const popup = document.querySelector('.popup-wrapper');

  botaoDoCadastro.addEventListener("click", () => {
    // const popup = document.querySelector('.popup-wrapper');
    // popup.style.display = 'block';
    const container = document.createElement('div');
    const template = `
  
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
    container.innerHTML = template;
    return container;

  })
}
