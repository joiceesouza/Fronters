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

    <button class="logout" id="logout-id"> Sair </button>
    `;

    container.innerHTML = template;

    const logout = container.querySelector('#logout-id')
    logout.addEventListener("click", () => {
       
        firebase
        .auth()
        .signOut()
        .then(() => {
           // Sign-out successful.
           // alert('Você se deslogou')
            window.history.pushState({}, null, '/login')
            const popStateEvent = new PopStateEvent("popstate", {})
            dispatchEvent(popStateEvent)
          }).catch((error) => {
            // An error happened.
          });
        })

  /*  .auth()
    .signOut()
    .then(() => {
        alert('Você se deslogou')
    }), (error) => {
        console.log(error)
    }
})*/

return container;
}


