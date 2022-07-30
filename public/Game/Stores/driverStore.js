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
const starCountRef = ref(db, 'drivers/');
const Usr = JSON.parse(localStorage.getItem('usr'));
const anotherref = ref(db, 'users/' + Usr.uid);
const drivers = [Albon, Alonso, Bottas, Gasly, Hamiliton, Lafti, Leclerc, Magussen, Norris, Ocon, Perez, Ricardo, Russell, Sainz, Schumacher, Stroll, Tsunoda, Verstappen, Vettel, Zhou];
const drivers2 = ['albon', 'alonso', 'bottas', 'gasly', 'hamiliton', 'lafti', 'leclerc', 'magussen', 'norris', 'ocon', 'perez', 'ricardo', 'russell', 'sainz', 'schumacher', 'stroll', 'tsunoda', 'verstappen', 'vettel', 'zhou'];
const drivers3 = ['Albon', 'Alonso', 'Bottas', 'Gasly', 'Hamiliton', 'Latifi', 'Leclerc', 'Magussen', 'Norris', 'Ocon', 'Perez', 'Ricardo', 'Russell', 'Sainz', 'Schumacher', 'Stroll', 'Tsunoda', 'Verstappen', 'Vettel', 'Zhou'];
const drivers2sell = ['albonS', 'alonsoS', 'bottasS', 'gaslyS', 'hamilitonS', 'laftiS', 'leclercS', 'magussenS', 'norrisS', 'oconS', 'perezS', 'ricardoS', 'russellS', 'sainzS', 'schumacherS', 'strollS', 'tsunodaS', 'verstappenS', 'vettelS', 'zhouS'];
const sellmap = {'albonS': 'Albon', 'alonsoS': 'Alonso', 'bottasS': 'Bottas', 'gaslyS': 'Gasly', 'hamilitonS': 'Hamiliton', 'laftiS': 'Lafti', 'leclercS': 'Leclerc', 'magussenS': 'Magussen', 'norrisS': 'Norris', 'oconS': 'Ocon', 'perezS': 'Perez', 'ricardoS': 'Ricardo', 'russellS': 'Russell', 'sainzS': 'Sainz', 'schumacherS': 'Schumacher', 'strollS': 'Stroll', 'tsunodaS': 'Tsunoda', 'verstappenS': 'Verstappen', 'vettelS': 'Vettel', 'zhouS': 'Zhou'}
const pricemap = {}
var c = 0;

onValue(starCountRef, (snapshot) => {
    var data = snapshot.val();
    for (var key in data) {
      var link ="Stores/drivers/" + drivers2[c] + ".jpg";
      drivers[c].innerHTML = '<td><img src=' + link + '></td><td>' + key + '</td><td>' + data[key]["Country"] + '</td><td>' + data[key]["Age"] + '</td><td>' + data[key]["Score"] + '</td><td><i class="fa-solid fa-wallet fa-1x" ></i>' +  ' ' + data[key]['Price'] +'</td><td style = "width:50px"><button  type="button" id=' + drivers2[c]+ ' ' + ' name="submitData" class="book-a-table-btn scrollto d-none d-lg-flex">Purchase</button></td><td><i class="fa-solid fa-wallet fa-1x" ></i>' +  ' ' + (data[key]['Price'] - 1) +'</td><td><button  type="button" id=' + drivers2sell[c]+ ' name="submitData" class="sellbtn">Sell</button></td>';  
      c++;
    }

get(anotherref).then((snapshot) =>{
  const d2 = snapshot.val();
  if (d2['driverCount'] == 2){
    titlecount.innerText = '2/2 Drivers';
  }
})
const main_starCountRef = ref(db)
const starCountRef2 = ref(db, 'drivers/');
get(main_starCountRef).then((snapshot) => {
      const main = snapshot.val()
      const drvdata = main['drivers'];
      var sp = {}
      var bp = {}
      var drvrname = JSON.parse(localStorage.getItem('drvrname'));
      for (var name of drivers3){
        
        sp[name] = drvdata[name]['Price'] - 1
        bp[name] = drvdata[name]['Price']
      }
      console.log(bp)
      localStorage.setItem('sp', JSON.stringify(sp))
      localStorage.setItem('bp', JSON.stringify(bp))
    

const starCountRef = ref(db, 'users/' + Usr.uid);
  const data = main['users'][Usr.uid]
  var curr = data['driverCount'];
  var currcash = data['currency'];
  var bp = JSON.parse(localStorage.getItem('bp'))
  var sp = JSON.parse(localStorage.getItem('sp'))
  function highlighter(){
    for (const [key, value] of Object.entries(data['drivers'])) {
      if (!(key == 'nil')){
        document.getElementById(key).style.backgroundColor = '#ffb3c2'
        document.getElementById(key.toLowerCase()).innerText = 'Purchased'
        document.getElementById(key.toLowerCase()).style.opacity = 0.5;
      }
    }
  }

  function reverse_highlighter(key){
    var new_key = key.slice(0, -1);
    console.log('this is the new key : '+ new_key)
    document.getElementById(new_key.toLowerCase()).innerText = 'Purchase'
    document.getElementById(new_key.toLowerCase()).style.opacity = 1
  }


  highlighter()
  for (var i = 0 ;i < drivers.length;i++){
  (function () {
  const elementttt = drivers3[i];
  const Usr = JSON.parse(localStorage.getItem('usr'));
  const e2 = drivers2[i];
  
  document.getElementById(drivers2[i]).addEventListener('click', (e) => {
    localStorage.setItem('btnid', JSON.stringify(e2));
  localStorage.setItem('drvrname', JSON.stringify(elementttt));
    var old = data['drivers'];
    var drvrname = JSON.parse(localStorage.getItem('drvrname'));
    var sp = JSON.parse(localStorage.getItem('sp'))
    

    //to get driver price 
    let drvPrice2 = bp[drvrname];
    //end of getting driver price 
    
    if (curr == 2){
      alert("You already have 2 Drivers");
    }
    else if (drvrname in old){
      alert("You already own this driver");
    }

    else if (parseInt(bp[drvrname]) > currcash){
      alert('Insufficient Funds');
    }


    else{
      curr += 1 ;
      currcash -= parseInt(bp[drvrname]);
      var drvrname = JSON.parse(localStorage.getItem('drvrname'));
      update(ref(db, 'users/' + Usr.uid), {
                'driverCount': curr,
                'currency': currcash
            });
      var old = data['drivers'];
      old[drvrname] = 1;
      update(ref(db, 'users/' + Usr.uid), {
                'drivers': old,
            })
      titlecount.innerHTML = '<h1 style = "font-size: xx-large" id = "title-count">Drivers ' +  (curr) + '/2</h1>';
      document.getElementById(JSON.parse(localStorage.getItem('btnid'))).style.opacity = 0.5;
      highlighter()

      

    }
  })//end of addeventlistener
 }());
  }//end of outer for loop
  for (var i = 0; i < drivers2sell.length;i++){
  (function (){
    var elementy = drivers2sell[i]
    document.getElementById(elementy).addEventListener('click', (e) => { 
    if (!(sellmap[elementy]  in data['drivers'])){
      alert("You do not own " + sellmap[elementy])
    }
    else{
      var old = data['drivers']
        delete old[sellmap[elementy]]
      currcash += parseInt(sp[sellmap[elementy]])
      curr -= 1 
      update(ref(db, 'users/' + Usr.uid), {
        'currency' : currcash,
        'drivers': old,
        'driverCount': curr,
      })
      alert(sellmap[elementy] + ' has been sold')
      titlecount.innerHTML = '<h1 style = "font-size: xx-large" id = "title-count">Drivers ' +  (curr) + '/2</h1>';
      document.getElementById(sellmap[elementy]).style.backgroundColor = '#e2e1e2'
      highlighter()
      reverse_highlighter(elementy)

      //to delete if element pre exists in draft1 or draft2
      if (sellmap[elementy] in data['pair1']){
        var oldp1 = data['pair1']
        delete oldp1[sellmap[elementy]]
        update(ref(db, 'users/'  + Usr.uid),{
          'pair1' : oldp1,
          'poneD': 0
        })
      }

      if (sellmap[elementy] in data['pair2']){
        var oldp2 = data['pair2']
        delete oldp2[sellmap[elementy]]
        update(ref(db, 'users/'  + Usr.uid),{
          'pair2' : oldp2,
          'ptwoD': 0
        })
      }
      //to delete if element pre exists in draft1 or draft2

    }
  })//end of eventlistener 
  }())//end of closure function
}//end of for nested loop

})//end of outer get 
  
});