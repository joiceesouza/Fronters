import { TemplateLogin } from './pages/login/index.js';
import { TemplateCadastro } from './pages/cadastro/index.js';
import { TemplatePerfil } from './pages/perfil/index.js';
import { TemplateRecuperar } from './pages/recuperar/index.js';
import { TemplateFeed } from './pages/feed/index.js';

export const routeRender = () => {
  const routes = {
    '/': TemplateLogin,
    '/login': TemplateLogin,
    '/cadastro': TemplateCadastro,
    '/recuperar': TemplateRecuperar,
    '/perfil': TemplatePerfil,
    '/feed': TemplateFeed,
  };

  const rotaAtual = window.location.pathname;
  const element = document.querySelector('#root');

  switch (rotaAtual) {
    case '/':
    case '/login':
    case '/cadastro':
    case '/recuperar':
      element.innerHTML = '';
      element.appendChild(routes[rotaAtual]());
      break;

    default:
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          element.innerHTML = '';
          element.appendChild(routes[rotaAtual]());
        } else {
          window.history.pushState({}, null, '/login');
          const popStateEvent = new PopStateEvent('popstate', {});
          dispatchEvent(popStateEvent);
        }
      });
  }
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender);
