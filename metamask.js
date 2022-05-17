function toggleButton() {
    const loginButton = document.getElementById('connect')
    if (!window.ethereum) {
        loginButton.addEventListener('click', () => {
            window.open('https://metamask.io/download', '_blank')
        });
    }

    loginButton.addEventListener('click', () => {
        loginwithMetaMask();
    });
}

async function loginwithMetaMask() {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        .catch((e) => {
            console.error(e.message)
            return
        })
    if (!accounts) {return}
    window.userWalletAddress = accounts[0]
    localStorage.wadd = window.userWalletAddress;
    console.log(wadd)
}

window.addEventListener("DOMContentLoaded", (event) => {
    toggleButton();
});