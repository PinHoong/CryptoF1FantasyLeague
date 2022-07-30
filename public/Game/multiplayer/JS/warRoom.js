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
    const starCountRef = ref(db, 'Rooms/' + mid+ '/memberNames');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        var arryofI = [];
        for (var k in data) {
            arryofI.push(k);
        }
        //This is to display the name properly
        for (var j = 1; j <=5; j++) {
            if (arryofI.includes(j.toString())) {
                var numBefore = j.toString() - 1;
                if (!arryofI.includes(numBefore) || j.toString() == '1') {
                    document.getElementById(j).innerText = data[j];
                } else {
                    document.getElementById(numBefore).innerText = data[j];
                }
            } else {
                document.getElementById(j).innerText = "";
            }
        }
    });


        const whatsmemberready = ref(db, 'Rooms/' + mid + '/ready_arr')
        onValue(whatsmemberready, (snapshot4) => {
            var k2map = {}
            const memberUIDs = ref(db, 'Rooms/' + mid + '/memberUID')
            get(memberUIDs).then((snapshot5) => {
                for (const [key2, value2] of Object.entries(snapshot5.val())) {
                    k2map[value2] = key2;
                }

                const kmap = {1:6, 2:7, 3:8, 4:9, 5: 10}
                const data4 = snapshot4.val();
                var readyUID = [];
                var readyUID2 = [6,7,8,9,10]
                for (const [key, value] of Object.entries(data4)) {
                    var newKey = k2map[key]
                    var newid = kmap[newKey];
                    if (newid == undefined) {
                        continue
                    } else {
                        readyUID.push(newid)
                        document.getElementById(newid).innerText = 'Ready';
                    }
                }
                for (var p = 0; p < readyUID2.length; p++) {
                    if (!(readyUID.includes(readyUID2[p]))) {
                        document.getElementById(readyUID2[p]).innerText = "";
                    }
                }
            })
        })


    //This to reflect the number of participants accurately
    const starCountRef3 = ref(db, 'Rooms/' + mid+ '/memberCount');
    onValue(starCountRef3, (snapshot3) => {
        const data3 = snapshot3.val();
        const potAmt = data3 * 0.04;
        document.getElementById('numofP').innerText = `${data3}` + '/5';
        document.getElementById('numofCoins').innerText = `${potAmt}`;
    })
})