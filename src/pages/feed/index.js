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


        // console.log("-------")
        // post.data().curtidas.forEach(item => {            
        //     console.log(item.nome, item.uid)
        // })


        
        const arrayMinhasCurtidas = post.data().curtidas.filter((item) => {
            if(item.uid == firebase.auth().currentUser.uid) {
                return true;
            } else {
                return false;
            }
        });

        
        const classeCurtir = (arrayMinhasCurtidas.length == 1) ? 'fas' : 'far';


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
                    <i class="${classeCurtir} fa-heart icone-curtir"></i>
                    <span class="numero-curtidas">${post.data().curtidas.length || 0}</span>
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



    return main;
}



    
    // function comentar(idDoPost) {
    //     let usuario =
    //     {
    //         uid: firebase.auth().currentUser.uid,
    //         nome: firebase.auth().currentUser.displayName
    //     }

    //     let documentoPost = firebase.firestore().collection("posts").doc(idDoPost);
    //     documentoPost.update({
    //         comentarios: firebase.firestore.FieldValue.arrayUnion(usuario)
    //     });
    // }

