//serviços com firebase

// //CONECTAR USUARIO com endereço de e-mail e senha
export const AddEventoLogin = () => {

    const botaoDoLogin = document.getElementById('botaoLogin');
    botaoDoLogin.addEventListener("click", () => {
        
        const email = document.getElementById('emailUsuario').value;
        const password = document.getElementById('senhaUsuario').value;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                //window.location = "pagina que ira depois q fazer login"
                const user = userCredential.user;
                console.log(user, 'Deu certo o login! ihull');
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Infelizmente aconteceu algum com login! Conta não cadastrada', errorCode, errorMessage);
            });

    });

}

//LOGIN GOOGLE
export const AddEventoLoginComGoogle = () => {

    const botaoDoGoogle = document.getElementById('botaoGoogle')
    botaoDoGoogle.addEventListener('click', (event) => {
        event.preventDefault()
        let provider = new firebase.auth.GoogleAuthProvider();

        //Para fazer login com uma janela pop-up, chame signInWithPopup
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result)
                alert(1)
                /** @type {firebase.auth.OAuthCredential} */
                let credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = credential.accessToken;
                // The signed-in user info.
                let user = result.user;
                // ...
            }).catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // The email of the user's account used.
                let email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                let credential = error.credential;
                // ...
            });

    })



}

// CADASTRO
export const AddEventoCadastro = () => {

    const botaoDoCadastro = document.querySelector('#botao-finalizar-cadastro');
  
    botaoDoCadastro.addEventListener("click", () => {
      //pop up
      const popup = document.querySelector('.popup-wrapper');
      const fecharPopup = document.querySelector('.fechar-popup');
      const conteudoPopup = document.querySelector('.conteudo-popup');
      
      // validação cadastro
      const email = document.getElementById('email-cadastro').value;
      const password = document.getElementById('confirma-senha-cadastro').value;
  
  
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user, 'Cadastrado!');
          popup.style.display = 'block';
          fecharPopup.style.display = 'none';
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Infelizmente aconteceu algum erro!', errorCode, errorMessage);
          popup.style.display = 'block';
          conteudoPopup.innerHTML = ` <h2>Algo deu errado!</h2> 
          <p> Preencha corretamente os campos </p>`;
          fecharPopup.style.display = 'block';
          fecharPopup.addEventListener("click", () => {
          popup.style.display = 'none';
  
          })
         
        });
    })
  }
  
  


