const serverUrl = "https://zhij6bq5skum.usemoralis.com:2053/server";
const appId = "JvvW2NMTy3tfe1LdS74dyAMWyZv0XwcRnlhQL55h";
Moralis.start({serverUrl, appId})


/*
async function login() {
    let user = Moralis.User.current();
    if(!user) {
        try {
            user = await Moralis.authenticate({signingMessage: "Authenticate"});
            await Moralis.enableWeb3();
            console.log(user);
            console.log(user.get('ethAddress'));
        } catch(error) {
            console.log(error)
        }
    }
}
*/
async function redeem() {
    await Moralis.enableWeb3();
    const pointsAvail = ['0.1', '0.06', '0.05', '0.2', '0.04', '0.03', '0.02']
    const weiEth = ['100000000000000000', '60000000000000000', '50000000000000000', '200000000000000000', '40000000000000000', '30000000000000000', '20000000000000000'];
    const weiEthSign = ["0xb5d8704d1cef444a142a74147ee20032ec1ee3f69d3bccc362814b73952a9e93055b6318a5891d46eb70499d66b6135076bf64fea938a14e5023cfc85508e10d1b",
  "0xe353a3b7222149c57df3c10dfcb25864d6808d10d5bc72f1ba44ccc300bdb46f46fce51f3b2bb2b4827a39243895e033cf7303242518385e908c7b440fbeb11c1b",
"0x6fffe27d17f56b6912c0486a1030ac7a6ef5a95097accb626412c49fa94b80127ada45a9492f1c35ec45ccfec136beeeeaefd88066b29ea5158a53ce49147b501b",
"0xc53fdf48134ec6854e97ed3834ea231c38619c022dc0913afc0c2ddbbab98a2c58faf5f909f85e88655eba6b8500b88072f34842c04cacd5fc4db129c7a1eb161c",
"0x6c78f82f79b5df6a16496b4b9c7f9bc9003d8239396a25e6e62d3c7ce673071f57bdb5b37ac77396582e505d67fcdbb134804fd27b70b3924e6dc6525b323ede1b",
"0x28c7924f4bee6ded27ca39b7aa0c52bee059e2cc839e8a5463bcfd143637701e24a98549cf1137c7c770e5d662bfbfdcf5de4a46cbdad2f22d72cd3fe558af061c",
"0x3749687d1266698007d6ee81df304b08347e076e056acf433ea9b33b7bbbb1ce4857559bf84cc97a427264291d115c8216a5514c99ef726e0b80e0547a97bb731b"]
    let index = pointsAvail.indexOf(localStorage.getItem('winningTicket'));
    let options = {
        contractAddress: "0x4c73F4214d36ff12eE35438EC18e6BD97759db64",
        functionName: "close",
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "_sig",
                    "type": "bytes"
                }
            ],
            "name": "close",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        params: {
            _amount: weiEth[index],
            _sig: weiEthSign[index]
        },
    }
    await Moralis.executeFunction(options);

}

//document.getElementById('connect').onclick = login;
document.getElementById('Redeem').onclick = redeem;