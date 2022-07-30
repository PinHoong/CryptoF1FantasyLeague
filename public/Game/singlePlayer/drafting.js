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
const currentUser = JSON.parse(localStorage.getItem('usr'));

const starCountRef2 = ref(db, 'users/' + currentUser.uid);
get(starCountRef2).then((snapshot) => {
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


    //START OF DRIVER DRAFT
    const drivers2 = ['albon', 'alonso', 'bottas', 'gasly', 'hamiliton', 'lafti', 'leclerc', 'magussen', 'norris', 'ocon', 'perez', 'ricardo', 'russell', 'sainz', 'schumacher', 'stroll', 'tsunoda', 'verstappen', 'vettel', 'zhou'];
    const dictt = {Albon: 'albon', Alonso: 'alonso', Bottas: 'bottas', Gasly: 'gasly', Hamiliton: 'hamiliton', Lafti: 'lafti', Leclerc: 'leclerc', Magussen: 'magussen', Norris: 'norris', Ocon: 'ocon', Perez:'perez', Ricardo:'ricardo', Russell:'russell', Sainz: 'sainz', Schumacher:'schumacher', Stroll:'stroll', Tsunoda:'tsunoda', Verstappen:'verstappen', Vettel:'vettel', Zhou:'zhou'};
    const pid = [d1, d2];
    const pid2 = ['d1', 'd2']
    const mapping = {}
    const mapping_dupe = {}
    const mapping_b = {}
    const mapping_dupe_b = {}
    const btns = ['b1', 'b2']
    const btns2 = ['b5', 'b6']

    const btns_d = ['b9', 'b10']
    const btns_d2 = ['b13', 'b14']

    const pid22 = [d12, d22]
    const pid222 = ['d12', 'd22']

    const Usr = JSON.parse(localStorage.getItem('usr'));
    const starCountRef = ref(db, 'users/' + Usr.uid);
    var c = 0
    var countt = 0
    
    get(starCountRef).then((snapshot) => {
        const data = snapshot.val();
        //titledraft.innerText = data['drafted'] + '/2  drivers';
        //titledraft2.innerText = data['draftedCars'] +'/2  cars'

            if (data['driverCount'] > 0){
          var li = data['drivers'];
          for (var dd in li){
            if (dd != 'nil'){
              mapping[btns[c]] = dd
              mapping_dupe[btns2[c]] = dd
              mapping_b[btns_d[c]] = dd 
              mapping_dupe_b[btns_d2[c]] = dd
              pid[c].innerHTML = '<img src="./Stores/drivers/' + dictt[dd]  + '.jpg" class="special"> ' +  dd + '<button class="draftbtn" id='+ btns[c] +'>Draft</button>' + '<button class="benchbtn" id='+ btns_d[c] +'>Bench</button>';
              pid22[c].innerHTML = '<img src="./Stores/drivers/' + dictt[dd]  + '.jpg" class="special"> ' +  dd + '<button class="draftbtn" id='+ btns2[c] +'>Draft</button>' + '<button class="benchbtn" id='+ btns_d2[c] +'>Bench</button>';


              c++;
            }
          }

          localStorage.setItem('mapping', JSON.stringify(mapping))
          localStorage.setItem('mapping_dupe', JSON.stringify(mapping_dupe))
          localStorage.setItem('mapping_b', JSON.stringify(mapping_b))
          localStorage.setItem('mapping_dupe_b', JSON.stringify(mapping_dupe_b))

          //START OF DRIVER DRAFT JS CODE
          //TO RE-IMPLEMENT DRAFTING REPLACE INNERHTML WITH '<img src="assets/img/drivers/' + dictt[dd]  + '.jpg" class="special"> ' +  dd + '<button class="book-a-table-btn scrollto d-none d-lg-flex" id='+ pid[c] +'>Draft</button>'

          //END OF DRIVER DRAFT JS CODE
        }
      })

    get(starCountRef).then((snapshot) => {             
      const data = snapshot.val();
    const cid = [c1, c2];
    const cid2 = ['c1', 'c2']
    const cars = ["RedBull2022", "Ferrari2022", "Mercedes2022", "Mclaren2022", "AlfaRomeo2022", "AlphaTauri2022", "Alpine2022", "AstonMartin2022", "Haas2022", "Williams2022"];
    const dictt2 = {'Red Bull 2022': 'RedBull', 'Ferrari 2022': 'Ferrari', 'Mercedes 2022': 'Mercedes', 'Mclaren 2022': 'Mclaren', 'Alfa Romeo 2022': 'AlfaRomeo','Alpha Tauri 2022':'AlphaTauri', 'Alpine 2022': 'Alpine','Aston Martin 2022':'AstonMartin', 'Haas 2022':'Haas','Williams 2022':'Williams' }                
    const mapping2 = {}
    const mapping2_dupe = {}
    const mapping2_b = {}
    const mapping2_dupe_b = {}
    const btns = ['b3', 'b4']
    const btns2 = ['b7', 'b8']
    const btns_d = ['b11', 'b12']
    const btns_d2 = ['b15', 'b16']


    const cid22 = [c12, c22]
    const cid222 = ['c12', 'c22']

    var c = 0;
    if (data['carCount'] > 0){
      var li2 = data['cars'];
      for (var cc in li2){
            if (cc != 'nil'){
              mapping2[btns[c]] = cc
              mapping2_dupe[btns2[c]] = cc
              mapping2_b[btns_d[c]] = cc 
              mapping2_dupe_b[btns_d2[c]] = cc

              cid[c].innerHTML = '<img src="./Stores/cars/' + dictt2[cc]  + '.png" class="special"> ' +  cc + '<button class="draftbtn" id='+ btns[c] +'>Draft</button>' + '<button class="benchbtn" id='+ btns_d[c] +'>Bench</button>';
              cid22[c].innerHTML = '<img src="./Stores/cars/' + dictt2[cc]  + '.png" class="special"> ' +  cc + '<button class="draftbtn" id='+ btns2[c] +'>Draft</button>' + '<button class="benchbtn" id='+ btns_d2[c] +'>Bench</button>';

              c++;
            }
          }
      localStorage.setItem('mapping2', JSON.stringify(mapping2))
      localStorage.setItem('mapping2_dupe', JSON.stringify(mapping2_dupe))
      localStorage.setItem('mapping2_b', JSON.stringify(mapping2_b))
      localStorage.setItem('mapping2_dupe_b', JSON.stringify(mapping2_dupe_b))
      //START OF CAR DRAFTING JS CODE 
      //TO RE-IMPLEMENT DRAFTING, REPLACE INNERHTML WITH '<img src="assets/img/' + dictt2[cc]  + '.png" class="special"> ' +  cc + '<button class="book-a-table-btn scrollto d-none d-lg-flex" id='+ cid[c] +'>Draft</button>'

      //END OF CAR DRAFTING JS CODE             
    }
  })

  get(starCountRef).then((snapshot) => {
    const data = snapshot.val();
    const mapping = JSON.parse(localStorage.getItem('mapping'));
    const mapping_dupe = JSON.parse(localStorage.getItem('mapping_dupe'))
    const mapping2_dupe = JSON.parse(localStorage.getItem('mapping2_dupe'))
    const mapping2 = JSON.parse(localStorage.getItem('mapping2'))
    const mapping_b = JSON.parse(localStorage.getItem('mapping_b'))
    const mapping_dupe_b = JSON.parse(localStorage.getItem('mapping_dupe_b'))
    const mapping2_b = JSON.parse(localStorage.getItem('mapping2_b'))
    const mapping2_dupe_b = JSON.parse(localStorage.getItem('mapping2_dupe_b'))

    const pair1 = [d1, d2, c1, c2]
    const pair1s = ['d1', 'd2', 'c1', 'c2']
    const pair2 = [d12,d22, c12, c22]
    const pair2s = ['d12', 'd22', 'c12', 'c22']
    const mapping_combi = Object.assign({}, mapping, mapping2)
    const mapping_combi_dupe = Object.assign({}, mapping_dupe, mapping2_dupe)
    const mapping_combi_b = Object.assign({}, mapping_b, mapping2_b)
    const mapping_combi_dupe_b = Object.assign({}, mapping_dupe_b, mapping2_dupe_b)
    var p1DCount = data['poneD'];
    var p1CCount = data['poneC'];
    const btns1 = [b1, b2,b3,b4, b5, b6,b7,b8]
    const btns1s = ['b1', 'b2', 'b3', 'b4']
    const btns2 = [b5, b6,b7,b8]
    const btns2s = ['b5', 'b6', 'b7', 'b8']

    const btns_b1s = ['b9','b10', 'b11', 'b12']
    const btns_b2s = ['b13', 'b14' ,'b15' ,'b16']

    var p2DCount = data['ptwoD'];
    var p2CCount = data['ptwoC'];

    const hashy2 = {'b9': 'b13', 'b10': 'b14', 'b11': 'b15', 'b12': 'b16', 'b13': 'b9', 'b14': 'b10', 'b15': 'b11', 'b16': 'b12'}


    const carimg = {'Alfa Romeo 2022': 'AlfaRomeo', 'Alpha Tauri 2022': 'AlphaTauri', 'Alpine 2022': 'Alpine', 'Aston Martin 2022': 'AstonMartin', 'Ferrari 2022': 'Ferrari', 'Haas 2022': 'Haas', 'Mclaren 2022': 'Mclaren', 'Mercedes 2022': 'Mercedes', 'Red Bull 2022': 'RedBull', 'Williams 2022': 'Williams'}
    
    function lineup_display(){
      for (var elem in data['pair1']){
        if ( elem.indexOf(' ') >= 0){
          document.getElementById('car1').innerHTML = '<img  src="./Stores/cars/' + carimg[elem]  + '.png" class="special"> '
        }
        else if (elem != 'nil'){
          document.getElementById('driver1').innerHTML = '<img  src="./Stores/drivers/' +elem.toLowerCase()  + '.jpg" class="special"> '
        }
      }
      for (var elem in data['pair2']){
        if ( elem.indexOf(' ') >= 0){
          document.getElementById('car2').innerHTML = '<img  src="./Stores/cars/' + carimg[elem]  + '.png" class="special"> '
        }
        else if (elem != 'nil'){
          document.getElementById('driver2').innerHTML = '<img  src="./Stores/drivers/' +elem.toLowerCase()  + '.jpg" class="special"> '
        }
      }}
    

    function clear_lineup_display(btn_id){
      const hashy = {'b9': 'driver1', 'b10':'driver1', 'b11':'car1', 'b12': 'car1', 'b13': 'driver2', 'b14': 'driver2' ,'b15':'car2' ,'b16':'car2'}
      document.getElementById(hashy[btn_id]).innerHTML = '<div></div>'
    }

    function cfmation(){
      if ((p2DCount == 1 && p2CCount == 1) || (p1CCount == 1 && p1DCount == 1)){
        document.getElementById('cfmation').innerHTML = "<a href = 'Configuration.html' class = 'btntoproceed'>Confirm</a>"
      }
      else{
        document.getElementById('cfmation').innerHTML = "<a href = '#' class = 'btntoproceed'>Confirm</a>"
      }
    }

    function dimmer(elementt){
      const h = {'b1': 'b9', 'b10': 'b2', 'b11': 'b3', 'b12': 'b4', 'b13': 'b5', 'b14': 'b6', 'b15': 'b7', 'b16': 'b8', 'b9': 'b1', 'b2': 'b10', 'b3': 'b11', 'b4': 'b12', 'b5': 'b13', 'b6': 'b14', 'b7': 'b15', 'b8': 'b16'}
      document.getElementById(elementt).style.opacity = 0.5
      document.getElementById(h[elementt]).style.opacity = 1 
    }
    
    lineup_display()
    cfmation()
  
    


    
    for (var i = 0;i < 4;i++){
        (function() {
              const elementt = btns1s[i]
              const elementt2 = btns2s[i]

              btns1[i].addEventListener('click', (e) => { 
                
                if (mapping_combi[elementt] in data['drivers']){
                  if (mapping_combi[elementt] in data['pair2']){
                    alert("Driver has already been drafted in Pair 2")
                  }

                  if (p1DCount == 1){
                    alert("Pair 1 already has a driver")
                  }

                  else{
                    p1DCount += 1 
                    var old = data['pair1']
                    old[mapping_combi[elementt]] = 1 
                    update(ref(db, 'users/' + Usr.uid), {
                      'pair1': old,
                      'poneD': p1DCount
                    })
                    lineup_display()
                    cfmation()
                    var buttonz = document.getElementById(elementt);
                    dimmer(elementt)
                    buttonz.style.opacity = 0.5;

                    var buttonz2 = document.getElementById(elementt2);
                    dimmer(elementt2)
                    buttonz2.style.opacity = 0.5;
                  }
                }

                if (mapping_combi[elementt] in data['cars']){
                  if (mapping_combi[elementt] in data['pair2']){
                    alert("Car has already been drafted in Pair 2")
                  }

                  else if (p1CCount == 1){
                    alert("Pair 1 already has a car")
                  }

                  else{
                    p1CCount += 1 
                    var old = data['pair1']
                    old[mapping_combi[elementt]] = 1 
                    update(ref(db, 'users/' + Usr.uid), {
                      'pair1': old,
                      'poneC': p1CCount
                    })

                    lineup_display()
                    cfmation()
                    var buttonz = document.getElementById(elementt);
                    dimmer(elementt)
                    buttonz.style.opacity = 0.5;

                    var buttonz2 = document.getElementById(elementt2);
                    dimmer(elementt2)
                    buttonz2.style.opacity = 0.5;



                  }
                }
              

              })
              


            }())//FUNCTION 
              }//FIRST FOR LOOP
              for (var i = 0;i < 4;i++){
        (function() {
              const elementt = btns2s[i]
              const elementt2 = btns1s[i]
              btns2[i].addEventListener('click', (e) => {
                if (mapping_combi_dupe[elementt] in data['drivers']){
                  if (mapping_combi_dupe[elementt] in data['pair1']){
                    alert("Driver has already been drafted in Pair 1")
                  }

                  else if (p2DCount == 1){
                    alert("Pair 2 already has a driver")
                  }

                  else{
                    p2DCount += 1 
                    var old = data['pair2']
                    old[mapping_combi_dupe[elementt]] = 1 
                    update(ref(db, 'users/' + Usr.uid), {
                      'pair2': old,
                      'ptwoD': p2DCount
                    })
                    lineup_display()
                    cfmation()
                    var buttonz = document.getElementById(elementt);
                    dimmer(elementt)
                    buttonz.style.opacity = 0.5;

                    var buttonz2 = document.getElementById(elementt2);
                    dimmer(elementt2)
                    buttonz2.style.opacity = 0.5;

                  }
                }

                if (mapping_combi_dupe[elementt] in data['cars']){
                  if (mapping_combi_dupe[elementt] in data['pair1']){
                    alert("Car has already been drafted in Pair 1")
                  }

                  else if (p2CCount == 1){
                    alert("Pair 2 already has a car")
                  }

                  else{
                    p2CCount += 1 
                    var old = data['pair2']
                    old[mapping_combi_dupe[elementt]] = 1 
                    update(ref(db, 'users/' + Usr.uid), {
                      'pair2': old,
                      'ptwoC': p2CCount
                    })
                    lineup_display()
                    cfmation()
                    var buttonz = document.getElementById(elementt);
                    dimmer(elementt)
                    buttonz.style.opacity = 0.5;

                    var buttonz2 = document.getElementById(elementt2);
                    dimmer(elementt2)
                    buttonz2.style.opacity = 0.5;

                  }
                }
              

              })
              


            }())//SECOND FUNCTION 
              }//SECOND FOR LOOP
              for (var i = 0 ;i < 4;i++){
                (function(){
                  const elementt = btns_b1s[i]
                  document.getElementById(btns_b1s[i]).addEventListener('click', (e) => {
                    if (mapping_combi_b[elementt] in data['drivers']){
                      if (mapping_combi_b[elementt] in data['pair1']){
                        var old = data['pair1']
                        delete old[mapping_combi_b[elementt]]
                        update(ref(db, 'users/' + Usr.uid), {
                          'pair1': old,
                          'poneD': 0
                        })
                        p1DCount = 0
                        alert('Driver Benched')
                        dimmer(elementt)
                        dimmer(hashy2[elementt])
                        clear_lineup_display(elementt)
                        cfmation()
                      }
                      else{
                        alert("Draft before benching driver")
                      }
                    }//if in drivers

                    else if (mapping_combi_b[elementt] in data['cars']){
                      if (mapping_combi_b[elementt] in data['pair1']){
                        var old = data['pair1']
                        delete old[mapping_combi_b[elementt]]
                        update(ref(db, 'users/' + Usr.uid), {
                          'pair1': old,
                          'poneC': 0
                        })
                        p1CCount = 0
                        alert('Car Benched')
                        clear_lineup_display(elementt)
                        dimmer(elementt)
                        dimmer(hashy2[elementt])
                        cfmation()
                      }
                      else{
                        alert("Draft before benching car")
                      }
                    }

                  })//end of event listener
                }())//end of closure function
              }//third for loop

              for (var i = 0 ;i < 4;i++){
                (function(){
                  const elementt = btns_b2s[i]
                  document.getElementById(btns_b2s[i]).addEventListener('click', (e) => {
                    if (mapping_combi_dupe_b[elementt] in data['drivers']){
                      if (mapping_combi_dupe_b[elementt] in data['pair2']){
                        var old = data['pair2']
                        delete old[mapping_combi_dupe_b[elementt]]
                        update(ref(db, 'users/' + Usr.uid), {
                          'pair2': old,
                          'ptwoD': 0
                        })
                        p2DCount = 0
                        alert('Driver Benched')
                        clear_lineup_display(elementt)
                        dimmer(elementt)
                        dimmer(hashy2[elementt])
                        cfmation()
                        

                      }
                      else{
                        alert("Draft before benching driver")
                      }
                    }//if in drivers

                    else if (mapping_combi_dupe_b[elementt] in data['cars']){
                      if (mapping_combi_dupe_b[elementt] in data['pair2']){
                        var old = data['pair2']
                        delete old[mapping_combi_dupe_b[elementt]]
                        update(ref(db, 'users/' + Usr.uid), {
                          'pair2': old,
                          'ptwoC': 0
                        })
                        p2CCount = 0
                        alert('Car Benched')
                        clear_lineup_display(elementt)
                        dimmer(elementt)
                        dimmer(hashy2[elementt])
                        cfmation()
                      }
                      else{
                        alert("Draft before benching car")
                      }
                    }

                  })//end of event listener
                }())//end of closure function
              }//third for loop
            
            })