const express = require('express');
const router = express.Router();

const db = require('../database/models');

const upload = require('../middlewares/imageLoad');

router.get('/',(req,res) => {
    res.render('index')
});

router.post('/load',upload.any(),(req,res) => {
    
    const {data} = req.body;
    let upload = [];
    
    if(req.files[0]){
        req.files.forEach(element => {
            const image = {
                name: element.filename,
                data: data
            }
            upload.push(image);
        })
        
        /* res.send(upload) */
        
        db.Image.bulkCreate(upload)
        .then(() => res.redirect('/'))
        .catch(error => error); 
    }else{
        db.Image.create({
            name: 'default.png',
            data: data
        })
        .then(() => res.redirect('/'))
        .catch(error => error); 
    } 
    
})

module.exports = router;