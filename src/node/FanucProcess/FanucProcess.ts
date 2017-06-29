
'use_strict';
import * as fs from 'fs'
import * as path from 'path'
import * as cmd from 'node-cmd'
import * as chalk from 'chalk'
import * as assert from 'assert';


let filesToDelete=["-BCKED", "-BCKEDT-", "MOV_HOME", "endjob", "userpage", "abortit", "listmenu", "statpageg", "userclr", "sendsysv", "sendevnt", "grippart", "promptyn", "userclr", "vacuumon", "vacuumof", "thk_tol", "tchk_skp", "thk_sev", "abortit", "getdata", "thk_val", "mov_home", "reqmenu", "tprec", "PROMPTYN", "LISTMENU", "GETDATA", "SENDEVNT", "THK_SEV", "REQMENU", "SENDDATA", "SETVALVE", "USERPAGE", "VACUUMON", "-BCKED1-", "-BCKED3-", "-BCKED4-", "-BCKED5-", "-BCKED2-", "-BCKED9-", "-BCKED8-", "PROMPTOK", "THK_TOL", "USERCLR", "-BCKED", "-BCKEDT-", "MOV_HOME", "endjob", "userpage", "abortit", "listmenu", "statpageg", "userclr", "sendsysv", "sendevnt", "grippart", "promptyn", "userclr", "vacuumon", "vacuumof", "thk_tol", "tchk_skp", "thk_sev", "abortit", "getdata", "thk_val", "mov_home", "reqmenu", "tprec", "PROMPTYN", "LISTMENU", "GETDATA", "SENDEVNT", "THK_SEV", "REQMENU", "SENDDATA", "SETVALVE", "USERPAGE", "VACUUMON", "-BCKED1-", "-BCKED3-", "-BCKED4-", "-BCKED5-", "-BCKED2-", "-BCKED9-", "-BCKED8-", "PROMPTOK", "THK_TOL", "USERCLR", "VACOFFCK"];


 

function getFilenameWithoutExtension(file){
    return file.replace(/\.[\w]+/i,"");
}

function printFile(file){
    var f = getFilenameWithoutExtension(file);
    var code=`printtp ${f}.tp ${f}.ls /config c:\\robot.ini`;
    
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
            fs.unlinkSync(file,err=>{
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
var isLSFile=function(file){
    return file.search(/\.ls/i)!=-1;
}
var isVarFile=function(file){
    return file.search(/\.(?:sv|vr|io)/i)!=-1;
}
export class FanucProcessOptions{
    constructor(public directory:string=undefined,public isTesting:boolean=false,public isDebug:boolean=false){

    }
}

let options = new FanucProcessOptions(undefined,false,false);
export class FanucProcess {
    private files:string[]=[];
    constructor(public options:FanucProcessOptions){

        if(options.directory==null || options.directory==undefined)
            return;
        let fixPath=(file)=>{
            return path.join(options.directory,file);
        }

        this.files=fs.readdirSync(options.directory)
            .map(fixPath);
    }

    public cleanup(){
        this.files
            .filter(shouldDelete)
            .forEach(deleteFile);
    }

    public getDir(){
        return this.options.directory;
    }


    public processAll(){
        // this.deleteFiles();

        this.processFiles();

        // this.cleanup();
    }

    public deleteFiles(){
        this.files
            .filter(isPreFile)
            .forEach(deleteFile);
    }

    private runAction(filter:any,action:any){
        this.files
            .filter(filter)
            .forEach(action);
    }

    public processFiles(){
        fs.createReadStream('c:\\robot.ini')
            .pipe(fs.createWriteStream(path.join(this.options.directory,'robot.ini')));

        this.runAction(isTPFile,printFile);
        this.runAction(isVarFile,printVars);
    }
}



 