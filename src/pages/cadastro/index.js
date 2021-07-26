export default () => {

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