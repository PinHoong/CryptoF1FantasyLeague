var web3;

async function Connect() {
    try{
        await window.web3.currentProvider.enable();
    web3 = new web3(window.web3.currentProvider);
    }
    
    catch(err){
        window.location.assign("https://www.metamask.io/download");
        console.log("error has been found");
    }
}