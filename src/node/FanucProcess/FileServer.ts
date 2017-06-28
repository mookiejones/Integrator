'use_strict';
import * as formidable from 'formidable'
import * as fs from 'fs'
import * as unzip from 'unzip'
import { FanucProcess, FanucProcessOptions } from './FanucProcess'
import * as multer from 'multer'
import * as unzipper from 'unzipper'
import * as path from 'path'
import * as cmd from 'node-cmd'

 
let savepath='./files/'


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
export class FileServer{

    public processFile(req,res,next){
        let body = req.body.email;
        let file = req.file;

        let target = path.join('c:\\temp',file.filename);

        // Copy file from current location to Temp Directory
        fs.renameSync(file.path,target);


        
        let cwd = process.cwd();
        let from = target;

        let name = getFilename(file.filename);

        let original = file.originalname.replace(".zip","");
        let to = path.join("c:\\temp","fanuc_files");


    
        // take file and move
        
        fs.createReadStream(from)
            .pipe(unzipper.Extract({path:to}))
            .on('close',function(a,b,c){
                // var exe = path.join(process.cwd(),"command.cmd");
                // var bat = exe+ ' '+to;
                // var p = cmd.run(bat);
                var proc_dir=path.join(to,original);

                var options = new FanucProcessOptions(proc_dir);

                var fanProc= new FanucProcess(options);
                fanProc.processAll();



            })
    //   const extract = onezip.extract(from)
}

    public upload(req,res){
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
    }
}
 

 
 