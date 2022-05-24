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

  const starCountRef2 = ref(db, 'users/' + currentUser.uid + '/cars');
  const starCountRef = ref(db, 'Cars');
  get(starCountRef2).then((snapshot) => {
      const data = snapshot.val();
      var arry = [];
      for (var key in data) {
          if (key == "nil") {
              continue;
          } else {
              arry.push(key);
          }
      }
      get(starCountRef).then((snapshot1) => {
        const data2 = snapshot1.val();
        var totalScore = [];
        for (var i = 0; i < arry.length; i++) {
            totalScore.push(data2[arry[i]]['Score']);
        }
        localStorage.setItem('points', JSON.stringify(totalScore))
      })

  })


const starCountRef3 = ref(db, 'users/' + currentUser.uid + '/drivers')
const starCountRef4 = ref(db, 'drivers')

get(starCountRef3).then((snapshot2) => {
    const data3 = snapshot2.val();
    var arry2 = [];
    for (var key2 in data3) {
        if (key2 == "nil") {
            continue;
        } else {
            arry2.push(key2);
        }
    }
    get(starCountRef4).then((snapshot3) => {
        const data4 = snapshot3.val();
        var totalScore2 = [];
        for (var j = 0; j < arry2.length; j++) {
            totalScore2.push(data4[arry2[j]]['Score']);
        }
        localStorage.setItem('points2', JSON.stringify(totalScore2));
    })
})

function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds; // Return is HH : MM : SS
}

var carsPoints = JSON.parse(localStorage.getItem('points'));
var driverPoints = JSON.parse(localStorage.getItem('points2'));
var arry3 = [];

for (var z = 0; z < 2; z++) {
    var TotalPoints = carsPoints[z] + driverPoints[z];
    console.log(TotalPoints)
    if (TotalPoints >= 130 && TotalPoints < 150) {
        var raceTiming = ((Math.random() * 21) + 100).toFixed(2);
        arry3.push(convertHMS(raceTiming))
    } else {
        var raceTiming = ((Math.random() * 11) + 100).toFixed(2);
        arry3.push(convertHMS(raceTiming))
    }
}
