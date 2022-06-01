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

function pointsGetter(value) {
    const draftCar = value[0];
    const draftDriver = value[1];

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
    localStorage.setItem('optimalCFR', JSON.stringify(optimalChoiceForRace));
})

const userConfigC = JSON.parse(localStorage.getItem('userConfigC'));
const optimalCFR = JSON.parse(localStorage.getItem('optimalCFR'));
if (userConfigC == optimalCFR) {
    console.log(1);
} else {
    console.log(2);
}

//If the person choose the correct option -- add 10 points
//Else -- random generator of "yes" or "No"
//If yes then car crash
//If no then car come out random times
