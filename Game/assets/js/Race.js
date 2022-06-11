import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onValue, update, get, remove} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const starCountRef2 = ref(db, 'users/' + currentUser.uid);
const starCountRef = ref(db, '/Cars');
const name = "ferrari"
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
              document.getElementById(vehicle).style.opacity = 0.4;
              document.getElementById(vehicle).disabled = true;
            }
          })
      })
    }
  })
}