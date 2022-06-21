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
        var counter = 1;
        for (var k = 1; k < data.length; k++) {
            console.log(data[k])
            if (data[k] == 'undefined') {
                continue;
            } else {
                document.getElementById(counter).innerText = data[k];
                document.getElementById('numofP').innerText = `${data.length - 1}` + '/5';
                counter++
            }
        }
    });

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
            '<div class="commenterImage"><i class="fa-solid fa-circle-user" style = "margin-left: 20%"></i></div><div class="commentText"><p class="">' + data.val().message + '</p> <span class="date sub-text">' + 'Sent By ' + userLN + '</span></div>'
            var d1 = document.getElementById('bodyContent');
            d1.insertAdjacentHTML('beforebegin', divData);
        })
    })
})