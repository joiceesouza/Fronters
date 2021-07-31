export const TemplateCadastro = () => {

  const container = document.createElement('div');

  const template = ` 

  <div id="banner-section">
    <img id="banner" src="img/foto-capa.jpg" alt="Foto demonstrativo do site">
    <div id="texto-sobre">
        <h2>Fronters</h2>
        <h3>De frente com o Front</h3>
        <h4>Está preparado para invadir 
        o mundo dos Devs?</h4>

    </div>
    </div>

    <nav id="nav">
        <ul id="login-cadastro">
            <li><a href="/#">Login</a></li>
            <li><a href="/#cadastro">Cadastro</a></li>
        </ul>
    </nav>

    
  <form class="campo-form">
  <div>
    <label for="emailUsuario">Email:</label>
    <input type="email" id="email-cadastro" placeholder="Digite o seu email">
  </div>
  <div>
    <label for="senhaUsuario">Senha:</label>
    <input type="password" id="senha-cadastro" placeholder="Digite a sua senha">
  </div>
  <div>
    <label for="confirmaSenhaUsuario">Senha:</label>
    <input type="password" id="confirma-senha-cadastro" placeholder="Confirme a sua senha">
  </div>
  <div id="botao-cadastro">
    <button type="button" id="botao-finalizar-cadastro">Cadastrar</button>
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
