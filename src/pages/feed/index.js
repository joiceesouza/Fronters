export const TemplateFeed = () => {
    const main = document.createElement('div');
    main.innerHTML = `

    <header class="container-header">
      <h1 class="logo">FRONTERS</h1>
    </header>
    <div class="perfil">
        <h1> FEED </h1>
    </div>
   
    <div id="feed"></div>
         
    `
    function carregarPost() {
        const colecaoPost = firebase.firestore().collection("posts")
        // colecaoPost.where("id_usuario", "!=", localStorage.getItem("credenciais"))
        colecaoPost.where("id_usuario", "!=", firebase.auth().currentUser.uid)

            .get().then(snap => {
                snap.forEach(post => {
                    addPostNaPagina(post)

                })
            })
    }

    carregarPost();

    function addPostNaPagina(post) {
        const postTemplate = document.createElement('div');
        postTemplate.setAttribute('class', 'div-post')
        postTemplate.innerHTML = `
                    
            <input type="hidden" class="id-post" value="${post.id}"/>
            <div class="texto-publicado-usuario">${post.data().texto}</div>
            <div class="conteudo-editar-texto">
                <input class="campo-editar-texto" />
            </div>
            
            <div class="div-link-github-publicado">
                <i class="fab fa-github"></i>
                <div class="link-github">${post.data().link_github}</div> 
            </div>
            <div class="conteudo-editar-github">
                <input class="campo-editar-github" />
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
        const linkGithub = postTemplate.querySelector('.link-github');
        const conteudoLinkGithub = linkGithub.innerHTML;
        const divlinkGithub = postTemplate.querySelector('.div-link-github-publicado');
        const editarlinkGithub = postTemplate.querySelector('.conteudo-editar-github');

        if (conteudoLinkGithub == "") {
            divlinkGithub.style.display = "none";
            editarlinkGithub.style.display = "none"
        }

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

    return main;
}