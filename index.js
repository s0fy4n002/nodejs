// const express = require('express');
// const app  = express();
// const router = express.Router();
// const ejs = require('ejs');
// const path = require('path');

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(express.static('public'));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.get('/', (req, res)=>{
//     res.render("page/index")
// });

// app.listen(3000, ()=> console.log("server up"));


var http = require('http');
var fs = require('fs')

const server = http.createServer((req, res) => {
    fs.readFile('./views/page/index.ejs', (err, data)=>{
        if(err){
            res.writeHead(404);
            res.write("Error: file tidak ditemukan!");
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
        }
        res.end();
    })
})

server.listen(8080, () => console.log('server running'))
