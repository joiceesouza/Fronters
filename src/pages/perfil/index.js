// import { loadOptions } from "@babel/core";

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

    <form action="" id="postForm">
        <div class>
            <textarea type="text" name="post" id="post" cols="30" rows="10" placeholder="O que você quer publicar hoje?"></textarea>
        </div>        
    
        <div class="campo-addFoto"><img id="add-foto" src="img/vector-addfoto.png">Adicionar Foto</div>

        <div class="link-do-github">
            <i class="fab fa-github"></i><input id="link-github" placeholder="Colocar link do GitHub"></input>
        </div>
        <div class="btn-publicar">
            <button type="submit" id="publicar">Publicar</button>
        </div>
    

        <div id="div-vazia"></div>
    </form>

    
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
       

    }); 

    main.querySelector('#postForm').addEventListener("submit", function(event){
        event.preventDefault();
        const text = main.querySelector('#post').value;
        const post = {
            texto: text,
            id_usuario: "tamara",
            curtidas: 0,
            comentarios: []
        } 

        const colecaoPost = firebase.firestore().collection("posts")

        colecaoPost.add(post)

    });


    function addPost(post) {

        const postTemplate = `
        <li id='${post.id}'>
            ${post.data().texto} ❤ ${post.data().curtidas}
        </li>
        
        `
        main.querySelector('#div-vazia').innerHTML += postTemplate
    }

    function carregarPost() {
        const colecaoPost = firebase.firestore().collection("posts")
        colecaoPost.get().then(snap => {
            snap.forEach(post => {
                addPost(post)
                
            })
        })
    }

    carregarPost();
    
    function deletarPost(postId) {
        const colecaoPost = firebase.firestore().collection("posts")
        colecaoPost.doc(postId).delete().then(doc => {
            console.log('Apagou!')
            carregarPost()
        })
    }
    
    deletarPost("q6ORknzzuaoiCL04XXdC")
    


return main;
}

