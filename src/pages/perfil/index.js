// import { loadOptions } from "@babel/core";

export const TemplatePerfil = () => {

    const main = document.createElement('div');
    main.innerHTML = ` 

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
        <button class="logout" id="logout-id"> Sair </button>
    </div>

    <form action="" id="postForm">
        <div>
            <textarea type="text" name="post" id="post" cols="30" rows="10" placeholder="O que você quer publicar hoje?"></textarea>
        </div>        
    
        <div class="campo-addFoto"><img id="add-foto" src="img/vector-addfoto.png">Adicionar Foto</div>

        <div class="div-link-do-github">
            <i class="fab fa-github"></i>
            <input id="link-github" type="url" placeholder="Colocar link do GitHub"/>
        </div>
        <div class="btn-publicar">
            <button type="submit" id="publicar">Publicar</button>
        </div>
    

        <div id="div-vazia"></div>
    </form>

    
    `
    const botaoPublicar = main.querySelector('#publicar');

    botaoPublicar.addEventListener("click", (event) => {
        event.preventDefault()

        const text = main.querySelector('#post').value;
        const linkGithub = main.querySelector('#link-github');
           
           if(linkGithub.checkValidity() == false) {
               alert("Por gentileza, colocar um link válido")
               return 
           }


        const post = {
            id_usuario: "tamara",
            texto: text,
            link_github: linkGithub.value,
            curtidas: 10,
            comentarios: []
        }

        const colecaoPost = firebase.firestore().collection("posts")
        colecaoPost.add(post)
            .then((res) => {
                window.history.pushState({}, null, '/feed')
                const popStateEvent = new PopStateEvent("popstate", {})
                dispatchEvent(popStateEvent)
            });


           






    });

    const logout = main.querySelector('#logout-id')
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



    return main;

}


