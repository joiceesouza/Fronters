export const TemplatePerfil = () => {

    const main = document.createElement('div');
    main.innerHTML = ` 
    <main class="pagina-perfil">
        <header class="container-header">
        <h1 class="logo">FRONTERS</h1>
        <nav id="nav-id">
            <button aria-label="Abrir Menu" id="btn-mobile" aria-haspopup="true" aria-controls="menu" aria-expanded="false">
                <span id="hamburguer"></span>
            </button>
            <div class="mobile-menu">
                <div class="line1"></div>
                <div class="line2"></div>
                <div class="line3"></div>
            </div>
            <ul id="menu" role="menu">
                
                <li><a href="/feed"> <i class="far fa-list-alt"></i> Feed</a></li>
                <li><a href="/perfil"> <i class="fas fa-user-alt"></i> Perfil</a></li>
                <li><a href="" id="logout-id"> <i class="fas fa-sign-out-alt"></i> Sair</a></li>
               
            </ul>
        </nav>
        </header>

        <div class="perfil">
            <div class="foto">
                <img id="foto-perfil" src="img/foto-perfil.png" alt="Foto do perfil">
                <p class="nome">Tamara</p>
            </div>
        
            <button class="editar-perfil"> Editar Perfil </button>
        </div>

        <form action="" id="postForm">
            <div>
                <textarea type="text" name="post" id="post" cols="30" rows="10" placeholder="O que você quer publicar hoje?"required minlength="1"></textarea>
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

    <div class="popup-wrapper">
<div class="popup">
    <div class="fechar-popup">X</div>
  <div class="conteudo-popup">
    <h2>Cadastro finalizado com sucesso!</h2>
    <button id="loginPopup"><a href="/#">Fazer Login</a></button>
  </div>
</div>
</div>
    
    `
    const botaoPublicar = main.querySelector('#publicar');

    botaoPublicar.addEventListener("click", (event) => {
        event.preventDefault()

        const text = main.querySelector('#post').value;
        const linkGithub = main.querySelector('#link-github');
        //pop up
        const popup = main.querySelector('.popup-wrapper');
        const fecharPopup = main.querySelector('.fechar-popup');
        const conteudoPopup = main.querySelector('.conteudo-popup');

        if(text === ""){
            popup.style.display = 'block';
            conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
            <p> Por gentileza, escreva algo antes de salvar </p>`;
            fecharPopup.style.display = 'block';
            fecharPopup.addEventListener("click", () => {
            popup.style.display = 'none';
            });
        }
        else{
            if (linkGithub.checkValidity() == false) {
                alert("Por gentileza, colocar um link válido")
                return
        }

        const objetoUsuario = firebase.auth().currentUser;
        
        const nomeUsuarioGoogle = objetoUsuario.displayName;
        const idDoUsuario = objetoUsuario.uid;
        const horaPublicacao = new Date().toLocaleString();
        const fotoUsuario = objetoUsuario.photoURL           


        const post = {
            foto: fotoUsuario,
            nome: nomeUsuarioGoogle,
            id_usuario: idDoUsuario,
            data: horaPublicacao,
            texto: text,
            link_github: linkGithub.value,
            curtidas: [],
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
        }

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
        <div class="nome-usuario">
            <i class="fas fa-female boneco"></i>${post.data().nome} <p class="fez-publicacao">publicou.</p>  <i class="fas fa-pen editar-publicacao" title="Editar"></i> 
        </div>
       
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
                <span class="numero-curtidas"> ${post.data().curtidas.length || 0}</span>
            </span>
                    
            <span class="likes"><i class="far fa-comment-alt icone-comentar"></i></span>
            <span class="deletar"><i class="fas fa-trash-alt icone-deletar" title="Excluir"></i></span>
             
        </div>

        <div class="comentarios">
            <input class="escrever-comentario" type="textarea"></input>
            <button class="publicar-comentario" type="button">Publicar</button>
        </div>
        
        <button type="button" class="salvar-edicao">Salvar</button>
         <div class="comentario-publicado"></div>
         

        <div class="popup-wrapper">
         <div class="popup">
                 <div class="fechar-popup">X</div>
             <div class="conteudo-popup">
                 <h2>Tem certeza que deseja deletar sua postagem?</h2>
                 <p> <button type="button" class="delete-class">Deletar</button> </p>
             </div>
         </div>
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
        });

        //Deletar post

        const deletar = postTemplate.querySelector('.icone-deletar')
        deletar.addEventListener('click', () => {

            const popup = postTemplate.querySelector('.popup-wrapper');
            const fecharPopup = postTemplate.querySelector('.fechar-popup');
            const conteudoPopup = postTemplate.querySelector('.conteudo-popup');
            popup.style.display = 'block';
            conteudoPopup.innerHTML = ` <h2>Tem certeza que deseja deletar sua postagem?</h2> 
            <p> <button type="button" class="delete-class">Deletar</button> </p>`;
            fecharPopup.style.display = 'block';
            fecharPopup.addEventListener("click", () => {
                popup.style.display = 'none';
            });
            const button = postTemplate.querySelector('.delete-class')
            button.addEventListener('click', () => {
                const postCollection = firebase.firestore().collection("posts")
                postCollection.doc(post.id).delete().then(doc => {
                    postTemplate.style.display = "none"

                })


            })



        });

        main.querySelector('#div-minhas-publicacoes').appendChild(postTemplate)

    }

        //Menu Hamburguer
        const btnMobile = main.querySelector('#btn-mobile');

        function toggleMenu(event) {
            if(event.type === 'touchstart') event.preventDefaut()
            const nav = main.querySelector('#nav-id');
            nav.classList.toggle('active');
            const active = nav.classList.contains('active')
            event.currentTarget.setAttribute('aria-expanded', active)
            if (active) {
                event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
            } 
            else{event.currentTarget.setAttribute('aria-label', 'Abrir Menu')}
        }
        btnMobile.addEventListener('click', toggleMenu);
        btnMobile.addEventListener('touchstart', toggleMenu)

    return main;

}
