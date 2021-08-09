import {cadastro} from '../../services/index.js';

export const TemplateCadastro = () => {
  const main = document.createElement('div');
  main.innerHTML  = ` 
  <main class="principal pagina-login">
    <div class="foto-principal"></div>

    <section class="conteudo-login" >
      <div id="banner-section">
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

        
      <form >
       <div class="campo-form">
          <label for="nomeUsuario">Nome:</label>
          <input type="text" id="nome-cadastro" placeholder="Digite o seu nome">
        </div>
        <div class="campo-form">
          <label for="emailUsuario">Email:</label>
          <input type="email" id="email-cadastro" placeholder="Digite o seu email">
        </div>
        <div class="campo-form">
          <label for="senhaUsuario">Senha:</label>
          <input type="password" id="senha-cadastro" placeholder="Digite a sua senha">
        </div>
        <div class="campo-form">
          <label for="confirmaSenhaUsuario">Senha:</label>
          <input type="password" id="confirma-senha-cadastro" placeholder="Confirme a sua senha">
        </div>
        <div id="botao-cadastro">
          <button type="button" class="botoes" id="botao-finalizar-cadastro">Cadastrar</button>
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

    const botaoDoCadastro = main.querySelector('#botao-finalizar-cadastro');
  
    botaoDoCadastro.addEventListener("click", () => {
      
      //pop up
      const popup = main.querySelector('.popup-wrapper');
      const fecharPopup = main.querySelector('.fechar-popup');
      const conteudoPopup = main.querySelector('.conteudo-popup');
      
      // validação cadastro
      const email = main.querySelector('#email-cadastro').value;
      const password = main.querySelector('#confirma-senha-cadastro').value;
  
  
     cadastro(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user, 'Cadastrado!');
          popup.style.display = 'block';
          conteudoPopup.innerHTML = `<h2>Cadastro finalizado com sucesso!</h2>
          <button id="loginPopup"><a href="/#">Fazer Login</a></button>`
          fecharPopup.style.display = 'none';
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Infelizmente aconteceu algum erro!', errorCode, errorMessage);
          popup.style.display = 'block';
          conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
          <p> Preencha corretamente os campos </p>`;
          fecharPopup.style.display = 'block';
          fecharPopup.addEventListener("click", () => {
          popup.style.display = 'none';
  
          })
         
        });
    })


  
  return main;
}





