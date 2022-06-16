const serverUrl = "https://zhij6bq5skum.usemoralis.com:2053/server";
const appId = "JvvW2NMTy3tfe1LdS74dyAMWyZv0XwcRnlhQL55h";
Moralis.start({serverUrl, appId})

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBTE9LzXJdLd2-zQFCU9HlxevzanZRbQWg",
    authDomain: "f1cft-493d1.firebaseapp.com",
    databaseURL: "https://f1cft-493d1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "f1cft-493d1",
    storageBucket: "f1cft-493d1.appspot.com",
    messagingSenderId: "414144945872",
    appId: "1:414144945872:web:4926d78a5a38ae78b908d5",
    measurementId: "G-WNE15MGBR0"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const currentUser = JSON.parse(localStorage.getItem('usr'));
  const starCountRef = ref(db, 'users/' + currentUser.uid + '/pointsRedeemed');
  get(starCountRef).then((snapshot) => {
      const val = snapshot.val();
      const pointsAvail = [0.1, 0.06, 0.05, 0.2, 0.04, 0.03, 0.02]
      const weiEth = ['100000000000000000', '60000000000000000', '50000000000000000', '200000000000000000', '40000000000000000', '30000000000000000', '20000000000000000'];
      const weiEthSign = ["0x5215698bade770bc9e595eb9ae88ba71d175d0b8b46aadfad5e7b493e837a332609ec8769e2aa0dfecd05998e302c83ef4da08c5bed77af5ee8aa7ff0691f2711b",
    "0xe9edc66fe1ae0d251ef6dab2f29346cb1ee98c61f78ee9002290c80688d97a717a6450606750e67dfd72fa24c5799c83509c4908ac2584915b10be954c7679881b",
"0x5332023ddff0771769bddd3e8aaf8470b105daece3a0a661b08e1aa550c2c13b3c16ca6ce360c1822b57f4b47962cb1e90b12f0d50c4a0266ed86326284b2a391c",
"0xd04fe57ff55ace69a58afb3a88b2c0059d5dbfb52ed27bddbd464cded24cb85d19bcd8950f00a2da9898a07c00022e4af0c6ced763d946395c68a9d8976a26801c",
"0x5f8f8d11ec482702df1552231d948e62e8c316930f919bb0d138f753807b8f7d13231b9b9a961b1d42fc8880cf3b5dde114bb10d6fe12cf846762558b8115be91b",
"0x4bd44b085ff4560d42545cb66edcfd0223a1b8428be1cacb9dee63408a8f7b3a088230af7fe5f26bc6a84d0f0953ecd54f9207b5d3a4b29b0945834237233b8b1c",
"0x9266dceb9891f29e69a84f922e87b433212c4a7b620f356d4da8c510c49aebb04c5af870b60a83ac00a7390c3c4a44b9354f9c929440728982f19027e95df5b21b"]
      let index = pointsAvail.indexOf(val);

      Redeem.addEventListener('click', () => {
          redeem
        async function redeem() {
            await Moralis.enableWeb3();
            let options = {
                contractAddress: "0x1Fc8b8845668BD3A66Ba0470d0eF124C17Ce1137",
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
      })
  })