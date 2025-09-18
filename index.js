const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

app.use("/src", express.static('src'))

app.get('/', (req, res) => {
    res.sendFile('src/index.html', { root: __dirname })
})

app.get('/script', function(req, res){
    fs.readFile('./products.json', 'utf8', (err, json) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.send('console.log("Failed to fetch product list")')
            return;
        }
        fs.readFile('./src/script.js', 'utf8', (err, js) => {
            if (err) {
                console.error('Error reading the file:', err);
                res.send('console.log("Failed to JavaScript file")')
                return;
            }
            res.send("stock = "+json+"\n"+js)
        });
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
