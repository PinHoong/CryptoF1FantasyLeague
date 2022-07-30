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
  import { getDatabase, ref, onValue, update, get, set} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  document.getElementById('cfmation').addEventListener('click', () => {
      Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#50C878',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm!'
      }).then((result) => {
        const Usr = JSON.parse(localStorage.getItem('usr'));
        const starCountRef = ref(db, 'users/' + Usr.uid);
          get(starCountRef).then((snapshot) => {
              const data = snapshot.val()
              var p2DCount = data['ptwoD'];
              var p2CCount = data['ptwoC'];
              var p1DCount = data['poneD'];
              var p1CCount = data['poneC'];
                      
              if ((p2DCount == 1 && p2CCount == 1) && (p1CCount == 1 && p1DCount == 1) && (result.isConfirmed)){
                  window.location.href = "./waitingRoom.html"
              }
              else {
                  alert("Draft incomplete")
              }  
          })
      })
  })//SWAL command