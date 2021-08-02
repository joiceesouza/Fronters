
export const TemplateLogin = () => {
    const divLogin = document.createElement('div');
    divLogin.innerHTML = `

    <div id="banner-section">
    <img id="banner" src="img/foto-capa.jpg" alt="Foto demonstrativo do site">
    <div id="texto-sobre">
        <h2>Fronters</h2>
        <h3>De frente com o Front</h3>
        <h4>Está preparado para invadir 
        o mundo dos Devs?</h4>

    </div>
    </div>

    <nav id="nav">
        <ul id="login-cadastro">
           <!-- <li><a href="/#">Login</a></li> -->
            <!-- <li><a href="/#cadastro">Cadastro</a></li> -->
            <li><a href="/#"><button class="nav-btn" id="nav-login">Login</button></a></li>
            <li><a href="/#cadastro"><button class="nav-btn" id="nav-cadastro">Cadastro</button></a></li>
           
        </ul>
    </nav>


    <form>
        <div>
            <label for="emailUsuario">Email:</label>
            <input type="email" id="email-usuario" placeholder="Digite o seu email">
        </div>
        <div>
            <label for="senhaUsuario">Senha:</label>
            <input type="password" id="senha-usuario" placeholder="Digite a sua senha">
        </div>
        <div class="btn-login">
            <button id="botaoLogin">Entrar</button>
        </div>
    
                    
        <div class="btn-contas">
            <p>-------------Ou-------------</p>
            <div>
                <button id="botaoGoogle"><i class="fab fa-google"></i>Entrar com a conta Google</button>
            </div>
            <div>
                <button id="botaoGitHub"><i class="fab fa-github"></i>Entrar com a conta GitHub</button>
            </div>
        </div>
    </form>

    `
    return divLogin;

}

