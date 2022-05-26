import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onValue, update, get} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZY8ufwFMkPhzOY-dNJm9bGXqv9okoW5g",
    authDomain: "f1-crypto.firebaseapp.com",
    databaseURL: "https://f1-crypto-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "f1-crypto",
    storageBucket: "f1-crypto.appspot.com",
    messagingSenderId: "512980395232",
    appId: "1:512980395232:web:9d81bc5d7c58bc5a13dc85"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const currentUser = JSON.parse(localStorage.getItem('usr'));

//First is to get which race the user is at.
const starCountRef = ref(db, 'users/' + currentUser.uid + '/currentRace');
get(starCountRef).then((snapshot) => {
    const raceNo = snapshot.val();
    localStorage.setItem('raceNo', JSON.stringify(raceNo));
})

//Next is to get the key (AKA Saudi Arabia etc)

const starCountRef2 = ref(db, 'races');
get(starCountRef2).then((snapshot2) => {
    const raceDetails = snapshot2.val();
    var arry = [];
    for (var key in raceDetails) {
        arry.push(key);
    }
    localStorage.setItem('raceDetails', JSON.stringify(raceDetails));
    localStorage.setItem('raceNames', JSON.stringify(arry));
})

//Now is time to set the variables
var currentRacenum = JSON.parse(localStorage.getItem('raceNo'));
localStorage.setItem('currentRaceNum', JSON.stringify(currentRacenum));
var currentRace = JSON.parse(localStorage.getItem('raceNames'))[currentRacenum];
localStorage.setItem('currentRaceC', JSON.stringify(currentRace))
var currentRaceDetails = JSON.parse(localStorage.getItem('raceDetails'))[currentRace];
const currentCircuitName = currentRaceDetails['Circuit'];
const currentCircuitLength = currentRaceDetails['Circuit Length'];
const currentCircuitImg = currentRaceDetails['Img'];
const currentCircuitLR = currentRaceDetails['Lap Record'];
const currentCircuitLaps = currentRaceDetails['Laps'];
const currentCircuitLRH = currentRaceDetails['Record'];
const currentRaceHighlights = currentRaceDetails['Highlights'];


//Time to automate the process
//First is CircuitLength
document.getElementById('CircuitLength').innerText = currentCircuitLength;
//Lap Record
document.getElementById('LapRecord').innerText = currentCircuitLR;
//Lap
document.getElementById('Lap').innerText = currentCircuitLaps;
//Lap Record Holder
document.getElementById('LapRecordHlder').innerText = currentCircuitLRH;
//Circuit Image
document.getElementById('circuitImg').innerHTML = `<img src = '${currentCircuitImg}'>`;
//Circuit Name
document.getElementById('RaceName').innerText = currentCircuitName;
//Country
document.getElementById('TextOverImg').innerText = currentRace;
//Race Num
const correctRN = currentRacenum + 1;
document.getElementById('raceNum').innerText = 'race' + ' ' + `${correctRN}`; 
//race Highlights
document.getElementById('raceHighlights').innerHTML = `<a href = '${currentRaceHighlights}'>Race Highlights</a>`;