const express = require('express')
const app  = express()
const ejs = require('ejs')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render("page/index")
})

app.listen(3000, ()=> console.log("server up"))