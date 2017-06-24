
const fs = require('fs');
const path = require('path');
const cmd = require('node-cmd');
const chalk = require('chalk');
const assert = require('assert');

var filesToDelete=["-BCKED", "-BCKEDT-", "MOV_HOME", "endjob", "userpage", "abortit", "listmenu", "statpageg", "userclr", "sendsysv", "sendevnt", "grippart", "promptyn", "userclr", "vacuumon", "vacuumof", "thk_tol", "tchk_skp", "thk_sev", "abortit", "getdata", "thk_val", "mov_home", "reqmenu", "tprec", "PROMPTYN", "LISTMENU", "GETDATA", "SENDEVNT", "THK_SEV", "REQMENU", "SENDDATA", "SETVALVE", "USERPAGE", "VACUUMON", "-BCKED1-", "-BCKED3-", "-BCKED4-", "-BCKED5-", "-BCKED2-", "-BCKED9-", "-BCKED8-", "PROMPTOK", "THK_TOL", "USERCLR", "-BCKED", "-BCKEDT-", "MOV_HOME", "endjob", "userpage", "abortit", "listmenu", "statpageg", "userclr", "sendsysv", "sendevnt", "grippart", "promptyn", "userclr", "vacuumon", "vacuumof", "thk_tol", "tchk_skp", "thk_sev", "abortit", "getdata", "thk_val", "mov_home", "reqmenu", "tprec", "PROMPTYN", "LISTMENU", "GETDATA", "SENDEVNT", "THK_SEV", "REQMENU", "SENDDATA", "SETVALVE", "USERPAGE", "VACUUMON", "-BCKED1-", "-BCKED3-", "-BCKED4-", "-BCKED5-", "-BCKED2-", "-BCKED9-", "-BCKED8-", "PROMPTOK", "THK_TOL", "USERCLR", "VACOFFCK"];


var options = {
    directory:undefined,
    isTesting:false,
    isDebug:false}

function getFilenameWithoutExtension(file){
    return file.replace(/\.[\w]+/i,"");
}

function printFile(file){
    var f = getFilenameWithoutExtension(file);
    var code=`printtp ${f}.tp /config `;
    
    if(options.isTesting)
    return;

    // Need to insure this works for local profile
    cmd.get(code,(err,data,stderr)=>{
        if(err)
            console.log(`err: ${err}`);
        if(data)
            console.log(`data: ${data}`);
        if(stderr)
            console.log(`stderr: ${stderr}`);

    });

}

function printVars(file){
    var f = getFilenameWithoutExtension(file);
    var code=`printtp ${f}.tp /config `;
    chalk.blue(`print vars ${file}`);
    console.log(chalk.blue(`print vars ${file}`));
      if(options.isTesting)
   return;
}


function deleteFile(file){
    fs.exists(file,result=>{
        if(result)
            fs.unlink(file,err=>{
                assert.equal(err,null);
                if(err)
                    console.error(chalk.bold.red(`File ${file} couldnt be deleted`));
            });
    });   
}


var isPreFile=function(file){
    file=getFilenameWithoutExtension(file);
    for(var i=0;i<filesToDelete.length;i++)
        if(filesToDelete[i]===file)
            return true;
    return false;
}


var shouldDeletePre=function(file){
     var result = file.search(/\.(?:GIF|VR|DF|SV|IO|PC|DG|PMC|CM|VA|STM)/i);
    return result!=-1;
}
var shouldDelete=function(file){
    var result = file.search(/\.(?:DT|VR|DF|SV|IO|PC|DG|PMC|CM|TP|VA|STM|GIF)/i);
    return result!=-1;
}

var isTPFile=function(file){
    return file.search(/\.tp/i)!=-1;
}
var isVarFile=function(file){
    return file.search(/\.(?:sv|vr|io)/i)!=-1;
}

function FanucProcess(opt)
{
    options=opt;
     
    this.files=[];
    fixPath=function(file){
        return path.join(options.directory,file);
    }
    this.files = fs.readdirSync(options.directory)
        .map(fixPath);
}

FanucProcess.prototype.cleanup=function(){
    this.files
        .filter(shouldDelete)
        .forEach(deleteFile);
 
}

FanucProcess.prototype.getDir = function(){
    return this.options.directory;
}


FanucProcess.prototype.processAll=function(){
    
    this.deleteFiles();
    
    this.processFiles();
   
    this.cleanup();
}
 
FanucProcess.prototype.deleteFiles=function(){
    this.files
        .filter(isPreFile)
        .forEach(deleteFile);
}
 

FanucProcess.prototype.processFiles=function(){
  
    fs.createReadStream('c:\\robot.ini')
        .pipe(fs.createWriteStream(path.join(options.directory,'robot.ini')));

   
    
    this.files
        .filter(isTPFile)
        .forEach(printFile);

    this.files
        .filter(isVarFile)
        .forEach(printVars);
   
 
}

module.exports =FanucProcess;