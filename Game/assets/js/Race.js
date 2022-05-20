function carPurchase() {
    const firebaseConfig = {
        apiKey: "AIzaSyDZY8ufwFMkPhzOY-dNJm9bGXqv9okoW5g",
        authDomain: "f1-crypto.firebaseapp.com",
        databaseURL: "https://f1-crypto-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "f1-crypto",
        storageBucket: "f1-crypto.appspot.com",
        messagingSenderId: "512980395232",
        appId: "1:512980395232:web:9d81bc5d7c58bc5a13dc85"
    };
    import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
    import { getDatabase, ref, onValue, update, get} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const starCountRef = ref(db, 'users/' + UsrID);
    get(starCountRef).then((snapshot) => {
        const data = snapshot.val();
        const curr = data['carCount']
        curr.push("Mercedes")
        update(ref(db, 'users/' + Usr.uid), {
            carCount: curr,
        });
    })
}