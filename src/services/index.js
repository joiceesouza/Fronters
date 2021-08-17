//serviços com firebase

//LOGIN
export const login = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
}

//GOOGLE
export const loginComGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(provider)

}

// CADASTRO
export const cadastro = (email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
}


// GITHUB
export const loginComGithub = () => {
    let provider = new firebase.auth.GithubAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(provider)

}



// REDEFINIÇÃO DE SENHA
export const redefinirSenha = (email) => {
    return firebase
        .auth()
        .sendPasswordResetEmail(email);
}



  
  


