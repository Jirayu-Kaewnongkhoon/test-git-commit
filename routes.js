const express = require("express");
const router = express();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const filename = `${uuidv4()}${extension}`;
        cb(null, filename)
    },
})
const upload = multer({ storage }).array('images', 3)

router.post('/upload',/*  upload.array('images', 3), */ (req, res) => {
    
    upload(req, res, function (err) {
        console.log(req.files);
        console.log(req.body);
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            console.log('multer error => ', err);
            return res.send('multer error')
        } else if (err) {
            // An unknown error occurred when uploading.
            console.log('any error => ', err);
            return res.send('any error')
        }
        
        // Everything went fine.
        try {
            const task = [
                () => console.log('do something'),
                () => {
                    console.log('do task error');
                    throw Error('task error')
                }
            ]
            const rand = Math.round(Math.random() * 1)
            const doTask = task[rand];

            doTask();

            return res.send('done')
        } catch (error) {
            console.log('something error');
            const dir = 'uploads/'
            req.files.map(file => fs.unlinkSync(`${dir}${file.filename}`))
            return res.send('something error')
        }

    })

})

module.exports = router;
