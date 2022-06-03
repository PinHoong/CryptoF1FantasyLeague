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

const starCountRef = ref(db, 'Cars');
const starCountRef2 = ref(db, 'drivers');
get(starCountRef).then((snapshot) => {
    const data = snapshot.val();
    localStorage.setItem('data', JSON.stringify(data));
})

get(starCountRef2).then((snapshot2) => {
    const data2 = snapshot2.val();
    localStorage.setItem('data2', JSON.stringify(data2));
})

function stringHasTheWhiteSpaceOrNot(value){
    return value.indexOf(' ') >= 0;
}

function pointsGetter(value) {
    if (stringHasTheWhiteSpaceOrNot(value[0])) {
        var draftCar = value[0];
        var draftDriver = value[1];
    } else {
        var draftCar = value[1];
        var draftDriver = value[0];
    }
    var totalPoints;
    const dataa = JSON.parse(localStorage.getItem('data'));
    totalPoints = dataa[draftCar]['Score'];
    const dataa2 = JSON.parse(localStorage.getItem('data2'));
    totalPoints += dataa2[draftDriver]['Score'];
    return totalPoints;
}

const starCountRefPair1 = ref(db, 'users/' + currentUser.uid + '/pair1');
const starCountRefPair2 = ref(db, 'users/' + currentUser.uid + '/pair2');
get(starCountRefPair1).then((snapshot3) => {
    const dataP1 = snapshot3.val();
    localStorage.setItem('dataP1', JSON.stringify(dataP1));
})

get(starCountRefPair2).then((snapshot4) => {
    const dataP2 = snapshot4.val();
    localStorage.setItem('dataP2', JSON.stringify(dataP2));
})

const dataaP1 = JSON.parse(localStorage.getItem('dataP1'));
const dataaP2 = JSON.parse(localStorage.getItem('dataP2'));
var arrayofScores = [];
var pair1 = []
for (var key in dataaP1) {
    if (key == "nil") {
        continue;
    } else {
        pair1.push(key); 
    }
}
const driver1Name = stringHasTheWhiteSpaceOrNot(pair1[0]) ? pair1[1] : pair1[0];
var scoreOfPair = pointsGetter(pair1);
arrayofScores.push(scoreOfPair);
console.log(arrayofScores)
var pair2 = []
for (var key in dataaP2) {
    if (key == "nil") {
        continue;
    } else {
        pair2.push(key); 
    }
}
const driver2Name = stringHasTheWhiteSpaceOrNot(pair2[0]) ? pair2[1] : pair2[0];
console.log(arrayofScores)
var scoreOfPair2 = pointsGetter(pair2);
console.log(scoreOfPair2);
arrayofScores.push(scoreOfPair2);
console.log(arrayofScores)
localStorage.getItem('arrayofScoress', JSON.stringify(arrayofScores));
/*
const PairsForScores = JSON.parse(localStorage.getItem('ArrayOfScores'));
console.log(PairsForScores)
*/
//Function that decides if the user chooses the correc option or not
//Get the race the user is currently at

const starCountRef3 = ref(db, 'users/' + currentUser.uid);

get(starCountRef3).then((snapshot3) => {
    const userData = snapshot3.val();
    const userLastName = userData['lastName'];
    localStorage.setItem('userLastName', JSON.stringify(userLastName));
    const UserCurrentRace = userData['currentRace'];
    localStorage.setItem('userCurrentR', JSON.stringify(UserCurrentRace));
    const userConfigurationChoice = userData['choice'];
    localStorage.setItem('userConfigC', JSON.stringify(userConfigurationChoice));
})

const starCountRef4 = ref(db, 'races');
get(starCountRef4).then((snapshot4) => {
    const data3 = snapshot4.val();
    console.log(data3)
    const racesAvailable = [];
    for (var key in data3) {
        racesAvailable.push(key);
    }
    const raceName= racesAvailable[JSON.parse(localStorage.getItem('userCurrentR'))];
    const optimalChoiceForRace = data3[raceName]['Optimal'];
    const fastestTimeForRace = data3[raceName]['Fastest'];
    const fastestEverTimeForRace = data3[raceName]['FastestEver'];
    const averageTimeForRace = data3[raceName]['Average'];
    const slowestTimeForRace = data3[raceName]['Slowest'];
    localStorage.setItem('Fastest', JSON.stringify(fastestTimeForRace));
    localStorage.setItem('FastestEver', JSON.stringify(fastestEverTimeForRace));
    localStorage.setItem('Average', JSON.stringify(averageTimeForRace));
    localStorage.setItem('Slowest', JSON.stringify(slowestTimeForRace));
    localStorage.setItem('optimalCFR', JSON.stringify(optimalChoiceForRace));
})

const userConfigC = JSON.parse(localStorage.getItem('userConfigC'));
const optimalCFR = JSON.parse(localStorage.getItem('optimalCFR'));
var arrayOfTiming = [];
if (userConfigC == optimalCFR) {
    for (var s = 0; s < arrayofScores.length; s++) {
        arrayofScores[s] += 10
        var timingForAPair = lapTimingCalculator(arrayofScores[s]);
        arrayOfTiming.push(timingForAPair)
    }
    localStorage.setItem('arrayOfTiming', JSON.stringify(arrayOfTiming))
} else {
    var random_boolean = Math.random() < 0.5;
    console.log(random_boolean)
    if (random_boolean) {
        console.log("DNF")
    } else {
        for (var s = 0; s < arrayofScores.length; s++) {
            arrayOfTiming.push(lapTimingCalculator(arrayofScores[s]));
            localStorage.setItem('arrayOfTiming', JSON.stringify(arrayOfTiming))
        }
    }
}
console.log(arrayofScores)
var userRaceTimingDetails = {};
const userLN = JSON.parse(localStorage.getItem('userLastName'));
var userDriverNames = [];
userDriverNames.push(driver1Name);
userDriverNames.push(driver2Name);
localStorage.setItem('userDriverNames', JSON.stringify(userDriverNames));
console.log(userLN)
for (var s = 0; s < arrayofScores.length; s++) {
    var tempArray = [];
    tempArray.push(arrayofScores[s]);
    tempArray.push(userConfigC);
    var teamName = s + 1;
    var randomTempName = userDriverNames[s];
    tempArray.push(`${userLN}'s` + ' Team');
    userRaceTimingDetails[randomTempName] = tempArray;
}
localStorage.setItem('UserRaceTimingD', JSON.stringify(userRaceTimingDetails));
console.log(JSON.parse(localStorage.getItem('UserRaceTimingD')))
function lapTimingCalculator(value) {
    const fastest = JSON.parse(localStorage.getItem('Fastest'));
    const fastestEver = JSON.parse(localStorage.getItem('FastestEver'));
    const average = JSON.parse(localStorage.getItem('Average'));
    const slowest = JSON.parse(localStorage.getItem('Slowest'));
    if (value >= 141 & value < 165) {
        var timing = ((Math.random() * (average - slowest + 1)) + slowest).toFixed(3);
    } else if (value>= 165 & value < 172) {
        var timing = ((Math.random() * (fastest - average + 1)) + average).toFixed(3);
    } else {
        var timing = ((Math.random() * (fastestEver - fastest + 1)) + fastest).toFixed(3);
    }
    return convertHMS(timing);
}

function convertHMS(value) {
    const sec = parseInt(value, 10);
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    let subseconds = parseInt((value - ((minutes*60) + seconds)) * 1000);
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds+':'+subseconds; // Return is HH : MM : SS
}