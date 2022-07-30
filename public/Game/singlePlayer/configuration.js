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
  const Usr = JSON.parse(localStorage.getItem('usr'));
  const starCountRef = ref(db, 'users/' + Usr.uid);
  
  get(starCountRef).then((snapshot) => {
    const data = snapshot.val();
    const btnz = [b1,b2,b3]
    var btnz2 = ['b1','b2','b3']
    const btn_mapping = {'b1': 1, 'b2': 2, 'b3': 3}
    

    for (var i = 0;i < 3;i++){
      (function(){
        const elementtt = btnz2[i]
        const ee2 = btnz[i]
        if (data['choice'] != 0){
      confirmation.innerHTML = '<p style="padding-top:25px; padding-left:15px">You have chosen Configuration: ' + btn_mapping[elementtt] + '<a id="cfmbtn" href="raceResults.html">Proceed</a></p>'
    }
        btnz[i].addEventListener('click', (e) => {
          console.log(elementtt + ' just got clicked')
          update(ref(db, 'users/' + Usr.uid), {
            'choice': btn_mapping[elementtt],
          })//end of update
          confirmation.innerHTML = '<p style="padding-top:25px; padding-left:15px" >You have chosen Configuration: ' + btn_mapping[elementtt] + '<a id="cfmbtn" href="raceResults.html">Proceed</a></p>'
          document.getElementById(elementtt).style.opacity = 0.5;
          for (var i = 0;i < 3;i ++){
            if (btnz2[i] != elementtt){
              document.getElementById(btnz2[i]).style.opacity = 1;

            }
          }//end of nested for loop

         })//end of event listener 

      }())
      
    }
    
    
    
    })//get snapshot 

    get(starCountRef).then((snapshot) => {
        const data = snapshot.val();
        const raceNum = data['currentRace'];
        const countryName = data['raceNames'][raceNum];
        const plus1RaceNum = raceNum + 1;
        document.getElementById('raceNum').innerText = 'Race' + ' ' + `${plus1RaceNum}`;
        document.getElementById('TextOverImg').innerText = countryName;
        if (countryName == 'Spain') {
            //document.getElementById('TextOverImg').style.fontSize = '120px';
            document.getElementById('TextOverImg').style.left = '40%';
            //document.getElementById('TextOverImg').style.top = '25%';
        } else if (countryName == 'Italy') {
          document.getElementById('TextOverImg').style.left = '42%';
        } else if (countryName == "Singapore") {
            document.getElementById('TextOverImg').style.left = '33%';
        }
      })