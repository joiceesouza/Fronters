// // aqui você exportará as funções que precisa

export function ocultarSenha(seletorInputSenha, seletorOlho) {
    const inputSenha = document.querySelector(seletorInputSenha);
    const iconeOcultar = document.querySelector(seletorOlho);
                         
        if(inputSenha.type == "password") {
            inputSenha.type = "text"
            iconeOcultar.classList.replace('fa-eye-slash', 'fa-eye');

        } else {
            inputSenha.type = "password"
            iconeOcultar.classList.replace('fa-eye', 'fa-eye-slash');
        }                

}

export function deletarPost(postId) {
    const postCollection = firebase.firestore().collection("posts")
    return postCollection.doc(postId).delete()
    
}

