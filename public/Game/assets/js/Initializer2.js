import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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
const starCountRef2 = ref(db, 'users/' + currentUser.uid + '/carCount');
onValue(starCountRef2, (snapshot) => {
    var data = snapshot.val();
    if (data == 0) {
      document.getElementById('listOfCars').remove();
      //Styling is incomplete
      document.getElementById('TeamCars').innerHTML =  '<a href= "./components-accordion.html">Purchase Cars</a>';
    } else if (data == 1) {
      const starCountRef3 = ref(db, 'users/' + currentUser.uid + '/cars');
      onValue(starCountRef3, (snapshot) => {
        var data2 = snapshot.val();
        for (var key in data2) {
          if (key == "nil") {
            continue;
          } else {
            const Car1 = key;
            document.getElementById('Car_1').innerText = Car1;
            document.getElementById('Car_2').remove()
          }
        }
      })
    } else {
      const starCountRef4 = ref(db, 'users/' + currentUser.uid + '/cars');
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
        const arry2 = ["Car_1", "Car_2"];
        for (var i = 0; i < 2; i++) {
          document.getElementById(arry2[i]).innerText = arry[i];
        }
      })
    }
  })