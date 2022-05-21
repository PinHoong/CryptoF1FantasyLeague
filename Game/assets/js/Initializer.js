import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const starCountRef2 = ref(db, 'users/' + currentUser.uid + '/driverCount');
onValue(starCountRef2, (snapshot) => {
    var data = snapshot.val();
    if (data == 0) {
      document.getElementById('listOfDrivers').remove();
      //Styling is incomplete
      document.getElementById('TeamDrivers2').innerHTML =  '<a href= "./components-carousel.html">Purchase Drivers</a>';
    } else if (data == 1) {
      const starCountRef3 = ref(db, 'users/' + currentUser.uid + '/drivers');
      onValue(starCountRef3, (snapshot) => {
        var data2 = snapshot.val();
        for (var key in data2) {
          if (key == "nil") {
            continue;
          } else {
            const Driver1 = key;
            document.getElementById('Driver_1').innerText = Driver1;
            document.getElementById('Driver_2').remove()
          }
        }
      })
    } else {
      const starCountRef4 = ref(db, 'users/' + currentUser.uid + '/drivers');
      onValue(starCountRef4, (snapshot) => {
        var arry = []
        var data4 = snapshot.val();
        for (var key in data4) {
          if (key == "nil") {
            continue;
          } else {
            arry.push(key);
          }
        }
        const arry2 = ["Driver_1", "Driver_2"];
        for (var i = 0; i < 2; i++) {
          document.getElementById(arry2[i]).innerText = arry[i];
        }
      })
    }
  })