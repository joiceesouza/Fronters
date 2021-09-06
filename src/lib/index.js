export function ocultarSenha(seletorInputSenha, seletorOlho) {
  const inputSenha = document.querySelector(seletorInputSenha);
  const iconeOcultar = document.querySelector(seletorOlho);

  if (inputSenha.type === 'password') {
    inputSenha.type = 'text';
    iconeOcultar.classList.replace('fa-eye-slash', 'fa-eye');
  } else {
    inputSenha.type = 'password';
    iconeOcultar.classList.replace('fa-eye', 'fa-eye-slash');
  }
}

export function deletarPost(postId) {
  const postCollection = firebase.firestore().collection('posts');
  return postCollection.doc(postId).delete();
}

export function irParaRota(rota) {
  window.history.pushState({}, null, rota);
  const popStateEvent = new PopStateEvent('popstate', {});
  dispatchEvent(popStateEvent);
}

export function mostrarPopup(mensagem, popup, divConteudoPopup) {
  divConteudoPopup.innerHTML = mensagem
  popup.style.display = 'block';

}

export function removerComentario(comentario, idDoPost) {
   const documentoPost = firebase.firestore().collection('posts').doc(idDoPost);
  return documentoPost.update({
    comentarios: firebase.firestore.FieldValue.arrayRemove(comentario),
  });
}

export function efeitoRemover(target) {
  target.addEventListener('transitionend', () => target.remove());
  target.style.opacity = '0';
}