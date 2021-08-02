export const TemplatePerfil = () => {

    const container = document.createElement('div');

    const template = ` 

    <header class="container-header">

      <h1 class="logo">FRONTERS</h1>
      <div class="campo-pesquisar">
        <input id="pesquisar" type="search" placeholder="Pesquisar"></input>
        </div>
    </header>
    <div class="perfil">
        <div class="foto">
        <img id="foto-perfil" src="img/foto-perfil.png" alt="Foto do perfil">
        <p class="nome">Viviane</p>
    </div>
    
        <button class="editar-perfil"> Editar Perfil </button>
    </div>

    <div class>
    <textarea name="post" id="post" cols="30" rows="10" placeholder="O que você quer publicar hoje?"></textarea>
    </div>

    <div class="campo-addFoto"><img id="add-foto" src="img/vector-addfoto.png">Adicionar Foto</div>
    <div class="link-do-github">
        <i class="fab fa-github"></i><input id="link-github" placeholder="Colocar link do GitHub"></input>
    </div>
    <div class="btn-publicar">
        <button id="publicar">Publicar</button>
    </div>
    `;

container.innerHTML = template;
return container;
}

