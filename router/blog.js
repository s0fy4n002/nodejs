const BlogPost = require('../models/blog');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
         "Agustus", "September", "Oktober", "November", "Desember"];
        const tgl = new Date().getFullYear() + '-' + months[new Date().getMonth()] + '-'  + new Date().getDate(); 
        
        const uniqueSuffix = tgl + ' ' + file.originalname;
        cb(null, uniqueSuffix)
    }
  })

const uploads = multer({storage});


function blog(app, cors, body, validationResult){


    app.get('/post', (req, res, next) => {
        console.log(new Date().getUTCMonth());
        res.json({
            message: "Post Get"            
        })     
    })

    app.post('/post', uploads.single('image'), (req, res) => {
        
    
        
        if(!req.body.title || !req.body.content){
            return res.status(400).json({
                kesalahan: "title / content kosong!"
            }) 
        }

        if(!req.file){
            console.log(req.file)
            return res.status(400).json({
                kesalahan: "image harus di upload"
            }) 
        }
        

        const Posting = new BlogPost({
            title: req.body.title,
            content: req.body.content,
            image: req.file.path,
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