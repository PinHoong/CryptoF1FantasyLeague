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
