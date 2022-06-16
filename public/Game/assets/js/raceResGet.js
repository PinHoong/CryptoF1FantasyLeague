function dummyRaceCalculator(value1, value2) {
    const fastest = JSON.parse(localStorage.getItem('Fastest'));
    const fastestEver = JSON.parse(localStorage.getItem('FastestEver'));
    const average = JSON.parse(localStorage.getItem('Average'));
    const slowest = JSON.parse(localStorage.getItem('Slowest'));
    const optimalCFR = JSON.parse(localStorage.getItem('optimalCFR'));

    if (value2 == optimalCFR) {
        value1 += 10;
        if (value1 >= 141 & value1 < 165) {
            return ((Math.random() * (average - slowest + 1)) + slowest).toFixed(3);
        } else if (value1 >= 165 & value1 < 172) {
            return ((Math.random() * (fastest - average + 1)) + average).toFixed(3);
        } else {
            return ((Math.random() * (fastestEver - fastest + 1)) + fastest).toFixed(3);
        }
    } else {
        var random_boolean = Math.random() < 0.5;
        if (random_boolean) {
            return 999;
        } else {
            if (value1 >= 141 & value1 < 165) {
                return ((Math.random() * (average - slowest + 1)) + slowest).toFixed(3);
            } else if (value1 >= 165 & value1 < 172) {
                return ((Math.random() * (fastest - average + 1)) + average).toFixed(3);
            } else {
                return ((Math.random() * (fastestEver - fastest + 1)) + fastest).toFixed(3);
            }
        }
    }
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
localStorage.clear();
const starCountRef = ref(db, 'users/' + currentUser.uid + '/raceResults');
get(starCountRef).then((snapshot) => {
    const data = snapshot.val();
    localStorage.setItem('userRaceResults', JSON.stringify(data));
})

const userListOfDrivers = JSON.parse(localStorage.getItem('userDriverNames'));
console.log(userListOfDrivers);
const raceRR = JSON.parse(localStorage.getItem('userRaceResults'));
console.log(raceRR)
/*
const userListOfDrivers = JSON.parse(localStorage.getItem('userDriverNames'));
console.log(userListOfDrivers)
*/
//Here is the problem
const usrtimings = JSON.parse(localStorage.getItem('UserRaceTimingD'))
console.log(usrtimings)
var key;
var value;
if (raceRR == 1) {
    const items = JSON.parse(localStorage.getItem('PrevItems'));
    fillingupTable(items);
} else {
    const dummies = {'Button': [150, 2, 'Toyota GP'], 'Raikonnen': [160, 2, 'Lotus F1'], 'Kobayashi': [165, 1, 'Honda F1'], 'Tate': [182, 3, 'Bugatti F1'], 'Barichello': [156, 2, 'Brawn GP'], 'Massa': [172, 3, 'Williams Martini'], 'Lauda': [182, 3, 'Porsche'], 'Piquet': [191, 2, 'Piquet GP']}
    const dummies2 = Object.assign({}, dummies, usrtimings)
    const res = {}
    for ([key, value] of Object.entries(dummies2)){
        res[key] = dummyRaceCalculator(dummies2[key][0], dummies2[key][1])
    }
    
    var items = Object.keys(res).map(function(key) {
        return [key, res[key]];
      });
      
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return first[1] - second[1];
      });
    console.log(items)
    localStorage.setItem('PrevItems',JSON.stringify(items));
    fillingupTable(items);
    const starCountRef2 = ref(db, 'users/' + currentUser.uid);
    get(starCountRef2).then((snapshot2) => {
        const data2 = snapshot2.val();
        update(ref(db, 'users/' + currentUser.uid), {
            'raceResults': 1,
          })//end of update
    })
}


  
function fillingupTable(items) {
    const dummies = {'Button': [150, 2, 'Toyota GP'], 'Raikonnen': [160, 2, 'Lotus F1'], 'Kobayashi': [165, 1, 'Honda F1'], 'Tate': [182, 3, 'Bugatti F1'], 'Barichello': [156, 2, 'Brawn GP'], 'Massa': [172, 3, 'Williams Martini'], 'Lauda': [182, 3, 'Porsche'], 'Piquet': [191, 2, 'Piquet GP']}
    const dummies2 = Object.assign({}, dummies, usrtimings)
    console.log(dummies2)
    var total = 0
    var idx = 0
    for (var i = 0;i < 10;i++){
        console.log(items[i][0])
        if (items[i][1] == 999) {
            if (userListOfDrivers.includes(items[i][0])) {
                document.getElementById((i + 1).toString()).innerHTML = '<td style = "background: #f1fc8f">' + items[i][0] + '</td><td style = "background: #f1fc8f">' + dummies2[items[i][0]][2] + '</td><td style = "background: #f1fc8f">' + 'DNF'
            } else {
                document.getElementById((i + 1).toString()).innerHTML = '<td>' + items[i][0] + '</td><td>' + dummies[items[i][0]][2] + '</td><td>' + 'DNF'
            }
        } else if (userListOfDrivers.includes(items[i][0])) {
            document.getElementById((i + 1).toString()).innerHTML = '<td style = "background: #f1fc8f">' + items[i][0] + '</td><td style = "background: #f1fc8f">' + dummies2[items[i][0]][2] + '</td><td style = "background: #f1fc8f">' + convertHMS(items[i][1])
            total += parseInt(items[i][1])
            idx += 1 
        } else {
            document.getElementById((i + 1).toString()).innerHTML = '<td>' + items[i][0] + '</td><td>' + dummies[items[i][0]][2] + '</td><td>' + convertHMS(items[i][1])
            total += parseInt(items[i][1])
            idx += 1 
        }
    }
    const ave = convertHMS(total /idx)
    const fastest = convertHMS(items[0][1])
    document.getElementById('first').innerText =items[0][0]
    document.getElementById('second').innerText=items[1][0]
    document.getElementById('third').innerText=items[2][0]
    document.getElementById('ave').innerHTML =   ave + '<i class="fa-solid fa-stopwatch fa-2x" id = "stopwatch"></i>'
    document.getElementById('fast').innerHTML = fastest + '<i class="fa fa-bolt fa-2x" aria-hidden="true" id = "gauge"></i>'
}

  

