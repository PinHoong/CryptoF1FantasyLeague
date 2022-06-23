import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onChildAdded, update, onValue, get, child, push, set} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const meetingID = ref(db, 'users/' + currentUser.uid + '/onlineRoom');
get(meetingID).then((snapshot) => {
    const mid = snapshot.val();
    console.log(mid)
    const starCountRef = ref(db, 'Rooms/' + mid+ '/memberNames');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        var arryofI = [];
        for (var k in data) {
            arryofI.push(k);
        }
        console.log(arryofI)
        for (var j = 1; j <=5; j++) {
            if (arryofI.includes(j.toString())) {
                var numBefore = j.toString() - 1;
                if (!arryofI.includes(numBefore) || j.toString() == '1') {
                    document.getElementById(j).innerText = data[j];
                } else {
                    document.getElementById(numBefore).innerText = data[j];
                }
            } else {
                console.log(2)
                document.getElementById(j).innerText = "";
            }
        }
    });


    //This to reflect the number of participants accurately
    const starCountRef3 = ref(db, 'Rooms/' + mid+ '/memberCount');
    onValue(starCountRef3, (snapshot3) => {
        const data3 = snapshot3.val();
        document.getElementById('numofP').innerText = `${data3}` + '/5';
    })

    /*
    //THIS IS TO SEND MESSAGE
    document.getElementById('sendBtn').addEventListener('click', (e) => {
        const user = ref(db, 'users/' + currentUser.uid);
        get(user).then((snapshot) => {
            const data = snapshot.val();
            var userLN = data['lastName'];
            var message = document.getElementById('message2').value;
            const id = push(child(ref(db), 'Rooms/' + mid + '/messages')).key;
            set(ref(db, 'Rooms/' + mid + '/messages/' + id), {
                name: userLN,
                message: message,
            } )
        })
    })

    //THIS IS TO DISPLAY NEW MESSAGES
    const newMag = ref(db, 'Rooms/' + mid + '/messages');
    const user = ref(db, 'users/' + currentUser.uid + '/lastName');
    get(user).then((snapshot) => {
        const userLN = snapshot.val();
        onChildAdded(newMag, (data) => {
            var divData = 
            '<li><div class="commenterImage"><i class="fa-solid fa-circle-user" style = "margin-left: 20%"></i></div><div class="commentText"><p class="">' + data.val().message + '</p> <span class="date sub-text">' + 'Sent By ' + data.val().name + '</span></div><li>'
            var d1 = document.getElementById('bodyContent');
            d1.insertAdjacentHTML('beforebegin', divData);
        })
    })
    */
    const numofU = ref(db, 'Rooms/' + mid + '/memberCount');
    onValue(numofU, (snapshot) => {
        const numofUsers = snapshot.val();
        const newNumofusers = numofUsers - 1;
        var test = firebase.database().ref('Rooms/' + mid + '/memberCount')
        test.onDisconnect().set(newNumofusers);
    })
    
    const updatememberUID = ref(db, 'Rooms/' + mid + '/memberUID');
    onValue(updatememberUID, (snapshot2) => {
        const data2 = snapshot2.val();
        var index;
        for (var keys in data2) {
            if (data2[keys] == currentUser.uid) {
                index = keys;
            }
        }
        console.log(index)

        var test2 = firebase.database().ref('Rooms/' + mid + '/memberUID/' + index)
        test2.onDisconnect().remove()

        var test3 = firebase.database().ref('Rooms/' + mid + '/memberNames/' + index)
        test3.onDisconnect().remove()
    })

    var test4 = firebase.database().ref('users/' + currentUser.uid + '/onlineRoom')
    test4.onDisconnect().set("")
})