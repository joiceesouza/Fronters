
export default () => {
const divLogin = document.createElement('div');
divLogin.innerHTML = `
<div id="banner-section">
  <img id="banner" src="img/banner.jpg" alt="Foto demonstrativo do site">
  <div id="texto-sobre">
    <h2>Fronters</h2>
    <h3>De frente com o Front</h3>
    <h4>Está preparado para invadir 
      o mundo dos Devs? Venha trocar experiências, aprender, ensinar e conhecer novas pessoas</h4>

  </div>
</div>

    <form>
        <div>
            <label for="emailUsuario">Email:</label>
            <input type="email" id="emailUsuario">
        </div>
        <div>
            <label for="senhaUsuario">Senha:</label>
            <input type="password" id="senhaUsuario">
        </div>
        <div>
            <button id="botaoLogin">Login</button>
            <button id="botaoCadastrar"><a href="/#cadastro">Cadastrar</a></button>

        </div>
        <div>
            <button id="botaoGoogle">Entrar com a conta Google</button>
        </div>
    </form>
    `


return divLogin;

}


