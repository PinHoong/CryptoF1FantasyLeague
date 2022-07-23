function toggleButton() {
    const loginButton = document.getElementById('connect')
    if (!window.ethereum) {
        loginButton.addEventListener('click', () => {
            window.open('https://metamask.io/download', '_blank');
        });
    }

    loginButton.addEventListener('click', () => {
        loginwithMetaMask();
    });
}

async function loginwithMetaMask() {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        .then(() => document.getElementById("metamaskCtn").innerText = "Connected")
        
        /*
        catch((e) => {
            console.error(e.message)
            return
        })
        */
    if (!accounts) {return}
    window.userWalletAddress = accounts[0]
    localStorage.wadd = window.userWalletAddress;
}

window.addEventListener("DOMContentLoaded", (event) => {
    toggleButton();
});


async function sendTransaction() {

    let params = [{
        "from": localStorage.wadd,
        "to": "0xdca59f0Bb2E4E429024181f2C75720B13178108c",
        "gas": Number(21000).toString(16),
        "gasPrice": Number(1500000000).toString(16),
        "value": Number(20000000000000000).toString(16),
    }]

    let txnHash = await window.ethereum.request({method: "eth_sendTransaction", params})
        .catch((err) => {
            console.log(err)
        })
    var receipt =  null;
    while (receipt == null) {
        receipt = await window.ethereum.request({method: 'eth_getTransactionReceipt', params: [txnHash]});
    }
    window.location.replace('/')
}