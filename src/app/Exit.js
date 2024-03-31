function Exit(){
    localStorage.removeItem('token_jwt');
    alert("Seu usuário não está autenticado. Estamos redirecionando você para que possa fazer o login novamente")
    window.location.reload()
}
export default Exit;