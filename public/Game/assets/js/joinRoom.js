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
        const userRoom = data['onlineRoom'];
        console.log(userRoom)
        if (userRoom != "") {
            alert('You Cannot Mulitple Rooms!')
        } else {
            console.log('I am Here!')
            const userLN = data['lastName']
            const newPostKey = push(child(ref(db), 'Rooms')).key;
            alert('Send The Unique Room To Your User: ' + newPostKey);
                //  -N53RoIIxLrfR3Z2IgBU
            const updates = {};
            console.log(newPostKey)
            updates['/Rooms/' + newPostKey] = {
                owner: currentUser.uid,
                memberNames: {1: userLN}, 
                memberCount: 1,
                readymembers: 0,
                messages: '',
                memberUID: {1: currentUser.uid},
                scoreboard: {1: 0},
                confirmed: 0,
                //scoreboard: {},
            }
            update(ref(db), updates);
            update(ref(db, 'users/' + currentUser.uid), {
                'onlineRoom':  newPostKey,
            })
            window.location.href = "multiplayerGame.html"
        }
    })
})

//this is for joining of game room!
document.getElementById('btn2').addEventListener('click', () => {
    var meetingID = document.getElementById('text1').value.toString();
    console.log(meetingID)
    const starCountRef = ref(db);
    get(starCountRef).then((snapshot) => {
        const prevData = snapshot.val();
        const onlineRoom2 = prevData['users'][currentUser.uid]['onlineRoom'];
        if (onlineRoom2 != "") {
            alert('Cannot Join Multiple Rooms!')
        } else {
            const data = prevData['Rooms'];
            //arryofKeys consist of all the Rooms' meeting ID
            var arryOfKeys = [];
            for (var key in data) {
                arryOfKeys.push(key)
            }
            if (arryOfKeys.includes(meetingID)) {
                const data2 = prevData['Rooms'][meetingID]['memberUID']
                //arryofUID consists of all the memberUID that belongs in the room
                var arryofUID = [];
                for (var key2 in data2) {
                    arryofUID.push(data2[key2])
                }
                if (!arryofUID.includes(currentUser.uid)) {
                    const starCountRef = ref(db, 'Rooms/' + meetingID + '/memberCount');
                    //Not too sure what will happen if two fight for the same spots --> got to run some tests here!
                    get(starCountRef).then((snapshot) => {
                        var amt = snapshot.val();
                        if (amt < 5) {
                            //This is to update memberCount & 
                            const currentMC = data[meetingID]['memberCount'];
                            var newCount = currentMC + 1;
                            const arry = data[meetingID]['memberNames']
                            var userName = prevData['users'][currentUser.uid]['lastName'];
                            arry[newCount] = userName;
                            //this is to update memberUID
                            const arry2 = data[meetingID]['memberUID']
                            arry2[newCount] = currentUser.uid;
                            update(ref(db, 'Rooms/' + meetingID), {
                                'memberCount': newCount,
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
                            alert('Limit Is Reached')
                        }
                    })
                } else {
                    //The user already belongs in the room -- so just redirect will do
                    window.location.href = "multiplayerGame.html"
                }
            } else {
                alert('No Such Rooms Exists!')
            }
        }
    })
})