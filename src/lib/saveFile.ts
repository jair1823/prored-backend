import multer from "multer";
import path from "path";
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let url = path.join("public/" + req.body.tabla);
        if (!fs.existsSync(url)){
            let dirpath = path.join(__dirname+"../../../public/" + req.body.tabla);
            fs.mkdirSync(dirpath, { recursive: true });
        }
        cb(null, url);
    },
    filename: function (req, file, cb) {
        let hashCode = Math.random().toString(36).replace(/[^a-z]+/g, "");
        let filename = `${Date.now()}${hashCode}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage }).single("file");

export default upload;