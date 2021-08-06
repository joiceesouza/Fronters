
import {TemplateLogin} from './pages/login/index.js';
import {TemplateCadastro} from './pages/cadastro/index.js';
import {TemplatePerfil} from './pages/perfil/index.js';
import {TemplateRecuperar} from './pages/recuperar/index.js';
import {TemplateFeed} from './pages/feed/index.js';

export const routeRender = () => {
       
    const element = document.querySelector('#root');
    const routes = {
      '/': TemplateLogin, 
      '/login': TemplateLogin,
      '/cadastro': TemplateCadastro, 
      '/perfil': TemplatePerfil,
      '/recuperar': TemplateRecuperar,
      '/feed': TemplateFeed,
    };
    
    element.innerHTML = '';
    element.appendChild(routes[window.location.pathname]());
  };
  
  window.addEventListener('popstate', routeRender);
  window.addEventListener('load', routeRender);
