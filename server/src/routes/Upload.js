const express = require("express");
const multer = require("multer");
const fs = require('fs');
const auth = require("../auth")
const mkdirp = require('mkdirp');
const db = require("../db");

const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 }
});
const upload_app = express();

upload_app.post('/', upload.single('image'), (req, res) => {
    const tokenInfo = auth.decode(req.headers.authorization);
    const uid = tokenInfo.payload.uid;
    if (req.body.image) {
        mkdirp(`public/upload`);
        mkdirp(`public/upload/${uid}`);
        const ts = Date.now();
        data = req.body.image;
        if (data.startsWith('data:image/png;base64')) {
            filename = `upload/${uid}/${ts}.png`;
            base64Data = data.replace(/^data:image\/png;base64,/, "");
        } else if (data.search('data:image/jpeg;base64')) {
            filename = `upload/${uid}/${ts}.jpg`;
            base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
        }
        let stream = fs.createWriteStream("public/" + filename);
        stream.write(base64Data, 'base64');
        stream.end();
        const url = "http://localhost:8000/" + filename;
        db.modifyUser(uid, "user_pic", url).then(res => {
        });
        res.send(url);
    } else {
        console.log('No image Uploaded');
        res.sendStatus(403);
    }
});

module.exports = upload_app;
