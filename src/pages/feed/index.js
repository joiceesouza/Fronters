export const TemplateFeed = () => {
    const main = document.createElement('div');
    main.innerHTML = `
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
                    <li id="logout-id"><p><a href=""> <i class="fas fa-sign-out-alt"></i> Sair</a></p></li>
                </ul>
            
        </nav>
    </header>
    <div class="perfil">
        <h1> FEED </h1>
    </div>
    <div id="div-gif">
        <img class="gif" src="../img/48531-htmlcssjs.gif" alt="gif">
    </div>
     
    <div id="feed"></div>
    `

    function carregarPost() {
        const colecaoPost = firebase.firestore().collection("posts")
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

        // console.log("-------")
        // post.data().curtidas.forEach(item => {            
        //     console.log(item.nome, item.uid)
        // })

        const arrayMinhasCurtidas = post.data().curtidas.filter((item) => {
            if (item.uid == firebase.auth().currentUser.uid) {
                return true;
            } else {
                return false;
            }
        });

        const classeCurtir = (arrayMinhasCurtidas.length == 1) ? 'fas' : 'far';
                      
        let conteudoComentarios = "";
        //post.data().comentarios.forEach(templateComentario) 
        post.data().comentarios.forEach((comentario) => {
          conteudoComentarios += gerarTemplateComentario(comentario)
        })


        postTemplate.innerHTML = `
            <input type="hidden" class="id-post" value="${post.id}"/>
            <div>
                <img src="../../img/foto-usuario.png">
                <p class="nome-feed">Tamara<p>
            </div>
            
            <div class="texto-publicado-usuario">${post.data().texto}</div>
            <div class="img-publicada">
                <img class="foto-publicada" src="../../img/foto-projeto.png">
            </div>
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
                    <i class="${classeCurtir} fa-heart icone-curtir"></i>
                    <span class="numero-curtidas">${post.data().curtidas.length || 0}</span>
                </span>
                        
                <span class="likes"><i class="far fa-comment-alt icone-comentar"></i></span>
                
                 
            </div>
            <div class="comentarios">
                <input class="escrever-comentario" type="textarea" placeholder="Comentar"></input>
                <button class="publicar-comentario" type="button">Publicar</button>

            </div>
                      
             <div class="mostrar-comentarios">${conteudoComentarios}</div>
                      
        
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
            const mostrarComentarios = postTemplate.querySelector('.mostrar-comentarios')
            mostrarComentarios.style.display = "block"

        })

        postTemplate.querySelector(".publicar-comentario").addEventListener('click', () => {

            const idDoPost = postTemplate.querySelector('.id-post').value;
            const comentarioEscrito = postTemplate.querySelector('.escrever-comentario');
            const divComentarioPublicado = postTemplate.querySelector('.mostrar-comentarios');
            const inputComentar = postTemplate.querySelector('.comentarios')
            const objetoComentario = comentar(idDoPost, comentarioEscrito.value)
            const templateComentarioPublicado = gerarTemplateComentario(objetoComentario)
            
            divComentarioPublicado.innerHTML = templateComentarioPublicado + divComentarioPublicado.innerHTML;
            //divComentarioPublicado.style.display = "block";
            inputComentar.style.display = "none";
            comentarioEscrito.value = ""
                     
        })

        const curtir = postTemplate.querySelector('.icone-curtir');
        curtir.addEventListener("click", () => {
            //fas = coração preenchido
            const naoEstavaCurtido = curtir.classList.contains('far');
            let numeroDeCurtidas = postTemplate.querySelector('.numero-curtidas')
            let conteudoNumeroDeCurtidas = Number(numeroDeCurtidas.innerHTML);
            const idPost = postTemplate.querySelector('.id-post').value

            if (naoEstavaCurtido == true) {
                curtir.classList.replace('far', 'fas');
                conteudoNumeroDeCurtidas++
                curtirPost(idPost)
            }

            else {
                curtir.classList.replace('fas', 'far');
                conteudoNumeroDeCurtidas--
                descurtirPost(idPost)
            }

            numeroDeCurtidas.innerHTML = conteudoNumeroDeCurtidas;

        })

        main.querySelector('#feed').appendChild(postTemplate)

    };


    function curtirPost(idDoPost) {

        let curtida =
        {
            uid: firebase.auth().currentUser.uid,
            nome: firebase.auth().currentUser.displayName
        }

        let documentoPost = firebase.firestore().collection("posts").doc(idDoPost);
        documentoPost.update({
            curtidas: firebase.firestore.FieldValue.arrayUnion(curtida)
        });

    }


    function descurtirPost(idDoPost) {
        
        let curtida =
        {
            uid: firebase.auth().currentUser.uid,
            nome: firebase.auth().currentUser.displayName
        }

        let documentoPost = firebase.firestore().collection("posts").doc(idDoPost);
        documentoPost.update({
            curtidas: firebase.firestore.FieldValue.arrayRemove(curtida)
        });
    }

    function comentar(idDoPost, texto) {

        let comentario =
        {
            uid: firebase.auth().currentUser.uid,
            nome: firebase.auth().currentUser.displayName,
            textoComentario: texto,
            data: new Date().toLocaleString()

        }

        let documentoPost = firebase.firestore().collection("posts").doc(idDoPost);
        documentoPost.update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(comentario)
        });
        return comentario;

    }

    function gerarTemplateComentario(comentario) {
        return `
        <div class="template-comentario">
            <header class="header-comentario">
                <img class="foto-comentario" src="../../img/foto-usuario.png"><p class="nome-comentario">${comentario.nome} </p>
                <p class="hora-comentario">${comentario.data}</p>            
            </header>
            <p class="texto-comentario-template">${comentario.textoComentario}</p>
        </div>
        
        `
    }

   
            //Menu Hamburguer
           const btnMobile = main.querySelector('#btn-mobile');

            function toggleMenu(event) {
                if(event.type === 'touchstart') event.preventDefault()
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



