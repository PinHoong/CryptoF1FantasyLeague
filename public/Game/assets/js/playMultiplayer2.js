import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {getDatabase, ref, onChildAdded, update, onValue, get, child, push, set} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
const serverUrl = "https://zhij6bq5skum.usemoralis.com:2053/server";
const appId = "JvvW2NMTy3tfe1LdS74dyAMWyZv0XwcRnlhQL55h";
Moralis.start({serverUrl, appId})

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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const currentUser = JSON.parse(localStorage.getItem('usr'));
const wholeDB = ref(db);
get(wholeDB).then((snapshot) => {
    const data = snapshot.val();
    var currentMR = data['users'][currentUser.uid]['onlineRoom']
    var meetingRmOwner = data['Rooms'][currentMR]['owner']
    var meetingRmDetails = data['Rooms'][currentMR]['readymembers']
    var meetingRmCapacity = data['Rooms'][currentMR]['memberCount']
    
    //This helps to take account the user pressing the play button
    document.getElementById('startGame').addEventListener('click', () => {
        const updatedUsers = ref(db, 'Rooms/' + currentMR)
        get(updatedUsers).then((snapshot3) => {
            const data3 = snapshot3.val()
            var meetingRmOwner1 = data3['owner']
            var meetingRmDetails1 = data3['readymembers']
            var meetingRmCapacity1 = data3['memberCount']
            if (meetingRmOwner1 == currentUser.uid) {
                if (meetingRmCapacity1 == meetingRmDetails1) {
                    update(ref(db, 'Rooms/' + currentMR), {
                        'confirmed': 1,
                        'played': 1
                    })
                } else {
                    alert('One user is currently not confirmed yet!')
                }
            } else {
                alert('Only the owner of the room can start the race!')
            }
        })
    })

    //this is to make use of the onValue changes
    const israceConfirmed = ref(db, 'Rooms/' + currentMR + '/confirmed')
    onValue(israceConfirmed, (snapshot) => {
        const confirmedNo = snapshot.val();
        console.log(confirmedNo)
        if (confirmedNo != 0) {
            const starCountRef = ref(db, 'Rooms/' + currentMR + '/scoreboard')
            //This get is important as it ensures the ensure array is taken whenever the value changes -- aka gameStart
            get(starCountRef).then((snapshot2) => {
                var meetingRmPairs = snapshot2.val()
                var items = Object.keys(meetingRmPairs).map(function(key) {
                    return [key, meetingRmPairs[key]];
                });
                items.sort(function(first, second) {
                    return first[1] - second[1];
                })
                
                for (var keys in items) {
                    var firstID = parseInt(keys) + 11;
                    var secondID = parseInt(keys) + 21;
                    var thirdID = parseInt(keys) + 31;
    
                    var userDetails = items[keys][0];
                    var userRaceTiming = items[keys][1];
                    var userDetailsArr = userDetails.split(',')
                    var userLN = getUserName(userDetailsArr[0], data)
                    console.log(userLN)
                    var userPair = userDetailsArr[1] + " & " + userDetailsArr[2]
                    console.log(userRaceTiming)
                    console.log(userLN)
                    console.log(userPair)
    
    
                    //this is to perform the innerText
                    if (userDetailsArr[0] == currentUser.uid) {
                        document.getElementById(firstID).style.backgroundColor = "#FFFFC2"
                        document.getElementById(secondID).style.backgroundColor = "#FFFFC2"
                        document.getElementById(thirdID).style.backgroundColor = "#FFFFC2"
                    } else {
                        document.getElementById(firstID).style.backgroundColor = ""
                        document.getElementById(secondID).style.backgroundColor = ""
                        document.getElementById(thirdID).style.backgroundColor = ""
                    }
                    document.getElementById(firstID).innerText = userLN;
                    document.getElementById(secondID).innerText = userPair;
                    document.getElementById(thirdID).innerText = convertHMS(userRaceTiming)
                }
                
                
                var championDetails = items[0][0].split(',')
                const championUID = championDetails[0]
                const participantsP = items.length / 2;
                var delayinMS = 2000;
                setTimeout(function() {
                    if (championUID == currentUser.uid) {
                        Swal.fire({
                            title: 'Congrats On Winning!',
                            confirmButtonText: 'Redeem',
                          }).then((result) => {
                            if (result.isConfirmed) {
                              const members = [1,2,3,4,5]
                              const weiEth = ["40000000000000000", "80000000000000000", "120000000000000000", "160000000000000000", "200000000000000000"];
                              const weiEthSign = ["0x0b951e5b141d5a5ec26c25278acdd55152fd2a6fd6a73f24db6ca7618df92910798964d911f452318637f40b0714ea2cbd8d2bae816d04496d00a8ea2b842f851c",
                            "0xe34bc074014ac02a9f157921d810c070d7a98091293e07e25f6dcdb3e78430dc1b814410c7466f65fe60777b07647aceb316b926cbbaa7cd91536e66a75031941b",
                        "0x4103ccfa7ca85184c3bfbab35e198d70aae69f0d100493dae8e61a187d17d0c31f41cf82061edb5be7f22e80e5c3c9648bb733605af390f15e44705c057d66ad1b",
                    "0xc3464c1964f4ead2b51a5152115c2f925d97c1fbabc1346c895da8c1fcd8387c61e669ac42d87a427bc54a6e099f62fdb621e10aeac463c2c67a8ea24965b43d1c",
                "0xaafd23f98ff5ecfb2ab345fa5f91cbbb4eb65e74338079c6e7bda578c886410f60c9dc2d456eca0a579d77ca41e929967cd3cb95c4d8c8285b926e5ef841858e1c"]
                            const posIndex = members.indexOf(participantsP);
                            console.log(posIndex)
                            async function redeem() {
                                await Moralis.enableWeb3();
                                let options = {
                                    contractAddress: "0x48a8C0C9C2D894ad18DBD38271B2b38AFC6da5FF",
                                    functionName: "close",
                                    abi: [{
                                        "inputs": [
                                            {
                                                "internalType": "uint256",
                                                "name": "_amount",
                                                "type": "uint256"
                                            },
                                            {
                                                "internalType": "bytes",
                                                "name": "_sig",
                                                "type": "bytes"
                                            }
                                        ],
                                        "name": "close",
                                        "outputs": [],
                                        "stateMutability": "nonpayable",
                                        "type": "function"
                                    }],
                                    params: {
                                        _amount: weiEth[posIndex],
                                        _sig: weiEthSign[posIndex]
                                    },
                                }
                                await Moralis.executeFunction(options);
                            }
                            redeem()
                            }
                          })
                    } 
                }, delayinMS);

                function getUserName(userID, data) {
                    return data['users'][userID]['lastName'];
                }

                function convertHMS(value) {
                    if (parseInt(value) == 999) {
                        return 'DNF'
                    } else {
                        const sec = parseInt(value, 10);
                        let hours   = Math.floor(sec / 3600); // get hours
                        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
                        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
                        let subseconds = parseInt((value - ((minutes*60) + seconds)) * 1000);
                        // add 0 if value < 10; Example: 2 => 02
                        if (hours   < 10) {hours   = "0"+hours;}
                        if (minutes < 10) {minutes = "0"+minutes;}
                        if (seconds < 10) {seconds = "0"+seconds;}
                        if (subseconds  < 100) {subseconds   = "0"+subseconds;}
                        return minutes+':'+seconds+':'+subseconds; // Return is HH : MM : SS
                    }
                }
            }) 
        }
    })
})
    /*
    if (true) {
        var meetingRmPairs = data['Rooms'][currentMR]['scoreboard']
        var items = Object.keys(meetingRmPairs).map(function(key) {
            return [key, meetingRmPairs[key]];
        });
        items.sort(function(first, second) {
            return first[1] - second[1];
        })
        console.log(items)
        var newDict = {}
        for (var keys in items) {
            console.log(keys)
            newDict[items[keys][0]] = items[keys][1]
        }

        console.log(newDict)
        update(ref(db, 'Rooms/' + currentMR), {
            'scoreboard': newDict,
        })

        const starCountRef = ref(db, 'Rooms/' + currentMR + '/scoreboard')
        onValue(starCountRef, (snapshot) => {
            const data2 = snapshot.val();
            var items2 = Object.keys(data2).map(function(key) {
                return [key, data2[key]];
            });
            items2.sort(function(first, second) {
                return first[1] - second[1];
            })
            for (var keys in items2) {
                var firstID = parseInt(keys) + 11;
                var secondID = parseInt(keys) + 21;
                var thirdID = parseInt(keys) + 31;

                var userDetails = items2[keys][0];
                var userRaceTiming = items2[keys][1];
                var userDetailsArr = userDetails.split(',')
                var userLN = getUserName(userDetailsArr[0], data)
                console.log(userLN)
                var userPair = userDetailsArr[1] + " & " + userDetailsArr[2]
                console.log(userRaceTiming)
                console.log(userLN)
                console.log(userPair)

                if (userDetailsArr[0] == currentUser.uid) {
                    document.getElementById(firstID).style.backgroundColor = "#FFFFC2"
                    document.getElementById(secondID).style.backgroundColor = "#FFFFC2"
                    document.getElementById(thirdID).style.backgroundColor = "#FFFFC2"
                } else {
                    document.getElementById(firstID).style.backgroundColor = ""
                    document.getElementById(secondID).style.backgroundColor = ""
                    document.getElementById(thirdID).style.backgroundColor = ""
                }
                document.getElementById(firstID).innerText = userLN;
                document.getElementById(secondID).innerText = userPair;
                document.getElementById(thirdID).innerText = userRaceTiming
            }

            function getUserName(userID, data) {
                return data['users'][userID]['lastName'];
            }
        })
    }
})
*/