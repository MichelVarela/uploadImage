const multer = require('multer');
const path = require('path');
const faker = require('faker');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image')
    },
    filename: function (req, file, cb) {
        cb(null, faker.datatype.uuid() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {fileSize: 100000},/* 100 kb */
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;/* extensiones soportadas - expresion regular */
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if(mimetype && extname){
            return cb(null,true);
        }
        cb('Error: el archivo debe tener un formato jpeg | jpg | png | gif')
    }
})

module.exports = upload;