const http = require('http');
const fs = require('fs');
const port = 3000

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write(
        JSON.stringify({status: 200, message: 'Your request was succesfull'})
    );
    /*
    fs.readFile('index-2.html', (err, data) => {
        if (err) {
            res.writeHead(404)
            res.write("error file not found")
        }
        else res.write(data);
        res.end();
    })
    */
    res.end();
});


server.listen(port, (err) => {
    if (err) console.log('there was an error: ', err)
    else console.log("server is running on http://localhost:" + port);
})