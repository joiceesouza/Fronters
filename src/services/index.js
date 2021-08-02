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



// export const cadastro = () => {

//     const botaoDoCadastro = document.querySelector('#botao-finalizar-cadastro');
  
//     botaoDoCadastro.addEventListener("click", () => {
//       //pop up
//       const popup = document.querySelector('.popup-wrapper');
//       const fecharPopup = document.querySelector('.fechar-popup');
//       const conteudoPopup = document.querySelector('.conteudo-popup');
      
//       // validação cadastro
//       const email = document.getElementById('email-cadastro').value;
//       const password = document.getElementById('confirma-senha-cadastro').value;
  
  
//      cadastro(email, password)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           console.log(user, 'Cadastrado!');
//           popup.style.display = 'block';
//           fecharPopup.style.display = 'none';
//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.log('Infelizmente aconteceu algum erro!', errorCode, errorMessage);
//           popup.style.display = 'block';
//           conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
//           <p> Preencha corretamente os campos </p>`;
//           fecharPopup.style.display = 'block';
//           fecharPopup.addEventListener("click", () => {
//           popup.style.display = 'none';
  
//           })
         
//         });
//     })
//   }
  
  


