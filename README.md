<h1>Overview</h1>
<h2>Single-Player Mode</h2>
We strive to build a detailed text-based RPG where players can truly experience the thrill and agony of what it takes to manage a Formula 1 team. 

Every player will start from ground zero where they have the freedom to purchase their own drivers/cars. In real life, you cannot manage a top-tier Formula 1 team without having proper funding/sponsors. In CFFL, players can either increase their monetary resources by purchasing more in-game currency via our crypto transaction gateway or by earning as they play. 

In our bid to transition it away from a pay-to-win game, we allow users to set a designated setting for every race (Tyre Allocation, Brake Differential, etc). In Formula 1, every single detail affects the eventual outcome of the race, likewise in CFFL, every option the user chooses has the potential to positively / negatively affect the race outcome. This form of butterfly effect makes the game thrilling and puts the user’s knowledge to the test. It also symbolizes that money can’t win you games. 

At the end of every race season, players will obtain crypto payouts based on the success of one’s team. From the initial struggle to the eventual glory, we are affirmative that players can truly experience the roles of a racing manager from the comfort of their homes.

<h2>Multiplayer</h2>
A Multiplayer game feature is implemented to allow users to enjoy the excitement of playing with their friends. This feature is also paired with a real-time messaging application that allows users to interact with one another. To increase the stakes and immersion of the feature, a wager is incorporated in every game room. Users would have to pay a small amount of 0.04 Ethereum to the smart contract and after every race, the winner among the group would be entitled to the total cash pool. 



<h2>Teck Stack</h2>
<h3>Frontend</h3>
<h4>HTML, CSS & Javascript</h4>
Rationale: Being beginners to web design, we decided to use the elementary form of web programming as there are multiple tutorials online that will help us build a responsive and aesthetic pleasing website that suits our needs. 
<h4>MetaMask</h4>
Rationale: Metamask is the leading browser-integrated crypto wallet that is being used in multiple Web3 applications such as Opensea, Axie Infinity and UniSwap. Furthermore, the presence of multiple test networks like Rinkeby Test Network allows us to perform tests without having to place capital into cryptocurrency. Also, its vast open-source documentation enabled us to build dApps using older technologies like HTML, CSS & JS.
<h3>Backend</h3>
<h4>Firebase</h4>
Rationale: The initialisation and integration of a firebase server are very intuitive and user-friendly. There isn’t a need to create multiple scripts as data can be imputed directly using their firebase console. In addition, the presence of a real-time database is crucial for our multiplayer function. Moreover, the documentation and technical support are more extensive as compared to newer databases like supabase. 
<h4>Moralis & Solidity</h4>
Rationale: Solidity is the most notable programming language that is used to build smart contracts on blockchain such as Ethereum. In our case, we had to build a smart contract so as to automate the rewards obtained in our lucky wheel. If we didn’t use solidity, the absence of a smart contract would make it impossible for users to obtain the rewards instantaneous as the admin’s digital signature is required for any transaction. We used Moralis as it allowed our Javascript function to interact with our deployed smart contract.
Walkthrough
Pre-Requisites
Since our application revolves around Crypto, we will be using MetaMask as our main transaction gateway. Players must download the MetaMask browser and connect to the Rinkeby Test network. (Instructions) Thereafter, we would need the users to fund their accounts via https://faucet.rinkeby.io/. The tutorial for the funding can be found here. The reason why we are using the Rinkeby test network is for the sake of user testing from other orbital groups. In the event that the funding is unable to proceed, you can contact me @SHERBALL and I will send you some so that you can test out the features of our application. 

