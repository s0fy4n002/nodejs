const express = require('express');
const app  = express();
const main = require('./router/index');
const port = 8080;
const favicon = require('serve-favicon');
const path = require('path');
const router = express.Router();
const cors = require('cors');


app.use(cors());
app.use(express.static('public'))
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.all('/products', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});



main(app, cors)




app.listen(port, () => {
    console.log(`-_-\\http://localhost:${port}\\-_-\\`)
})