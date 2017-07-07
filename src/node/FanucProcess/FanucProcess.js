'use_strict';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const cmd = require("node-cmd");
const chalk = require("chalk");
const assert = require("assert");
let filesToDelete = ["-BCKED", "-BCKEDT-", "MOV_HOME", "endjob", "userpage", "abortit", "listmenu", "statpageg", "userclr", "sendsysv", "sendevnt", "grippart", "promptyn", "userclr", "vacuumon", "vacuumof", "thk_tol", "tchk_skp", "thk_sev", "abortit", "getdata", "thk_val", "mov_home", "reqmenu", "tprec", "PROMPTYN", "LISTMENU", "GETDATA", "SENDEVNT", "THK_SEV", "REQMENU", "SENDDATA", "SETVALVE", "USERPAGE", "VACUUMON", "-BCKED1-", "-BCKED3-", "-BCKED4-", "-BCKED5-", "-BCKED2-", "-BCKED9-", "-BCKED8-", "PROMPTOK", "THK_TOL", "USERCLR", "-BCKED", "-BCKEDT-", "MOV_HOME", "endjob", "userpage", "abortit", "listmenu", "statpageg", "userclr", "sendsysv", "sendevnt", "grippart", "promptyn", "userclr", "vacuumon", "vacuumof", "thk_tol", "tchk_skp", "thk_sev", "abortit", "getdata", "thk_val", "mov_home", "reqmenu", "tprec", "PROMPTYN", "LISTMENU", "GETDATA", "SENDEVNT", "THK_SEV", "REQMENU", "SENDDATA", "SETVALVE", "USERPAGE", "VACUUMON", "-BCKED1-", "-BCKED3-", "-BCKED4-", "-BCKED5-", "-BCKED2-", "-BCKED9-", "-BCKED8-", "PROMPTOK", "THK_TOL", "USERCLR", "VACOFFCK"];
function getFilenameWithoutExtension(file) {
    return file.replace(/\.[\w]+/i, "");
}
function printFile(file) {
    var f = getFilenameWithoutExtension(file);
    var code = `printtp ${f}.tp ${f}.ls /config c:\\robot.ini`;
    if (options.isTesting)
        return;
    cmd.get(code, (err, data, stderr) => {
        if (err)
            console.log(`err: ${err}`);
        if (data)
            console.log(`data: ${data}`);
        if (stderr)
            console.log(`stderr: ${stderr}`);
    });
}
function printVars(file) {
    var f = getFilenameWithoutExtension(file);
    var code = `printtp ${f}.tp /config `;
    chalk.blue(`print vars ${file}`);
    console.log(chalk.blue(`print vars ${file}`));
    if (options.isTesting)
        return;
}
function deleteFile(file) {
    fs.exists(file, result => {
        if (result)
            fs.unlinkSync(file, err => {
                assert.equal(err, null);
                if (err)
                    console.error(chalk.bold.red(`File ${file} couldnt be deleted`));
            });
    });
}
var isPreFile = function (file) {
    file = getFilenameWithoutExtension(file);
    for (var i = 0; i < filesToDelete.length; i++)
        if (filesToDelete[i] === file)
            return true;
    return false;
};
var shouldDeletePre = function (file) {
    var result = file.search(/\.(?:GIF|VR|DF|SV|IO|PC|DG|PMC|CM|VA|STM)/i);
    return result != -1;
};
var shouldDelete = function (file) {
    var result = file.search(/\.(?:DT|VR|DF|SV|IO|PC|DG|PMC|CM|TP|VA|STM|GIF)/i);
    return result != -1;
};
var isTPFile = function (file) {
    return file.search(/\.tp/i) != -1;
};
var isLSFile = function (file) {
    return file.search(/\.ls/i) != -1;
};
var isVarFile = function (file) {
    return file.search(/\.(?:sv|vr|io)/i) != -1;
};
class FanucProcessOptions {
    constructor(directory = undefined, isTesting = false, isDebug = false) {
        this.directory = directory;
        this.isTesting = isTesting;
        this.isDebug = isDebug;
    }
}
exports.FanucProcessOptions = FanucProcessOptions;
let options = new FanucProcessOptions(undefined, false, false);
class FanucProcess {
    constructor(options) {
        this.options = options;
        this.files = [];
        if (options.directory == null || options.directory == undefined)
            return;
        let fixPath = (file) => {
            return path.join(options.directory, file);
        };
        this.files = fs.readdirSync(options.directory)
            .map(fixPath);
    }
    cleanup() {
        this.files
            .filter(shouldDelete)
            .forEach(deleteFile);
    }
    getDir() {
        return this.options.directory;
    }
    processAll() {
        this.processFiles();
    }
    deleteFiles() {
        this.files
            .filter(isPreFile)
            .forEach(deleteFile);
    }
    runAction(filter, action) {
        this.files
            .filter(filter)
            .forEach(action);
    }
    processFiles() {
        fs.createReadStream('c:\\robot.ini')
            .pipe(fs.createWriteStream(path.join(this.options.directory, 'robot.ini')));
        this.runAction(isTPFile, printFile);
        this.runAction(isVarFile, printVars);
    }
}
exports.FanucProcess = FanucProcess;
//# sourceMappingURL=FanucProcess.js.map