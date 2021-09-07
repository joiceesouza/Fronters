/**
 * @jest-environment jsdom
 */

// import '../src/services/index.js';
import * as services from '../src/services/index.js';
import { TemplateLogin } from '../src/pages/login/index.js';

jest.mock('../src/services/index.js');

describe('login', () => {
  it('deveria mostrar mensagem avisando quando input email estiver vazio', () => {
    const pagina = TemplateLogin();
    const btnEnviar = pagina.querySelector('#botaoLogin');
    btnEnviar.dispatchEvent(new Event('click'));
    const msgErro = pagina.querySelector('#text').innerHTML;
    expect(msgErro).toEqual('O email não é válido');
  });

  it('deveria retornar uma função', () => {
    expect(typeof services.login).toBe('function');
  });

  // it('deveria fazer login', async () => {
  //   const email = 'teste@gmail.com';
  //   const password = '123456';
  //   const page = TemplateLogin();
  //   const emailInput = page.querySelector('#email-usuario');
  //   const passwordInput = page.querySelector('#senha-usuario');
  //   const btnEnviar = page.querySelector('#botaoLogin');
  //   emailInput.value = email;
  //   passwordInput.value = password;

  // const login = jest.fn((email, senha) => new Promise());

  // btnEnviar.dispatchEvent(new Event('click'));

  // services.login = (email, senha) => Promise.resolve({});
  // login = jest.fn().mockResolvedValue(43);
  // expect(mockCallback.mock.calls.length).toBe(2);
  // await expect(services.login).toHaveBeenCalledWith(email, password);
  // expect(services.login).toHaveBeenCalled();
  // await expect(services.login(email, password)).resolves.toBe(Promise);
  // expect(login).toHaveBeenCalledWith(email, password);

  // expect(window.location.pathname).toEqual("/perfil");

  // });
});

describe('loginComGoogle', () => {
  it('deveria retornar uma função', () => {
    expect(typeof services.loginComGoogle).toBe('function');
  });
});

describe('cadastro', () => {
  it('deveria retornar uma função', () => {
    expect(typeof services.cadastro).toBe('function');
  });
});
