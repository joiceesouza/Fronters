
import {TemplateLogin} from './pages/login/index.js';
import {TemplateCadastro} from './pages/cadastro/index.js';
import {TemplatePerfil} from './pages/perfil/index.js';
import {TemplateRecuperar} from './pages/recuperar/index.js';
import {TemplateFeed} from './pages/feed/index.js';

export const routeRender = () => {
  
 
  
  // const credenciais = localStorage.getItem('credenciais')
  firebase.auth().onAuthStateChanged((user) => {
        //const usuario = user.uid;
    
    const rotaAtual = window.location.pathname
    if(user == null && rotaAtual != "/cadastro" && rotaAtual != "/recuperar" && rotaAtual != "/login") {
      window.history.pushState({}, null, '/login')
      const popStateEvent = new PopStateEvent("popstate", {})
      dispatchEvent(popStateEvent)
    }
    
    const element = document.querySelector('#root');
    const routes = {
      '/': TemplateLogin, 
      '/login': TemplateLogin,
      '/cadastro': TemplateCadastro,
      '/recuperar': TemplateRecuperar,

      '/perfil': TemplatePerfil,
      '/feed': TemplateFeed,
    };
    
    element.innerHTML = '';
    element.appendChild(routes[window.location.pathname]());


  });
  
    
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender);

















