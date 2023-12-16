let loginButton = document.querySelector('.button.button-login')
let loginPopup = document.querySelector('.login-overlay')

loginButton.addEventListener('click', (e) => {
    loginPopup.classList.toggle('displayNone')
})