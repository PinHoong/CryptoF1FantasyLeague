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
const name = "ferrari"
const arry = ["RedBull2022", "Ferrari2022", "Mercedes2022", "Mclaren2022", "AlfaRomeo2022", "AlphaTauri2022", "Alpine2022", "AstonMartin2022", "Haas2022", "Williams2022"];
for (var i = 0; i < arry.length; i++) {
  const vehicle = arry[i];
  document.getElementById(arry[i]).addEventListener('click', (e) => {
    if (e == undefined) {
      return
    } else {
      get(starCountRef2).then((snapshot) => {
        const Usr = JSON.parse(localStorage.getItem('usr'));
        const data2 = snapshot.val();
        const curr = data2['cars']
        if (data2['carCount'] >= 2) {
          alert("You have purchased the maximum number of cars! Sell some cars before proceeding")
        } else {
          //Think of how to automate the names of cars purchased

        }
      })
    }
  })
}