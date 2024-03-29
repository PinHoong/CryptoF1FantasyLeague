import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, remove, update, onValue, get, child, push} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
var userName = ref(db, 'users/' + currentUser.uid);
//this is for the creation of game room!
document.getElementById('btn1').addEventListener('click', () => {
    get(userName).then((snapshot) => {
        const data = snapshot.val();
        const userWA = data['walletAddress']
        const userRoom = data['onlineRoom'];
        if (userRoom != "") {
            alert('You Cannot Mulitple Rooms!')
        } else {
            sendTransaction()
        }

        async function sendTransaction() {
            let params = [{
                "from": userWA,
                "to": "0x48a8c0c9c2d894ad18dbd38271b2b38afc6da5ff",
                "gas": Number(210000).toString(16),
                "gasPrice": Number(1500000000).toString(16),
                "value": Number(40000000000000000).toString(16),
            }]
    
            let txnHash = await window.ethereum.request({method: "eth_sendTransaction", params})
                .catch((err) => {
                    console.log(err)
                })
            
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Transaction Processing',
                showConfirmButton: false,
                timer: 15000
            })
            var receipt =  null;
            while (receipt == null) {
                receipt = await window.ethereum.request({method: 'eth_getTransactionReceipt', params: [txnHash]});
            }

            if (receipt['status'] == "0x1") {
                const userLN = data['lastName']
                const newPostKey = push(child(ref(db), 'Rooms')).key;
                alert('Send The Unique Room To Your User: ' + newPostKey);
                const updates = {};
                updates['/Rooms/' + newPostKey] = {
                    owner: currentUser.uid,
                    memberNames: {1: userLN}, 
                    memberCount: 1,
                    readymembers: 0,
                    messages: '',
                    memberUID: {1: currentUser.uid},
                    scoreboard: {1: 0},
                    confirmed: 0,
                    ready_arr: {'nil': 0},
                    played: 0,
                    redeemed: 0,
                }
                update(ref(db), updates);
                update(ref(db, 'users/' + currentUser.uid), {
                    'onlineRoom':  newPostKey,
                })
        
                window.location.href = "multiplayerGame.html"
            } else {
                alert('Something went wrong!')
            }
        }
    })
})

//this is for joining of game room!
document.getElementById('btn2').addEventListener('click', () => {
    var meetingID = document.getElementById('text1').value.toString();
    const starCountRef = ref(db);
    get(starCountRef).then((snapshot) => {
        const prevData = snapshot.val();
        const totalRooms = prevData['Rooms']
        const onlineRoom2 = prevData['users'][currentUser.uid]['onlineRoom'];
        const past_room = prevData['users'][currentUser.uid]['pastRoom'];
        const userWA2 = prevData['users'][currentUser.uid]['walletAddress'];
        //arryofKeys consist of all the Rooms' meeting ID
        var arryOfKeys = [];
        for (var key in totalRooms) {
            arryOfKeys.push(key)
        }
        const data = prevData['Rooms'];
        var numUsers = data[meetingID]['memberCount'];
        if (meetingID in past_room){
            alert('You cannot rejoin this Room')
        }
        else if (onlineRoom2 == "" && arryOfKeys.includes(meetingID) && numUsers < 5) {
            sendTransaction()
        } else if (onlineRoom2 != "" && onlineRoom2 != meetingID) {
            alert('Cannot Join Multiple Rooms!')
        }
          else if (onlineRoom2 != "" && onlineRoom2 == meetingID) {
            alert('Redirecting!')
            window.location.href = "multiplayerGame.html"
        } else if (!(arryOfKeys.includes(meetingID))) {
            alert('No such room exists!')
        } else if (numUsers == 5) {
            alert('Room Has Hit Its Maximum Capacity!')
        } else {
            alert('Race has already completed!')
        }

        async function sendTransaction() {
            let params = [{
                "from": userWA2,
                "to": "0x48a8c0c9c2d894ad18dbd38271b2b38afc6da5ff",
                "gas": Number(210000).toString(16),
                "gasPrice": Number(1500000000).toString(16),
                "value": Number(40000000000000000).toString(16),
            }]
        
            let txnHash = await window.ethereum.request({method: "eth_sendTransaction", params})
                .catch((err) => {
                    console.log(err)
                })
        
            Swal.fire({
                position: 'top-end',
                icon: 'info',
                title: 'Transaction Processing',
                showConfirmButton: false,
                timer: 15000
            })
            var receipt =  null;
            while (receipt == null) {
                receipt = await window.ethereum.request({method: 'eth_getTransactionReceipt', params: [txnHash]});
            }
            if (receipt['status'] == "0x1") {
                //This is to update memberCount & 
                const currentMC = data[meetingID]['memberCount'];
                const newcurrentMC = currentMC + 1;
                var newCount = 1;
                const arry = data[meetingID]['memberNames']
                const arryofKeys = Object.keys(arry)
                var counter = 1
                for (var k = 0; k < arryofKeys.length; k++) {
                    if (counter == parseInt(arryofKeys[k])) {
                        counter ++;
                        continue;
                    } else {
                        break
                    }
                }
                var newCount = counter
                var userName = prevData['users'][currentUser.uid]['lastName'];
                arry[newCount] = userName;
                //this is to update memberUID
                const arry2 = data[meetingID]['memberUID']
                arry2[newCount] = currentUser.uid;
                update(ref(db, 'Rooms/' + meetingID), {
                    'memberCount': newcurrentMC,
                    'memberNames': arry,
                    'memberUID': arry2
                })
                //This is to retrieve the Online Room the User is currently in
                update(ref(db, 'users/' + currentUser.uid), {
                    'onlineRoom':  meetingID,
                })
                alert('Redirecting!')
                window.location.href = "multiplayerGame.html"
            } else {
                alert('Transaction Failed!')
            }
        }
    })
})
