import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, update, get, child, push, set, onValue} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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

const set1 = ref(db, 'users/' + currentUser.uid)
get(set1).then((snapshot) => {
    const userData = snapshot.val();
    const pair1C = userData['poneC'];
    const pair1D = userData['poneD'];
    const pair2C = userData['ptwoC'];
    const pair2D = userData['ptwoD'];
    const userpair1 = userData['pair1'];
    const userpair2 = userData['pair2'];
    const onlineRoom = userData['onlineRoom']
    //This is to get the pair1 for the user
    var userpair1cd = [];
    for (var k1 in userpair1) {
        if (k1 != "nil") {
            userpair1cd.push(k1)
        }
    }
    //This is to get the pair2 for the user
    var userpair2cd = [];
    for (var k2 in userpair2) {
        if (k2 != "nil") {
            userpair2cd.push(k2)
        }
    }
    //This is to extract points for the entire cars database
    const bigdb = ref(db)
    get(bigdb).then((snapshot1) => {
        const dataa = snapshot1.val();
        const driversdata = dataa['drivers'];
        const carsdata = dataa['Cars'];
        //Calculation of points for pair1
        var points1 = 0;
        var pair1key = "" + currentUser.uid
        for (var c = 0; c < userpair1cd.length; c++) {
            var identity1 = userpair1cd[c];
            if (identity1.includes('2022')) {
              points1 += carsdata[identity1]['Score'];
              pair1key += "," + identity1
            } else {
              points1 += driversdata[identity1]['Score'];
              pair1key += "," + identity1
            }
          }
        //calculation of points for pair2
        var points2 = 0;
        var pair2key = "" + currentUser.uid
        for (var cc = 0; cc < userpair2cd.length; cc++) {
            var identity2 = userpair2cd[cc];
            if (identity2.includes('2022')) {
              points2 += carsdata[identity2]['Score'];
              pair2key += "," + identity2
            } else {
              points2 += driversdata[identity2]['Score'];
              pair2key += "," + identity2
            }
        }
        document.getElementById('readyUp').addEventListener('click', () => {
            Swal.fire({
                title: 'Are you sure?',
                text: 'This Action Is Not Reversible!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#50C878',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm!'
            }).then((result) => {
                if (result.isConfirmed) {

                    if (pair1C == 1 && pair1D == 1 && pair2C == 1 && pair2D == 1) {
                        const numofreadypeople = ref(db, 'Rooms/' + onlineRoom)
                        get(numofreadypeople).then((snapshot) => {
                        const data = snapshot.val();
                        if (!(currentUser.uid in data['ready_arr'])){
                        const num = data['readymembers']
                        const num1 = num + 1;
                        var scoreboard = data['scoreboard'];
                        var newSB = {};
                        const previous = data['ready_arr']
                        previous[currentUser.uid] = 1
                        const updated_ready = previous
                        for (var s in scoreboard) {
                            if (s != '1') {
                                newSB[s] = scoreboard[s]
                            }
                        }
                        var newpoints1 = scoreCal(points1);
                        var newpoints2 = scoreCal(points2)
                        newSB[pair1key] = newpoints1;
                        newSB[pair2key] = newpoints2;
                        update(ref(db, 'Rooms/' + onlineRoom), {
                            'ready_arr': updated_ready,
                            'readymembers': num1,
                            'scoreboard': newSB
                        })
                        }
                        else{
                            alert("You are readied")
                        }
                        })
                    } else {
                        alert('Something Went Wrong!')
                    }
                }
            })
        })

        document.getElementById('leaveGame').addEventListener('click', () => {
            const main = ref(db);
            get(main).then((snapshot) => {
                const data = snapshot.val()
                const onlineRoom_id = data['users'][currentUser.uid]['onlineRoom']
                const past_room = data['users'][currentUser.uid]['pastRoom']
                past_room[onlineRoom_id] = 1

                update(ref(db, 'users/' + currentUser.uid),{
                    'onlineRoom': '',
                    'pastRoom' : past_room
                })

                const name = data['users'][currentUser.uid]['lastName']
            
                const old = data['Rooms'][onlineRoom_id]['memberUID']
                const old2 = data['Rooms'][onlineRoom_id]['memberNames']
                const old3 = data['Rooms'][onlineRoom_id]['ready_arr']
                var old4 = data['Rooms'][onlineRoom_id]['readymembers']  
                var roomOwner = data['Rooms'][onlineRoom_id]['owner']
                const old5 = data['Rooms'][onlineRoom_id]['memberCount'] - 1   
                for (var k in old){
                    if (old[k] == currentUser.uid){
                        delete old[k]
                        break
                    }
                }
                for (var k  in old2){
                    if (old2[k] == name){
                        delete old2[k]
                        break 
                    }
                }
                if ((currentUser.uid) in old3){
                    delete old3[currentUser.uid]
                    old4 -= 1
                }
                if (currentUser.uid == roomOwner && old5 != 0) {
                    for (var key in old) {
                        var newOwner = old[key]
                        break
                    }
                    update(ref(db, 'Rooms/' + onlineRoom_id),{
                        'memberUID': old,
                        'memberNames': old2,
                        'ready_arr' : old3,
                        'readymembers': old4,
                        'memberCount': old5,
                        'owner': newOwner
                    }) 
                } else {
                    update(ref(db, 'Rooms/' + onlineRoom_id),{
                        'memberUID': old,
                        'memberNames': old2,
                        'ready_arr' : old3,
                        'readymembers': old4,
                        'memberCount': old5,
                    })
                }

                //if room is not played --> 

                location.href = 'index-2.html'
                
            })//end of snapshot
        })


        const ownerChange = ref(db, 'Rooms/' + onlineRoom + '/owner')
        onValue(ownerChange, (snapshotOC) => {
            var newOwner = snapshotOC.val();
            const userDataB = ref(db, 'users/' + newOwner);
            get(userDataB).then((snapshotUD) => {
                const userData = snapshotUD.val();
                var userLN = userData['lastName'];
                var userFN = userData['firstName'];
                Swal.fire('The leader is ' + userLN + ' ' + userFN)
            })
        })
        
        const racePlayed = ref(db, 'Rooms/' + onlineRoom + '/played')
        onValue(racePlayed, (snapshotRP) => {
            var racePlayed2 = snapshotRP.val();
            if (racePlayed2 == 1) {
                document.getElementById('leaveGame').innerText = 'Leave';
            }
        })
    })
})

function scoreCal(value1) {
    var random_boolean = Math.random() < 0.5;
    var random_boolean2 = Math.random() > 0.5;
    const average = 93.468;
    const slowest = 97.53;
    const fastest = 91.634;
    const fastestEver = 90.734;
    if (random_boolean && random_boolean2) {
        return 999
    } else {
        if (value1 >= 131 & value1 < 155) {
            return ((Math.random() * (average - slowest + 1)) + slowest).toFixed(3);
        } else if (value1 >= 155 & value1 < 162) {
            return ((Math.random() * (fastest - average + 1)) + average).toFixed(3);
        } else {
            return ((Math.random() * (fastestEver - fastest + 1)) + fastest).toFixed(3);
        }
    }
}