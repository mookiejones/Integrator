'use_strict';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formidable = require("formidable");
const fs = require("fs");
const unzip = require("unzip");
const FanucProcess_1 = require("./FanucProcess");
const multer = require("multer");
const unzipper = require("unzipper");
const path = require("path");
let savepath = './files/';
var getFilename = function (name) {
    var result = name.replace(/([^.]+).zip/i, "$1");
    return result;
};
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/public/upload/');
    },
    filename: function (req, file, cb) {
        var n = getFilename(file.originalname);
        var result = file.originalname.replace(/([^.]+).zip/i, "$1-" + Date.now() + ".zip");
        cb(null, result);
    }
});
class FileServer {
    processFile(req, res, next) {
        let body = req.body.email;
        let file = req.file;
        let target = path.join('c:\\temp', file.filename);
        fs.renameSync(file.path, target);
        let cwd = process.cwd();
        let from = target;
        let name = getFilename(file.filename);
        let original = file.originalname.replace(".zip", "");
        let to = path.join("c:\\temp", "fanuc_files");
        fs.createReadStream(from)
            .pipe(unzipper.Extract({ path: to }))
            .on('close', function (a, b, c) {
            var proc_dir = path.join(to, original);
            var options = new FanucProcess_1.FanucProcessOptions(proc_dir);
            var fanProc = new FanucProcess_1.FanucProcess(options);
            fanProc.processAll();
        });
    }
    upload(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = savepath + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err)
                    throw err;
                res.write('file uploaded and moved');
            });
            if (files.filetoupload.type === 'application/zip') {
                res.write('writing file');
                fs.createReadStream(newpath)
                    .pipe(unzip.Extract({ path: savepath }))
                    .on('close', function (e) {
                    res.write('unzipped files');
                    res.end();
                });
            }
        });
    }
}
exports.FileServer = FileServer;
//# sourceMappingURL=FileServer.js.map