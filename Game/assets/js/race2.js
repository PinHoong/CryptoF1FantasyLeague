import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, remove, update, onValue, get} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const starCountRef2 = ref(db, 'users/' + currentUser.uid);
const starCountRef = ref(db, '/Cars');
const arry = ["Red Bull 2022", "Ferrari 2022", "Mercedes 2022", "Mclaren 2022", "Alfa Romeo 2022", "Alpha Tauri 2022", "Alpine 2022", "Aston Martin 2022", "Haas 2022", "Williams 2022"];
for (var i = 0; i < arry.length; i++) {
  const vehicle = arry[i];
  document.getElementById(arry[i]).addEventListener('click', (e) => {
    if (e == undefined) {
      return
    } else {
      get(starCountRef2).then((snapshot) => {
        const data2 = snapshot.val();
        const curr = data2['cars']
        const AmtOfMoney = data2['currency']
        get(starCountRef).then((snapshot1) => {
            const data = snapshot1.val();
            const carCost = data[vehicle]['Price'];
            if (data2['carCount'] >= 2) {
              alert("You have purchased the maximum number of cars! Sell some cars before proceeding")
            } else if (carCost > AmtOfMoney) {
              alert("Insufficient Balance! Top Up Your account")
            } else {
              curr[vehicle] = 1;
              update(ref(db, 'users/' + currentUser.uid), {
                'cars': curr,
                'currency': AmtOfMoney - carCost
              })
              var numOfCars = data2['carCount'];
              numOfCars += 1 ;
              update(ref(db, 'users/' + currentUser.uid), {
                'carCount': numOfCars,
              });
              document.getElementById('NumOfVeh').innerHTML = `${numOfCars}/2`;
              const tableVeh = vehicle.slice(0,-1);
              console.log(tableVeh)
              document.getElementById(tableVeh).style.backgroundColor = '#AA336A';
              document.getElementById(vehicle).innerText = 'PURCHASED';
              document.getElementById(vehicle).style.fontSize = '11px';
              document.getElementById(vehicle).style.pointerEvents = 'none';
              document.getElementById(vehicle).style.opacity = '0.4';
            }
          })
      })
    }
  })
}

const arry2 = ["Red Bull 20222", "Ferrari 20222", "Mercedes 20222", "Mclaren 20222", "Alfa Romeo 20222", "Alpha Tauri 20222", "Alpine 20222", "Aston Martin 20222", "Haas 20222", "Williams 20222"];
const starCountRef3 = ref(db, 'users/' + currentUser.uid + '/cars');
for (var s = 0; s < arry2.length; s++) {
    const veh = arry2[s].slice(0,-1);
    document.getElementById(arry2[s]).addEventListener('click', () => {
        get(starCountRef3).then((snapshot2) => {
            const data2 = snapshot2.val();
            var listofDrivers = [];
            for (var key in data2) {
                if (key == "nil") {
                    continue;
                } else {
                    listofDrivers.push(key);
                }
            }
            if (listofDrivers.includes(veh)) {
                const starCountRef4 = ref(db);
                get(starCountRef4).then((snapshot4) => {
                    const carVal = snapshot4.val();
                    const carPrice = carVal['Cars'][veh]['Sell'];
                    const AmtOfMoney = carVal['users'][currentUser.uid]['currency'];
                    const carAmt = carVal['users'][currentUser.uid]['carCount'] - 1;
                    update(ref(db, 'users/' + currentUser.uid), {
                        'currency': AmtOfMoney + carPrice,
                        'carCount': carAmt,
                    })
                    remove(ref(db, 'users/' + currentUser.uid + '/cars' + '/' + veh));
                    const pair1 = carVal['users'][currentUser.uid]['pair1'];
                    const pair2 = carVal['users'][currentUser.uid]['pair2']
                    if (veh in pair1) {
                      remove(ref(db,'users/' + currentUser.uid + '/pair1' + '/' + veh));
                      update(ref(db, 'users/' + currentUser.uid), {
                        'poneC' : 0
                      })
                    } else {
                      remove(ref(db,'users/' + currentUser.uid + '/pair2' + '/' + veh));
                      update(ref(db, 'users/' + currentUser.uid), {
                        'ptwoC' : 0
                      })
                    }
                    document.getElementById('NumOfVeh').innerHTML = `${carAmt}/2`;
                    const slicedCarName = veh.slice(0,-1);
                    document.getElementById(slicedCarName).style.backgroundColor = 'transparent';
                    document.getElementById(veh).style.opacity = '1';
                    document.getElementById(veh).innerText = 'PURCHASE';
                    document.getElementById(veh).style.pointerEvents = '';
                })
            } else {
                alert('You do not have the car');
            }   
        })
    })
    
}