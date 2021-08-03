export const TemplatePost = () => {

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
    
    <div class
    
    </div>

    <div id="div-texto-publicado"></div>
   
    `;

container.innerHTML = template;
return container;
}