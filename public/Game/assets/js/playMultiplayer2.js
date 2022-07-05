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
const wholeDB = ref(db);
get(wholeDB).then((snapshot) => {
    const data = snapshot.val();
    var currentMR = data['users'][currentUser.uid]['onlineRoom']
    var meetingRmOwner = data['Rooms'][currentMR]['owner']
    var meetingRmDetails = data['Rooms'][currentMR]['readymembers']
    var meetingRmCapacity = data['Rooms'][currentMR]['memberCount']
    
    //This helps to take account the user pressing the play button
    document.getElementById('startGame').addEventListener('click', () => {
        if (currentUser.uid == meetingRmOwner) {
            if (meetingRmCapacity == meetingRmDetails) {
                update(ref(db, 'Rooms/' + currentMR), {
                    'confirmed': 1,
                })
            } else {
                alert('One user is still selecting their configuration!')
            }
        } else {
            alert('Only the owner of the room can start the race!')
        }
    })

    //this is to make use of the onValue changes
    const israceConfirmed = ref(db, 'Rooms/' + currentMR + '/confirmed')
    onValue(israceConfirmed, (snapshot) => {
        const confirmedNo = snapshot.val();
        console.log(confirmedNo)
        if (confirmedNo != 0) {
            const starCountRef = ref(db, 'Rooms/' + currentMR + '/scoreboard')
            //This get is important as it ensures the ensure array is taken whenever the value changes -- aka gameStart
            get(starCountRef).then((snapshot2) => {
                var meetingRmPairs = snapshot2.val()
                var items = Object.keys(meetingRmPairs).map(function(key) {
                    return [key, meetingRmPairs[key]];
                });
                items.sort(function(first, second) {
                    return first[1] - second[1];
                })
                
                for (var keys in items) {
                    var firstID = parseInt(keys) + 11;
                    var secondID = parseInt(keys) + 21;
                    var thirdID = parseInt(keys) + 31;
    
                    var userDetails = items[keys][0];
                    var userRaceTiming = items[keys][1];
                    var userDetailsArr = userDetails.split(',')
                    var userLN = getUserName(userDetailsArr[0], data)
                    console.log(userLN)
                    var userPair = userDetailsArr[1] + " & " + userDetailsArr[2]
                    console.log(userRaceTiming)
                    console.log(userLN)
                    console.log(userPair)
    
    
                    //this is to perform the innerText
                    if (userDetailsArr[0] == currentUser.uid) {
                        document.getElementById(firstID).style.backgroundColor = "#FFFFC2"
                        document.getElementById(secondID).style.backgroundColor = "#FFFFC2"
                        document.getElementById(thirdID).style.backgroundColor = "#FFFFC2"
                    } else {
                        document.getElementById(firstID).style.backgroundColor = ""
                        document.getElementById(secondID).style.backgroundColor = ""
                        document.getElementById(thirdID).style.backgroundColor = ""
                    }
                    document.getElementById(firstID).innerText = userLN;
                    document.getElementById(secondID).innerText = userPair;
                    document.getElementById(thirdID).innerText = convertHMS(userRaceTiming)
                }
    
                function getUserName(userID, data) {
                    return data['users'][userID]['lastName'];
                }

                function convertHMS(value) {
                    if (parseInt(value) == 999) {
                        return 'DNF'
                    } else {
                        const sec = parseInt(value, 10);
                        let hours   = Math.floor(sec / 3600); // get hours
                        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
                        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
                        let subseconds = parseInt((value - ((minutes*60) + seconds)) * 1000);
                        // add 0 if value < 10; Example: 2 => 02
                        if (hours   < 10) {hours   = "0"+hours;}
                        if (minutes < 10) {minutes = "0"+minutes;}
                        if (seconds < 10) {seconds = "0"+seconds;}
                        if (subseconds  < 100) {subseconds   = "0"+subseconds;}
                        return minutes+':'+seconds+':'+subseconds; // Return is HH : MM : SS
                    }
                }
            }) 
        }
    })
})
    /*
    if (true) {
        var meetingRmPairs = data['Rooms'][currentMR]['scoreboard']
        var items = Object.keys(meetingRmPairs).map(function(key) {
            return [key, meetingRmPairs[key]];
        });
        items.sort(function(first, second) {
            return first[1] - second[1];
        })
        console.log(items)
        var newDict = {}
        for (var keys in items) {
            console.log(keys)
            newDict[items[keys][0]] = items[keys][1]
        }

        console.log(newDict)
        update(ref(db, 'Rooms/' + currentMR), {
            'scoreboard': newDict,
        })

        const starCountRef = ref(db, 'Rooms/' + currentMR + '/scoreboard')
        onValue(starCountRef, (snapshot) => {
            const data2 = snapshot.val();
            var items2 = Object.keys(data2).map(function(key) {
                return [key, data2[key]];
            });
            items2.sort(function(first, second) {
                return first[1] - second[1];
            })
            for (var keys in items2) {
                var firstID = parseInt(keys) + 11;
                var secondID = parseInt(keys) + 21;
                var thirdID = parseInt(keys) + 31;

                var userDetails = items2[keys][0];
                var userRaceTiming = items2[keys][1];
                var userDetailsArr = userDetails.split(',')
                var userLN = getUserName(userDetailsArr[0], data)
                console.log(userLN)
                var userPair = userDetailsArr[1] + " & " + userDetailsArr[2]
                console.log(userRaceTiming)
                console.log(userLN)
                console.log(userPair)

                if (userDetailsArr[0] == currentUser.uid) {
                    document.getElementById(firstID).style.backgroundColor = "#FFFFC2"
                    document.getElementById(secondID).style.backgroundColor = "#FFFFC2"
                    document.getElementById(thirdID).style.backgroundColor = "#FFFFC2"
                } else {
                    document.getElementById(firstID).style.backgroundColor = ""
                    document.getElementById(secondID).style.backgroundColor = ""
                    document.getElementById(thirdID).style.backgroundColor = ""
                }
                document.getElementById(firstID).innerText = userLN;
                document.getElementById(secondID).innerText = userPair;
                document.getElementById(thirdID).innerText = userRaceTiming
            }

            function getUserName(userID, data) {
                return data['users'][userID]['lastName'];
            }
        })
    }
})
*/