const express = require("express");
const multer = require("multer");
const fs = require('fs');
const auth = require("../auth")
const mkdirp = require('mkdirp');

const upload = multer();
const upload_app = express();

upload_app.post('/', upload.single('image'), (req, res) => {
    const tokenInfo = auth.decode(req.headers.authorization);
    const uid = tokenInfo.payload.uid;
    if (req.body.image) {
        console.log('Uploading image...');
        mkdirp(`public/upload/${uid}`);
        const ts = Date.now();
        const filename = `upload/${uid}/${ts}.png`;
        let stream = fs.createWriteStream("public/" + filename);

        base64Data = req.body.image.replace(/^data:image\/png;base64,/, ""),
            stream.write(base64Data, 'base64');
        stream.end(console.log('Image uploaded'));
        res.send("http://localhost:8000/" + filename);
    } else {
        console.log('No image Uploaded');
        res.sendStatus(500);
    }
});

module.exports = upload_app;
