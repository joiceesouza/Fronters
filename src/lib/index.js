// // aqui você exportará as funções que precisa

// export const myFunction = () => {
//   // aqui vai seu código
//   console.log('Olá mundo!');
// };

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


