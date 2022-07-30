// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, set, ref, update, onValue} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

document.getElementById("submitData").addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('psw').value;

    // log in user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            localStorage.setItem('usr', JSON.stringify(user)); 
            // ...

            // save log in details into real time database
            var lgDate = new Date();
            update(ref(database, 'users/' + user.uid), {
                last_login: lgDate,
            })
                .then(() => {
                    // Data saved successfully!
                    const starCountRef = ref(database, 'users/' + user.uid + '/lastName');
                    onValue(starCountRef, (snapshot) => {
                      const data = snapshot.val();
                      localStorage.setItem('keepLoggedIn', 'yes');
                      localStorage.setItem('user',JSON.stringify(data));
                      window.location='../index.html';
                      alert('user logged in successfully');
                    });
                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

    signOut(auth).then(() => {
           // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
});