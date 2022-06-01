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
    console.log(draftCar)
    console.log(draftDriver)

    const starCountRef = ref(db, 'Cars');
    const starCountRef2 = ref(db, 'drivers');

    var totalPoints = 0;
    get(starCountRef).then((snapshot) => {
        const data = snapshot.val();
        totalPoints += data[draftCar]['Score'];
    })

    get(starCountRef2).then((snapshot2) => {
        const data2 = snapshot2.val();
        totalPoints += data2[draftDriver]['Score'];
        localStorage.setItem('scores', JSON.stringify(totalPoints));
    })
    const finalTP = JSON.parse(localStorage.getItem('scores'));
    return finalTP;
}  
const starCountRefPair1 = ref(db, 'users/' + currentUser.uid + '/pair1');
const starCountRefPair2 = ref(db, 'users/' + currentUser.uid + '/pair2');
get(starCountRefPair1).then((snapshot3) => {
    const data = snapshot3.val();
    const pair1 = []
  for (var key in data) {
      if (key == "nil") {
          continue;
      } else {
          pair1.push(key); 
      }
  
  }
  var arrayofScores = [];
  arrayofScores.push(pointsGetter(pair1));

  get(starCountRefPair2).then((snapshot4) => {
      const data2 = snapshot4.val();
      const pair2 = [];
      for (var key in data2) {
        if (key == "nil") {
            continue;
        } else {
            pair2.push(key); 
        }
    }
    arrayofScores.push(pointsGetter(pair2));
    localStorage.setItem('ArrayOfScores', JSON.stringify(arrayofScores));
  })
})

const PairsForScores = JSON.parse(localStorage.getItem('ArrayOfScores'));
console.log(PairsForScores)

//Function that decides if the user chooses the correc option or not
//Get the race the user is currently at

const starCountRef3 = ref(db, 'users/' + currentUser.uid);

get(starCountRef3).then((snapshot3) => {
    const userData = snapshot3.val();
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
    for (var s = 0; s < PairsForScores.length; s++) {
        PairsForScores[s] += 10
        var timingForAPair = lapTimingCalculator(PairsForScores[s]);
        arrayOfTiming.push(timingForAPair)
    }
    localStorage.setItem('arrayOfTiming', JSON.stringify(arrayOfTiming))
} else {
    var random_boolean = Math.random() < 0.5;
    if (random_boolean) {
        console.log("DNF")
    } else {
        for (var s = 0; s < PairsForScores.length; s++) {
            arrayOfTiming.push(lapTimingCalculator(PairsForScores[s]));
            localStorage.setItem('arrayOfTiming', JSON.stringify(arrayOfTiming))
        }
    }
}
var userRaceTimingDetails = {};
for (var s = 0; s < PairsForScores.length; s++) {
    var tempArray = [];
    tempArray.push(PairsForScores[s]);
    tempArray.push(userConfigC);
    var teamName = s + 1;
    var randomTempName = "User's Driver " + `${teamName}`;
    tempArray.push('Your Team');
    userRaceTimingDetails[randomTempName] = tempArray;
}
localStorage.setItem('UserRaceTimingD', JSON.stringify(userRaceTimingDetails));

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