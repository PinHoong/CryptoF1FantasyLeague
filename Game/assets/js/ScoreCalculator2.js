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

const starCountRef3 = ref(db, 'users/' + currentUser.uid + '/pair1');
const starCountRef4 = ref(db, 'users/' + currentUser.uid + '/pair2');

get(starCountRef3).then((snapshot3) => {
    const data3 = snapshot3.val();

    const pair1 = [];
    for (var key in data3) {
        if (key == 'nil') {
            continue;
        } else {
            pair1.push(key);
        }
    }
    var scoreD1 = 0;
    for (var s =0; s < pair1.length; s++) {
        if (stringHasTheWhiteSpaceOrNot(pair1[s])) {
            const carData = JSON.parse(localStorage.getItem('data'));
            scoreD1+= carData[pair1[s]]['Score'];
        } else {
            const driverData = JSON.parse(localStorage.getItem('data2'));
            localStorage.setItem('driver1', JSON.stringify(pair1[s]));
            scoreD1+= driverData[pair1[s]]['Score'];
        }
    }
    localStorage.setItem('scoreD1', JSON.stringify(scoreD1));
})

get(starCountRef4).then((snapshot4) => {
    const data4 = snapshot4.val();

    const pair2 = [];
    for (var key in data4) {
        if (key == 'nil') {
            continue;
        } else {
            pair2.push(key);
        }
    }
    var scoreD2 = 0;
    for (var s =0; s < pair2.length; s++) {
        if (stringHasTheWhiteSpaceOrNot(pair2[s])) {
            const carData = JSON.parse(localStorage.getItem('data'));
            scoreD2+= carData[pair2[s]]['Score'];
        } else {
            const driverData = JSON.parse(localStorage.getItem('data2'));
            localStorage.setItem('driver2', JSON.stringify(pair2[s]));
            scoreD2+= driverData[pair2[s]]['Score'];
        }
    }
    localStorage.setItem('scoreD2', JSON.stringify(scoreD2));
})


const starCountRef5 = ref(db, 'users/' + currentUser.uid);
get(starCountRef5).then((snapshot5) => {
    var data5 = snapshot5.val();
    const userLN = data5['lastName'];
    const userChoice = data5['choice'];
    var userRaceTimingDetails = {};
    var scoresForPairs = [];
    scoresForPairs.push(JSON.parse(localStorage.getItem('scoreD1')));
    scoresForPairs.push(JSON.parse(localStorage.getItem('scoreD2')));
    var driversNamesForPairs = [];
    driversNamesForPairs.push(JSON.parse(localStorage.getItem('driver1')));
    driversNamesForPairs.push(JSON.parse(localStorage.getItem('driver2')));
    localStorage.setItem('userDriverNames', JSON.stringify(driversNamesForPairs));
    for (var s = 0; s < 2; s++) {
        var tempArray = [];
        tempArray.push(scoresForPairs[s]);
        tempArray.push(userChoice);
        var randomTempName = driversNamesForPairs[s];
        tempArray.push(`${userLN}'s` + ' Team');
        userRaceTimingDetails[randomTempName] = tempArray;
    }
    update(ref(db, 'users/' + currentUser.uid), {
        'test': userRaceTimingDetails,
        'driverNames': driversNamesForPairs,
      })//end of update
      /*
      const starCountRef6 = ref(db, 'users/' + currentUser.uid + '/raceResults');
      get(starCountRef6).then((snapshot6) => {
          const data6 = snapshot6.val();
          localStorage.setItem('userRaceResults', JSON.stringify(data6));
      })
      */
      const userRR = data5['raceResults'];
      if (userRR == 1) {
          const items = JSON.parse(localStorage.getItem('prevItems'));
          var total = 0
          var idx = 0
          for (var i = 0;i < 10;i++){
            const userListOfDrivers = data5['driverNames'];
            const usrTimings = data5['test'];
            const dummies = {'Button': [150, 2, 'Toyota GP'], 'Raikonnen': [160, 2, 'Lotus F1'], 'Kobayashi': [165, 1, 'Honda F1'], 'Tate': [182, 3, 'Bugatti F1'], 'Barichello': [156, 2, 'Brawn GP'], 'Massa': [172, 3, 'Williams Martini'], 'Lauda': [182, 3, 'Porsche'], 'Piquet': [191, 2, 'Piquet GP']}
            const dummies2 = Object.assign({}, dummies, usrTimings)
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
        const starCountRef10 = ref(db, 'users/' + currentUser.uid + '/seasonPoints');
        get(starCountRef10).then((snapshot10) => {
          const spp = snapshot10.val();
          console.log(spp)
          const spp2 = `"${spp}"`;
          console.log(spp2)
          const spp3 = ((spp/50) * 100).toFixed(0);
          document.getElementById('Usrcumulativepoints').innerHTML = '<progress id = "Usrcumulativepoints" value = ' + spp2  + 'max = "50"></progress>';
          document.getElementById('ProgressStatus').innerHTML = '<span>' + spp3 + '%' + '</span>'
        })
      } else {
      const starCountRef7 = ref(db);
      get(starCountRef7).then((snapshot7) => {
          var data7 = snapshot7.val();
          const userListOfDrivers = data7['users'][currentUser.uid]['driverNames'];
          //console.log(data7['driverNames'])
          const usrTimings = data7['users'][currentUser.uid]['test'];
          //console.log(usrTimings)
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
          var topThree = [];
          for (var z =0; z < 3; z++) {
              topThree.push(items.slice(0,3)[z][0]);
          }
          var pointsRace =pointsCal(topThree, userListOfDrivers);
          const userCP = data5['seasonPoints'];
          update(ref(db, 'users/' + currentUser.uid ), {
            'seasonPoints': pointsRace + userCP,
        })
        const starCountRef9 = ref(db, 'users/' + currentUser.uid);
        get(starCountRef9).then((snapshot9) => {
          const data9 = snapshot9.val();
          const sp = data9['seasonPoints']
          console.log(sp)
          const sp2 = `"${sp}"`;
          console.log(sp2)
          const sp3 = ((sp/50) * 100).toFixed(0);
          document.getElementById('Usrcumulativepoints').innerHTML = '<progress id = "Usrcumulativepoints" value = ' + sp2  + 'max = "50"></progress>';
          document.getElementById('ProgressStatus').innerHTML = '<span>' + sp3 + '%' + '</span>'

          /*This will check if the user goes into lucky wheel or not*/
          const userCurrentR = data9['currentRace']
          if (userCurrentR == 4 && sp >= 50) {
            document.getElementById('proceedNextRace').innerText = 'collect';
            document.getElementById('proceedNextRace').href = './luckyWheel.html'
            document.getElementById('proceedNextRace').addEventListener('click', (e) => {
                /*KIV if want to put this section into the luckyWheel2.js*/
                update(ref(db, 'users/' + currentUser.uid), {
                    'currentRace': 0,
                    'raceResults': 0,
                    'seasonPoints': 0,
                    'choice':0,
                })
            })
        } else if (userCurrentR == 4 && sp < 50) {
            document.getElementById('proceedNextRace').innerText = 'New';
            document.getElementById('proceedNextRace').href = './index-2.html'
            /*Ugly fix here*/
            document.getElementById('proceedNextRace').addEventListener('click', (e) => {
                alert('Try Again Next Season! You Will Be Redirected Back To The Home Page Now!')
                update(ref(db, 'users/' + currentUser.uid), {
                    'currentRace': 0,
                    'raceResults': 0,
                    'seasonPoints': 0,
                    'choice': 0,
                })
            })
        }
        })
          localStorage.setItem('prevItems', JSON.stringify(items))
          var total = 0
          var idx = 0
          for (var i = 0;i < 10;i++){
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

          update(ref(db, 'users/' + currentUser.uid ), {
              'raceResults': 1,
          })
          function dummyRaceCalculator(value1, value2) {
            const starCountRef8 = ref(db);
            var userCRI = data7['users'][currentUser.uid]['currentRace'];
            //console.log(userCRI)
            var racesName = data7['users'][currentUser.uid]['raceNames'][userCRI];
            //console.log(data8)
            const fastest = data7['races'][racesName]['Fastest'];
                //localStorage.setItem('Fastest', JSON.stringify(fastest));
            const fastestEver = data7['races'][racesName]['FastestEver'];
                //localStorage.setItem('FastestEver', JSON.stringify(fastestEver));
            const average = data7['races'][racesName]['Average'];
                //localStorage.setItem('Average', JSON.stringify(average));
            const slowest = data7['races'][racesName]['Slowest'];
                //localStorage.setItem('Slowest', JSON.stringify(slowest));
            const optimalC = data7['races'][racesName]['Optimal']
                //localStorage.setItem('optimalC', JSON.stringify(optimalC));
            if (value2 == optimalC) {
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

        function pointsCal(arr1, arr2) {
            var totalPoints = 0;
            for (var s = 0; s < arr1.length; s++) {
                if (s == 0 && arr2.includes(arr1[s])) {
                    totalPoints += 8;
                } else if (s == 1 && arr2.includes(arr1[s])) {
                    totalPoints += 7;
                } else if (s == 2 && arr2.includes(arr1[s])) {
                    totalPoints += 6
                } else {
                    continue;
                }
            }
            return totalPoints;
        }
      })      
    }
})

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
    if (subseconds  < 100) {subseconds   = "0"+subseconds;}
    return minutes+':'+seconds+':'+subseconds; // Return is HH : MM : SS
}