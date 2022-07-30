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
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const starCountRef = ref(db, 'teams/');
const tms = [alfa_romeo, alpha_tauri, alpine, aston_martin, ferrari, haas, mclaren, mercedes, red_bull, williams];
const tms2 = [alfa_romeo2, alpha_tauri2, alpine2, aston_martin2, ferrari2, haas2, mclaren2, mercedes2, red_bull2, williams2];
var c = 0;
onValue(starCountRef, (snapshot) => {
  var data = snapshot.val();
  for (var key in data) {
    tms[c].innerText = key.toUpperCase();
    tms2[c].innerText = data[key]['driver1'] + ', ' + data[key]['driver2'];
    c++;
  }
});