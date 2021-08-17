export const TemplatePerfil = () => {

    const main = document.createElement('div');
    main.innerHTML = ` 
    <main class="pagina-perfil">
        <header class="container-header">
        <h1 class="logo">FRONTERS</h1>
        </header>

        <div class="perfil">
            <div class="foto">
                <img id="foto-perfil" src="img/foto-perfil.png" alt="Foto do perfil">
                <p class="nome">Tamara</p>
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
                <i class="fab fa-github icone-github"></i>
                <input id="link-github" type="url" placeholder="Colocar link do GitHub"/>
            </div>
            <div class="btn-publicar">
                <button type="submit" id="publicar">Publicar</button>
            </div>
        
            <div class="minhas-publicacoes"><h2>Minhas Publicações</h2></div>
            <div id="div-minhas-publicacoes"></div>


        </form>
    </main>
    
    `
    const botaoPublicar = main.querySelector('#publicar');

    botaoPublicar.addEventListener("click", (event) => {
        event.preventDefault()

        const text = main.querySelector('#post').value;
        const linkGithub = main.querySelector('#link-github');

        if (linkGithub.checkValidity() == false) {
            alert("Por gentileza, colocar um link válido")
            return
        }

        const objetoUsuario = firebase.auth().currentUser;
        const nomeUsuarioGoogle = objetoUsuario.displayName;
        const idDoUsuario = objetoUsuario.uid;

        const post = {
            nome: nomeUsuarioGoogle,
            id_usuario: idDoUsuario,
            texto: text,
            link_github: linkGithub.value,
            curtidas: 10,
            comentarios: []
        }

        const colecaoPost = firebase.firestore().collection("posts")
        colecaoPost.add(post)
            .then((res) => {
                // window.history.pushState({}, null, '/feed')
                window.history.pushState({}, null, '/perfil')
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
                localStorage.clear()
                window.history.pushState({}, null, '/login')
                const popStateEvent = new PopStateEvent("popstate", {})
                dispatchEvent(popStateEvent)
            }).catch((error) => {
                // An error happened.
            });

    })

    function carregarPost() {
        const colecaoPost = firebase.firestore().collection("posts")
        // colecaoPost.where("id_usuario", "!=", localStorage.getItem("credenciais"))
        colecaoPost.where("id_usuario", "==", firebase.auth().currentUser.uid)

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
        <div class="nome-usuario"><i class="fas fa-female boneco"></i>${post.data().nome} <p class="fez-publicacao">publicou.</p>  <i class="fas fa-pen editar-publicacao" title="Editar"></i> </div>
       
        <div class="texto-publicado-usuario">${post.data().texto}</div>
        <div class="conteudo-editar-texto">
            <input class="campo-editar-texto" />
        </div>
        
        <div class="div-link-github-publicado">
            <i class="fab fa-github icone-github"></i>
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
        
        <button type="button" class="salvar-edicao">Salvar</button>
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

        //EDITAR PUBLICAÇÃO

        postTemplate.querySelector('.editar-publicacao').addEventListener('click', () => {
            const salvarEdicao = postTemplate.querySelector('.salvar-edicao');
            salvarEdicao.style.display = "block"

            //texto
            const conteudoEditarTexto = postTemplate.querySelector('.conteudo-editar-texto')
            conteudoEditarTexto.style.display = "block"
            const editarTexto = postTemplate.querySelector('.campo-editar-texto')
            const divTextoEscrito = postTemplate.querySelector('.texto-publicado-usuario')
            const textoEscrito = divTextoEscrito.innerHTML
            divTextoEscrito.style.display = "none"

            //link github
            const conteudoEditarGithub = postTemplate.querySelector('.conteudo-editar-github')
            conteudoEditarGithub.style.display = "block"
            const editarGithub = postTemplate.querySelector('.campo-editar-github')
            const divGithubEscrito = postTemplate.querySelector('.link-github')
            const linkGithubEscrito = divGithubEscrito.innerHTML
            divGithubEscrito.style.display = "none"

            editarTexto.value = textoEscrito;
            editarGithub.value = linkGithubEscrito;

        });


        //SALVAR EDICAO

        postTemplate.querySelector('.salvar-edicao').addEventListener('click', () => {
            const valorInputEditarTexto = postTemplate.querySelector('.campo-editar-texto').value;
            const valorInputEditarGithub = postTemplate.querySelector('.campo-editar-github').value;

            const divTextoEscrito = postTemplate.querySelector('.texto-publicado-usuario')
            const divLinkGithubEscrito = postTemplate.querySelector('.link-github')

            const inputEdicaoTexto = postTemplate.querySelector('.conteudo-editar-texto')
            const inputEdicaoLink = postTemplate.querySelector('.conteudo-editar-github')

            const idPost = postTemplate.querySelector('.id-post').value

            inputEdicaoTexto.style.display = "none"
            inputEdicaoLink.style.display = "none"

            divTextoEscrito.style.display = "block"
            divLinkGithubEscrito.style.display = "block"

            divTextoEscrito.innerHTML = valorInputEditarTexto
            divLinkGithubEscrito.innerHTML = valorInputEditarGithub

            firebase.firestore().collection("posts").doc(idPost)
                .update({
                    texto: valorInputEditarTexto,
                    link_github: valorInputEditarGithub
                })
                .then(() => {
                    console.log("atualizado")

                })
                .catch(error => {
                    console.log('não atualizado-', error)
                })
        })

        main.querySelector('#div-minhas-publicacoes').appendChild(postTemplate)

    }
    return main;

}
