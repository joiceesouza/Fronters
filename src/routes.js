
import {TemplateLogin} from './pages/login/index.js';
import {TemplateCadastro} from './pages/cadastro/index.js';
import {TemplatePerfil} from './pages/perfil/index.js';
import {TemplateRecuperar} from './pages/recuperar/index.js';

export const routeRender = () => {
       
    const element = document.querySelector('#root');
    const routes = {
      '/': TemplateLogin, 
      '/login': TemplateLogin,
      '/cadastro': TemplateCadastro, 
      '/perfil': TemplatePerfil,
      '/recuperar': TemplateRecuperar,
    };
    
    element.innerHTML = '';
    element.appendChild(routes[window.location.pathname]());
  };
  
  window.addEventListener('popstate', routeRender);
  window.addEventListener('load', routeRender);
