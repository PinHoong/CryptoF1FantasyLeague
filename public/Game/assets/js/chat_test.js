import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onChildAdded, update, onValue, get, child, push, set} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

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

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const Usr = JSON.parse(localStorage.getItem('usr'));
const anotherref = ref(db, 'users/' + Usr.uid);

get(anotherref).then((snapshot) =>{
  const data = snapshot.val()
  const username = data['firstName']

  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
    
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    
      // create db collection and send in the data
      set(ref(db, 'messages/' + timestamp), {
        username,
        message,
      })
  }

  document.getElementById("message-form").addEventListener("submit", sendMessage);
})



const fetchChat = ref(db);

onValue(fetchChat, (snapshot) => {
  document.getElementById("messages").innerHTML = ``;
  const main = snapshot.val()
  const messages = main['messages']
  const username = main['users'][Usr.uid]['firstName']
  for (const [key, value] of Object.entries(messages)) {
    console.log(value);
    const message = `<li class=${
      username === value['username'] ? "sent" : "receive"
    }><span>${value['username']}: </span>${value['message']}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  }
});
