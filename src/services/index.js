// serviços com firebase

// LOGIN
export const login = (email, password) => firebase
  .auth()
  .signInWithEmailAndPassword(email, password);

// GOOGLE
export const loginComGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider);
};

// CADASTRO
export const cadastro = (email, password) => firebase
  .auth()
  .createUserWithEmailAndPassword(email, password);

// GITHUB
export const loginComGithub = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider);
};

// REDEFINIÇÃO DE SENHA
export const redefinirSenha = (email) => firebase
  .auth()
  .sendPasswordResetEmail(email);

// SAIR DO SITE
export const sair = () => firebase
  .auth()
  .signOut();
