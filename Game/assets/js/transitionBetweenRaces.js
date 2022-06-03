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
const starCountRef = ref(db, 'users/' + currentUser.uid);
get(starCountRef).then((snapshot) => {
    const data = snapshot.val();
    const userCurrentR = data['currentRace'];
    const userCurrentRR = data['raceResults'];
    localStorage.setItem('userCurrentR', JSON.stringify(userCurrentR));
    localStorage.setItem('userCurrentRR', JSON.stringify(userCurrentRR));
})

proceedNextRace.addEventListener('click', (e) => {
    const userNextR = JSON.parse(localStorage.getItem('userCurrentR')) + 1;
    update(ref(db, 'users/' + currentUser.uid), {
        'currentRace': userNextR,
        'raceResults': 0,
    })
})