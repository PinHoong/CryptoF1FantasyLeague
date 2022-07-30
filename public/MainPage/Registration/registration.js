  // Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";


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

  document.getElementById('contact-form').addEventListener("keypress", function(event) {
      // If the user presses the "Enter" key on the keyboard
      if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submitData").click();
      }
      });

  submitData.addEventListener('click', (e) => {

      var email = document.getElementById('email').value;
      var password = document.getElementById('psw').value;
      var firstName = document.getElementById('firstName').value;
      var lastName = document.getElementById('lastName').value;
      var favtm = document.getElementById('favtm').value;
      var walletAdd = localStorage.wadd;
      var info = [email, password, firstName, lastName, favtm, walletAdd]
      console.log(info)
      if (walletAdd == undefined){
        alert("Refresh Page and Connect your Wallet")
      }
      else if (info.includes('')){
        alert("Fill in the relevant fields")
      }
      else{
      //sign up user
      createUserWithEmailAndPassword(auth, email, password, firstName, lastName, favtm, walletAdd)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              // ... user.uid
              set(ref(database, 'users/' + user.uid), {
                  email: email,
                  password: encPass(),
                  firstName: firstName,
                  lastName: lastName,
                  favtm: favtm,
                  walletAddress: walletAdd,
                  driverCount: 0,
                  carCount: 0,
                  drivers: {'nil': 0},
                  cars: {'nil': 0},
                  currency: 0,
                  currentRace: 0,
                  pair1 : {'nil': 0},
                  pair2 : {'nil': 0},
                  poneD: 0,
                  poneC: 0,
                  ptwoD : 0,
                  ptwoC: 0,
                  funded: 0,
                  choice: 0,
                  raceResults: 0,
                  driverNames: 0,
                  test: 0,
                  raceNames: {0: 'Azerbaijan', 1: 'Italy', 2: 'Saudi Arabia', 3:'Singapore', 4:'Spain'},
                  funded: 0,
                  seasonPoints: 0,
                  pointsRedeemed: 0,
                  visited: 0,
                  onlineRoom: '',
                  pastRoom: {'nil': 0}
              })
                  .then(() => {
                      // Data saved successfully!
                      alert('user created successfully');
                      window.location.href = "sign-in.html";
      
                  })
                  .catch((error) => {
                      // The write failed...
                      alert(error);
                  });
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
              alert(errorMessage);
          });
      // function to encrypt password
      function encPass(){
        var pass12 = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), password);
        return pass12.toString();
      }  
    }
  });