const express = require('express');
const app  = express();
const main = require('./router/index');
const blog = require('./router/blog');
const port = 8080;
const favicon = require('serve-favicon');
const path = require('path');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose')

const dbString = `mongodb+srv://user002:jawabarat002@cluster0.frony.mongodb.net/pizza?retryWrites=true&w=majority`
const dbOptions = {useNewUrlParser: true,useUnifiedTopology: true}
const connection = mongoose.connect(dbString, dbOptions)
    connection.then(res=>{
        console.log("terkoneksi ke db")
    }).catch(err=>{
        console.log("gagal terkoneksi ke db")
    })


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(express.static('public'))
app.use(express.json());
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.all('/products', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});



main(app, cors)
blog(app, cors, body, validationResult)




app.listen(port, () => {
    console.log(`-_-\\http://localhost:${port}\\-_-\\`)
})