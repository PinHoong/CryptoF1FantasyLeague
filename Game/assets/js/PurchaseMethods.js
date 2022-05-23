async function PurchaseProcedure(value) {
    document.getElementById('poppingForPurchase').style.display = 'block';
    
    const price = {'b1': 20000000000000000, 'b2': 40000000000000000, 'b3': 60000000000000000};
    localStorage.setItem('btn', JSON.stringify(value));
    localStorage.setItem('k', JSON.parse(localStorage.getItem('btn')));
    let params = [{
    "from": localStorage.wadd,
    "to": "0xdca59f0Bb2E4E429024181f2C75720B13178108c",
    "gas": Number(21000).toString(16),
    "gasPrice": Number(1500000000).toString(16),
    "value": Number(price[JSON.parse(localStorage.getItem('btn'))]).toString(16),
    }]

    let txnHash = await window.ethereum.request({method: "eth_sendTransaction", params})
        .catch((err) => {
            console.log(err)
        })
    var receipt =  null;
    while (receipt == null) {
        receipt = await window.ethereum.request({method: 'eth_getTransactionReceipt', params: [txnHash]});
    }
    if (receipt != null) {
        document.getElementById("ProcessingIcon").innerHTML = '<i class="fa-solid fa-circle-check" style="color: #fff; font-size:150px; margin-top: 60px;"></i>';
        document.getElementById('Processing').innerText = "Transaction Completed!"
        var body = document.getElementsByTagName('body')[0];
        var test2 = document.getElementById('purchasingGold');
        test2.type = "module";
        test2.src = "assets/js/CurrencyInitializer.js";
        body.appendChild(test2)
        setTimeout(function() {
        document.getElementById("poppingForPurchase").remove();
        }, 5000);
    }
}

