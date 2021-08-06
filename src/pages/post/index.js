export const TemplatePost = () => {

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
    
    <div id="div-texto-publicado">
        <textarea type="text" name="publicacao" id="publicacao" cols="30" rows="10" >hhhhh</textarea>
    </div>

    <div id="div-link-github-publicado">
        <i class="fab fa-github"></i><input id="link-github"></input>      
    </div>

    <div class="icones">
        <span class="likes"><i id="icone-curtir" class="far fa-heart"></i></span>
        <!-- <span class="likes"><i id="icone-curtido" class="fas fa-heart"></i></span> -->

        <span class="likes"><i id="icone-comentar" class="far fa-comment-alt"></i></span>
    </div>

    <div class="comentarios">
        <input id="escrever-comentario" type="textarea"></input>
        <button id="publicar-comentario"type="button">Publicar</button>
    </div>

    <div id="div-comentario-postado"></div>
    
    
   
    `
    
    const botaoComentar = main.querySelector('#icone-comentar');
    const templateComentar = main.querySelector('.comentarios');
    botaoComentar.addEventListener("click", () => {
       templateComentar.style.display = "block";
    })

    const botaoCurtir = main.querySelector('#icone-curtir');
    const iconeCurtido = main.querySelector('#icone-curtido');
    botaoCurtir.addEventListener("click", () => {
       iconeCurtido.classList = "ativado";
    })
      
    
    
    const botaoPublicar = main.querySelector('#publicar-comentario');
    botaoPublicar.addEventListener("click", () => {

        const comentario = main.querySelector('#escrever-comentario').value;
        const inputComentario = `
        <input id="input-comentario" type="textarea"></input>
        `
        main.querySelector('#div-comentario-postado').innerHTML = inputComentario;
        main.querySelector('#input-comentario').value = comentario;
        
       

    })
    

return main;
}