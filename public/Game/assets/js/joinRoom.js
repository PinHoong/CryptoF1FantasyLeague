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
var userName = ref(db, 'users/' + currentUser.uid + '/lastName');
document.getElementById('btn1').addEventListener('click', () => {
    get(userName).then((snapshot) => {
        const userLN = snapshot.val();
        const newPostKey = push(child(ref(db), 'Rooms')).key;
        alert('Send The Unique Room To Your User: ' + newPostKey);
            //  -N53RoIIxLrfR3Z2IgBU
        const updates = {};
        updates['/Rooms/' + newPostKey] = {
            owner: currentUser.uid,
            memberNames: {1: userLN}, 
            memberCount: 1,
            messages: '',
        }
        update(ref(db), updates);
        update(ref(db, 'users/' + currentUser.uid), {
            'onlineRoom':  newPostKey,
        })
        window.location.href = "multiplayerGame.html"
    })
})

document.getElementById('btn2').addEventListener('click', () => {
    var meetingID = document.getElementById('text1').value.toString();
    console.log(meetingID)
    const starCountRef = ref(db);
    get(starCountRef).then((snapshot) => {
        const prevData = snapshot.val();
        const data = prevData['Rooms'];
        var arryOfKeys = [];
        for (var key in data) {
            arryOfKeys.push(key)
        }
        if (arryOfKeys.includes(meetingID)) {
            const currentMC = data[meetingID]['memberCount'];
            var newCount = currentMC + 1;
            const arry = data[meetingID]['memberNames']
            var userName = prevData['users'][currentUser.uid]['lastName'];
            arry[newCount] = userName;
            const updates = {};
            update(ref(db, 'Rooms/' + meetingID), {
                'memberCount': newCount,
                'memberNames': arry
            })
            update(ref(db, 'users/' + currentUser.uid), {
                'onlineRoom':  meetingID,
            })
            alert('Done')
            window.location.href = "multiplayerGame.html"
        } else {
            alert('Sorry No Such Room Exists!')
        }
    })
})