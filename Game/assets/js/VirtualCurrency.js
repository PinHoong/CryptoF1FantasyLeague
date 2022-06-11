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
const starCountRef = ref(db, 'users/' + currentUser.uid + '/currency');
onValue(starCountRef, (snapshot) => {
    var data = snapshot.val();
    document.getElementById('VirtualCurrency').innerText = data;
});
