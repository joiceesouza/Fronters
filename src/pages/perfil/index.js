export const TemplatePerfil = () => {

    const main = document.createElement('div');
    main.innerHTML =  ` 

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
    <textarea type="text" name="post" id="post" cols="30" rows="10" placeholder="O que você quer publicar hoje?"></textarea>
    </div>

    <div class="campo-addFoto"><img id="add-foto" src="img/vector-addfoto.png">Adicionar Foto</div>

    <div class="link-do-github">
        <i class="fab fa-github"></i><input id="link-github" placeholder="Colocar link do GitHub"></input>
    </div>
    <div class="btn-publicar">
    <button id="publicar">Publicar</button>
    </div>
    

<div id="div-vazia"></div>

    
    `
    const botaoPublicar = main.querySelector('#publicar');
    // const textoParaPublicar = main.querySelector('#post').value;
     
    botaoPublicar.addEventListener("click", () => {
        const textoParaPublicar = main.querySelector('#post').value;             
        const divTextoPublicado = main.querySelector('#div-vazia');
        
        // window.history.pushState({}, null, '/post')
        // const popStateEvent = new PopStateEvent("popstate", {})
        // dispatchEvent(popStateEvent)

        divTextoPublicado.innerHTML = textoParaPublicar;
       

    })
    
    
    ;


return main;
}

