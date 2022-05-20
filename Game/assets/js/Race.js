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
    import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const starCountRef = ref(db, 'Cars/');
    const tms = [alfa_romeo, alpha_tauri, alpine, aston_martin, ferrari, haas, mclaren, mercedes, red_bull, williams];

    var c = 0;
    onValue(starCountRef, (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          console.log(key);
          tms[c].innerText = key;
          c++;
        }
      });
        /*
        const tms2 = [alfa_romeo2, alpha_tauri2, alpine2, aston_martin2, ferrari2, haas2, mclaren2, mercedes2, red_bull2, williams2];
        */
