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
            <!-- <li><a href="/#">Login</a></li> -->
            <!-- <li><a href="/#cadastro">Cadastro</a></li> -->
            <li><button class="nav-btn" id="nav-login"><a href="/#">Login</a></button></li>
            <li><button class="nav-btn" id="nav-cadastro"><a href="/#cadastro">Cadastro</a></button></li>
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
  return container;
}





