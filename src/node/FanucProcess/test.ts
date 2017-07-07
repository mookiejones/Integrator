// create a default task and just log a message
import * as test from 'assert';
import * as chalk from 'chalk';

import * as fs from 'fs';
import { FanucProcess }  from './FanucProcess'
import * as path from 'path';


const blue = chalk.blue;
const green = chalk.green;
const bold = chalk.bold;
var test_files_dir:string;
var test_build_files_dir:string;  
var __directory='./test';

export class FanucProcessTest{
     

    constructor(){
        blue('Starting Test')
        test_files_dir='./test/save';
        test_build_files_dir="./test/build";
    }

    public setDirectory(directory:string){
        __directory=directory;
        test_files_dir=path.join(__directory,'save');
        test_build_files_dir=path.join(__directory,'save');
    }
    public createTestFiles(){
         console.log(blue('Creating Files'));


        fs.copySync(test_files_dir,test_build_files_dir,err=>{
            if(err)
                console.error(bold.red(err));
            else
                console.log(green('Finished creating files'));
        });
    }

    public deleteTestFiles(){
        console.log(blue('Removing Files'));
        fs.remove(test_build_files_dir,err=>{
            if(err)
                console.error(bold.red(err));
            else
                console.log(green('Completed deleting files'));
        })
    }

    public runTest(){
        this.createTestFiles();

        var options={
            directory:test_build_files_dir,
            isTesting:true
        };

        var fp = new FanucProcess(options);
        fp.processAll();
        this.deleteTestFiles();
    }
}
 

 