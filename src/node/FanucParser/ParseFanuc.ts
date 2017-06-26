import * as fs from 'fs'
import * as path from 'path';

import { FrameType, IRobotFrame, RobotFrame } from './RobotFrame'
 

 

function addFrame(frame:IRobotFrame){
    var contains=false;
    if(frame.X==0&&frame.Y===0&&frame.Z===0&&frame.W===0&&frame.P===0&&frame.R===0)
        return;
    for(var i = 0;i< ParseFanuc.frames.length;i++)
        if(ParseFanuc.frames[i].num==frame.num && ParseFanuc.frames[i].file === frame.file && ParseFanuc.frames[i].type===frame.type){
            contains=true;
            break;
        }
    if(!contains){

        ParseFanuc.frames.push(frame);
    } 
    
}


export class ParseFanuc{
    public static frames:IRobotFrame[] = new Array();
    private dir:string;
    private  files:string[];

    constructor(directory:string){
        this.dir=directory;
       



        var files=fs.readdirSync(this.dir)
        .map(f=>{
            return path.join(directory,f);
        });
      
       files.forEach(file=>console.log(file));  
      
        files
            .filter(this.isLSFile)
            .forEach(this.parseLS);

files
            .filter(this.isTxtFile)
            .forEach(this.parseLS);

    

    }
    public getFrames():IRobotFrame[]{
        return ParseFanuc.frames;
    }
    private isLSFile(file:string):boolean{
       var result=file.search(/\.ls/i)>-1;

        return result;

    }
    private isTxtFile(file:string):boolean{
        return file.search(/\.txt/i)>-1;
        
    }
 


    public parseDirectory(){
debugger;
    }
   
    private parseLS(file:string)
    {

        var regex=/PR\[9\]\s*=\s*LPOS;\s*\d+:PR\[GP1:9,\d+\]\s*=\s*([\d-.]+);\s*\d+:PR\[GP1:9,\d+\]\s*=\s*\(?([\d-.]+)\)?;\s*\d+:PR\[GP1:9,\d+\]\s*=\s*\(?([\d-.]+)\)?;\s*\d+:PR\[GP1:9,\d+\]\s*=\s*\(?([\d-.]+)\)?;\s*\d+:PR\[GP1:9,\d+\]\s*=\s*\(?([\d-.]+)\)?;\s*\d+:PR\[GP1:9,\d+\]\s*=\s*\(?([\d-.]+)\)?;\s*\d+:U((?:TOOL|FRAME))\[([\d]+)\]\s*=\s*PR\[9\];/gi;
        var text=fs.readFileSync(file);
        var match=regex.exec(text);

        while(match!=null){
            var t=`${match[7]}:${match[8]}\r\nX: ${match[1]} Y: ${match[2]} Z: ${match[3]}\r\nW: ${match[4]} P: ${match[5]} R: ${match[6]}\r\n`           
            var type=FrameType.Unknown;
            switch(match[7]){
                case "TOOL":
                type=FrameType.Tool;
                break;
                case"FRAME":
                type=FrameType.Frame;
                break;
                default:
                debugger;
                type=FrameType.Unknown;
                break;
            }
           
            var num=Number(match[8]);
            var x=Number(match[1]);
            var y=Number(match[2]);
            var z=Number(match[3]);
            var w=Number(match[4]);
            var p=Number(match[5]);
            var r=Number(match[6]);

            var frame = new RobotFrame(match[0],file,type,num,x,y,z,w,p,r);
 
            addFrame(frame);
            match=regex.exec(text);
        }     
 
    }

    public parseFile(file:string){
        var ext=path.extname(file).toLower();
        switch(ext){
            case ".ls":
            this.parseLS(file);
            break;
            case ".txt":
            this.parseText(file);
            break;
        }
    }
    public parseText(file:string):IRobotFrame[]
    {
        ParseFanuc.frames = [];
        var text=fs.readFileSync(file,'utf8');
        var frame_start="[*SYSTEM*]$MNUFRAME  Storage: SHADOW  Access: RW  : ARRAY[1,9] OF POSITION"
        var tool_start="[*SYSTEM*]$MNUTOOL  Storage: SHADOW  Access: RW  : ARRAY[1,10] OF POSITION";
        var reg="\[\*SYSTEM\*\]\$MNU((?:FRAME|TOOL))\s+Storage: SHADOW  Access: RW  : ARRAY\[1,\d+\] OF POSITION";
        var end="[*SYSTEM*]";

        var idx=text.indexOf(frame_start );
        text=text.substr(idx+frame_start.length);

        idx=text.indexOf(end);
        var frameSection=text.substr(0,idx);

        var regex=/\[\d,(\d+)\]\s=\s*\n*Group:\s1\s*Config:\s([^,]+),[\s*0,]*\s(?:X|Y|Z|W|P|R):\s+([\d.-]+)\s*(?:X|Y|Z|W|P|R):\s+([\d.-]+)\s*(?:X|Y|Z|W|P|R):\s+([\d.-]+)\s*(?:X|Y|Z|W|P|R):\s+([\d.-]+)\s*(?:X|Y|Z|W|P|R):\s+([\d.-]+)\s*(?:X|Y|Z|W|P|R):\s+([\d.-]+)\s*/ig;
        var match=regex.exec(frameSection);
        while(match !=null){           
            var t=`${match[7]}:${match[8]}\r\nX: ${match[1]} Y: ${match[2]} Z: ${match[3]}\r\nW: ${match[4]} P: ${match[5]} R: ${match[6]}\r\n`                      
            var num=Number(match[1]);
            var x=Number(match[3]);
            var y=Number(match[4]);
            var z=Number(match[5]);
            var w=Number(match[6]);
            var p=Number(match[7]);
            var r=Number(match[8]);

            var frame = new RobotFrame(match[0],file,FrameType.Frame,num,x,y,z,w,p,r);
 
            addFrame(frame);
            match=regex.exec(frameSection); 
        }

        idx=text.indexOf(tool_start);
        text=text.substr(idx+tool_start.length);

        idx=text.indexOf(end);
        var toolSection=text.substr(0,idx);

      
        var match=regex.exec(toolSection);
        while(match !=null){     
               
            var t=`${match[7]}:${match[8]}\r\nX: ${match[1]} Y: ${match[2]} Z: ${match[3]}\r\nW: ${match[4]} P: ${match[5]} R: ${match[6]}\r\n`                      
            var num=Number(match[1]);
            var x=Number(match[3]);
            var y=Number(match[4]);
            var z=Number(match[5]);
            var w=Number(match[6]);
            var p=Number(match[7]);
            var r=Number(match[8]);

            
            var frame = new RobotFrame(match[0],file,FrameType.Tool,num,x,y,z,w,p,r);
 
            addFrame(frame);
            match=regex.exec(toolSection); 
        }
        return ParseFanuc.frames;
    }

}