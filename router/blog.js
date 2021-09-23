const BlogPost = require('../models/blog');

function blog(app, cors, body, validationResult){
    

    app.get('/post', (req, res, next) => {
        console.log(req.body)
        res.json({
            message: "Post Get"            
        })     
    })

    app.post('/post', (req, res, next) => {

        if(!req.body.title || !req.body.content){
            return res.status(400).json({
                message: "Gagal",          
                kesalahan: "data Ada yang kosong!"
            }) 
        }


        const Posting = new BlogPost({
            title: req.body.title,
            content: req.body.content,
            author: {
                _id: 001,
                nama: "Yayan",
                Hp: "082180851183"
            }
        })   
        Posting.save()
        .then( result => {

            res.status(201).json({
                message: "berhasil",          
                data: result
            }) 
        })
        .catch(err => {
            res.status(400).json({
                message: "Gagal",          
                kesalahan: err
            }) 
        })               
    })

    app.put('/post', (req, res, next) => {
        
        res.json({
            message: "post method put"            
        })        
    })

    app.patch('/post', (req, res, next) => {
        
        res.json({
            message: "patch Products"            
        })        
    })

    app.delete('/post', (req, res, next) => {
        console.log(req.body)
        res.json({
            title: "Post method delete"            
        })        
    })

}

module.exports = blog