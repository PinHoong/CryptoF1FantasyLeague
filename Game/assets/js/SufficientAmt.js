import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

function checkBalance(value) {
    var priceOfCar = value;
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
    const starCountRef = ref(db, 'users/' + currentUser.uid + '/currency');
    get(starCountRef).then ((snapshot) => {
        var data = snapshot.val();
    })
    if (data < priceOfCar) {
        alert("You don't have enough money! Fund your account");
    } else {
        
    }

}