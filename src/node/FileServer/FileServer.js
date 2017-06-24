const formidable = require('formidable');
const fs = require('fs');
const unzip = require('unzip')
const savepath='./files/';
var fp = require('./FanucProcess')
const multer = require('multer');
const unzipper = require('unzipper');
const path = require('path');
const cmd = require('node-cmd');
function FileServer(){}


    var getFilename=function(name){
        var result=name.replace(/([^.]+).zip/i,"$1");
        return result;
    }
    var storage=multer.diskStorage({
       destination:function(req,file,cb){
           cb(null,process.cwd() +'/public/upload/');
      
       },
        filename:function(req,file,cb){
           
            var n=getFilename(file.originalname);
            var result=file.originalname.replace(/([^.]+).zip/i,"$1-"+Date.now()+".zip");
            cb(null,result)
            
        }
    })

   
 FileServer.processFile=function(req,res,next){
    
     var body = req.body.email;
     var file = req.file;

     var target = path.join("c:\\temp",file.filename);
     // Copy file from current location to Temp directory

     fs.renameSync(file.path,target);

     var cwd = process.cwd();
     var from = target;

     var name = getFilename(file.filename);

     var original = file.originalname.replace(".zip","");
     var to = path.join("c:\\temp","fanuc_files");


 
     // take file and move
     
     fs.createReadStream(from)
        .pipe(unzipper.Extract({path:to}))
        .on('close',function(a,b,c){
            // var exe = path.join(process.cwd(),"command.cmd");
            // var bat = exe+ ' '+to;
            // var p = cmd.run(bat);
            var proc_dir=path.join(to,original);
            var fanProc= new fp(proc_dir);
            fanProc.processAll();



        })
  //   const extract = onezip.extract(from)

 }

FileServer.upload=function(req,res){
    try{
    var form = new formidable.IncomingForm();
    form.parse(req, function(err,fields,files){
        var oldpath = files.filetoupload.path;
        var newpath = savepath + files.filetoupload.name;

        fs.rename(oldpath,newpath,function(err){
            if(err) throw err;

            res.write('file uploaded and moved');

        });

        if(files.filetoupload.type === 'application/zip'){
            res.write('writing file');
            fs.createReadStream(newpath)
            .pipe(unzip.Extract({path:savepath}))
            .on('close',function(e){
                res.write('unzipped files');
                res.end();
            });
            }
        });
    }catch(e){
        console.log(e);
    }
    }

module.exports=FileServer;