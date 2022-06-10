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

const starCountRef = ref(db, 'users/' + currentUser.uid + '/raceResults');
get(starCountRef).then((snapshot) => {
    const data = snapshot.val();
    localStorage.setItem('userRaceResults', JSON.stringify(data));
})

const starCountRef2 = ref(db, 'users/' + currentUser.uid);
get(starCountRef2).then((snapshot2) => {
    var data2 = snapshot2.val();
    console.log(data2)
    const userListOfDrivers = data2['driverNames'];
    console.log(data2['driverNames'])
    const usrTimings = data2['test'];
    console.log(usrTimings)
    const dummies = {'Button': [150, 2, 'Toyota GP'], 'Raikonnen': [160, 2, 'Lotus F1'], 'Kobayashi': [165, 1, 'Honda F1'], 'Tate': [182, 3, 'Bugatti F1'], 'Barichello': [156, 2, 'Brawn GP'], 'Massa': [172, 3, 'Williams Martini'], 'Lauda': [182, 3, 'Porsche'], 'Piquet': [191, 2, 'Piquet GP']}
    const dummies2 = Object.assign({}, dummies, usrTimings)
    const res = {}
    var key;
    var value;
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
    console.log(items);
    var total = 0
    var idx = 0
    for (var i = 0;i < 10;i++){
        console.log(items[i][0])
        console.log(userListOfDrivers)
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
})


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