import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onValue, update, get} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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

//First is to get which race the user is at.
const starCountRef = ref(db)
get(starCountRef).then((snapshot) => {
    const data = snapshot.val();
    var raceNo = data['users'][currentUser.uid]['currentRace'];
    var raceDetails = data['races'];
    var raceNames = [];
    for (var key in raceDetails) {
        raceNames.push(key);
    }
    console.log(raceNo)
    var currentRace = raceNames[raceNo];
    console.log(currentRace)
    var currentRaceDetails = raceDetails[currentRace];
        console.log(currentRaceDetails)
        const currentCircuitName = currentRaceDetails['Circuit'];
        const currentCircuitLength = currentRaceDetails['Circuit Length'];
        const currentCircuitImg = currentRaceDetails['Img'];
        const currentCircuitLR = currentRaceDetails['Lap Record'];
        const currentCircuitLaps = currentRaceDetails['Laps'];
        const currentCircuitLRH = currentRaceDetails['Record'];
        const currentRaceHighlights = currentRaceDetails['Highlights'];
        console.log(currentCircuitName)
        console.log(currentRaceDetails)
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
        if (currentRace == 'Spain') {
            //document.getElementById('TextOverImg').style.fontSize = '120px';
            document.getElementById('TextOverImg').style.left = '40%';
            //document.getElementById('TextOverImg').style.top = '25%';
        } else if (currentRace == 'Italy') {
            document.getElementById('TextOverImg').style.left = '42%';
        } else if (currentRace == "Singapore") {
            document.getElementById('TextOverImg').style.left = '33%';
        }
        //Race Num
        const correctRN = raceNo + 1;
        console.log(correctRN)
        document.getElementById('raceNum').innerText = 'race' + ' ' + `${correctRN}`; 
        //race Highlights
        document.getElementById('raceHighlights').innerHTML = `<a href = '${currentRaceHighlights}'>Race Highlights</a>`;
    })
/*
    
    console.log(currentCircuitName)
    console.log(currentRaceDetails)
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
    if (currentRace == 'Spain') {
        //document.getElementById('TextOverImg').style.fontSize = '120px';
        document.getElementById('TextOverImg').style.left = '40%';
        //document.getElementById('TextOverImg').style.top = '25%';
    } else if (currentRace == 'Italy') {
        document.getElementById('TextOverImg').style.left = '42%';
    } else if (currentRace == "Singapore") {
        document.getElementById('TextOverImg').style.left = '33%';
    }
    //Race Num
    const correctRN = currentRacenum + 1;
    document.getElementById('raceNum').innerText = 'race' + ' ' + `${correctRN}`; 
    //race Highlights
    document.getElementById('raceHighlights').innerHTML = `<a href = '${currentRaceHighlights}'>Race Highlights</a>`;
})

//Next is to get the key (AKA Saudi Arabia etc)

const starCountRef2 = ref(db, 'races');
get(starCountRef2).then((snapshot2) => {
    const raceDetails = snapshot2.val();
    var arry = [];
    for (var key in raceDetails) {
        arry.push(key);
    }
    console.log(arry)
    localStorage.setItem('raceDetails', JSON.stringify(raceDetails));
    localStorage.setItem('raceNames', JSON.stringify(arry));
})

//Now is time to set the variables
function changingWebsiteDetails() {
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
    
    console.log(currentCircuitName)
    console.log(currentRaceDetails)
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
    if (currentRace == 'Spain') {
        //document.getElementById('TextOverImg').style.fontSize = '120px';
        document.getElementById('TextOverImg').style.left = '40%';
        //document.getElementById('TextOverImg').style.top = '25%';
    } else if (currentRace == 'Italy') {
        document.getElementById('TextOverImg').style.left = '42%';
    } else if (currentRace == "Singapore") {
        document.getElementById('TextOverImg').style.left = '33%';
    }
    //Race Num
    const correctRN = currentRacenum + 1;
    document.getElementById('raceNum').innerText = 'race' + ' ' + `${correctRN}`; 
    //race Highlights
    document.getElementById('raceHighlights').innerHTML = `<a href = '${currentRaceHighlights}'>Race Highlights</a>`;
}
*/