export const TemplateFeed = () => {

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
        <p><span class="nome-usuario">Viviane</span> fez uma publicação</p>
        </div>
        
        <button type="button" id="editar-post">Editar</button>
    </div>
   
    <div id="feed"></div>
      
   
    `

    function carregarPost() {
        const colecaoPost = firebase.firestore().collection("posts")
        colecaoPost.get().then(snap => {
            snap.forEach(post => {
                addPostNaPagina(post)

            })
        })
    }

    carregarPost();

    function addPostNaPagina(post) {
        const postTemplate = document.createElement('div');
        postTemplate.innerHTML = `
            
            <input type="hidden" class="id-post" value="${post.id}" />
            <p class="texto-publicado-usuário">${post.data().texto}</p>
            <div class="div-link-github-publicado">
                <i class="fab fa-github"></i>
                <input id="link-github" value="${post.data().link_github}" />      
            </div>
            <div class="icones">
                <span class="likes">
                    <i class="far fa-heart icone-curtir"></i>
                    <span class="numero-curtidas"> ${post.data().curtidas}</span>
                </span>
                 
        
                <span class="likes"><i class="far fa-comment-alt icone-comentar"></i></span>
                 
            </div>

            <div class="comentarios">
                <input class="escrever-comentario" type="textarea"></input>
                <button class="publicar-comentario" type="button">Publicar</button>
             </div>

             <div class="comentario-publicado">
             </div>
        
        `
        postTemplate.querySelector(".icone-comentar").addEventListener('click', () => {
            postTemplate.querySelector('.comentarios').style.display = "block";
            postTemplate.querySelector('.escrever-comentario').focus()
        })


        postTemplate.querySelector(".publicar-comentario").addEventListener('click', () => {
            //const idDoPost = postTemplate.querySelector('.id-post').value;
            const comentarioEscrito = postTemplate.querySelector('.escrever-comentario');
            const divComentarioPublicado = postTemplate.querySelector('.comentario-publicado');
            const inputComentar = postTemplate.querySelector('.comentarios')

            divComentarioPublicado.innerHTML = comentarioEscrito.value
            divComentarioPublicado.style.display = "block";
            inputComentar.style.display = "none";
            comentarioEscrito.value = ""

        })


        const curtir = postTemplate.querySelector('.icone-curtir');
        curtir.addEventListener("click", () => {
            //fas = coração preenchido
            const estaCurtido = curtir.classList.contains('fas');
            let numeroDeCurtidas = postTemplate.querySelector('.numero-curtidas')
            let conteudoNumeroDeCurtidas = Number(numeroDeCurtidas.innerHTML);
            

            if (estaCurtido == true) {
                curtir.classList.replace('fas', 'far');
                conteudoNumeroDeCurtidas--
                                                                  

            }
            else {
                curtir.classList.replace('far', 'fas');
                conteudoNumeroDeCurtidas++
                                
            }

            numeroDeCurtidas.innerHTML = conteudoNumeroDeCurtidas;

        })

        main.querySelector('#feed').appendChild(postTemplate)

    }





    // function deletarPost(postId) {
    //     const colecaoPost = firebase.firestore().collection("posts")
    //     colecaoPost.doc(postId).delete().then(doc => {
    //         console.log('Apagou!')
    //         carregarPost()
    //     })
    // }

    // deletarPost("sK0nSVSafJkwPsVauUlkC")


    return main;
}