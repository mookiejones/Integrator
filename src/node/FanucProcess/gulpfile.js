const gulp =require('gulp')
const gutil = require('gulp-util')
const fs = require('node-fs-extra')
const chalk = require('chalk');
const FanucProcess = require('./FanucProcess');

// create a default task and just log a message

const test_files_dir='./test/save';
const test_build_files_dir='./test/build';

chalk.blue('Starting Test')

var onResult=function(err){
      if(err){
            console.error(err);
        } else {
            console.log('success')
        }
}

function createTestFiles(){
    console.log(chalk.blue('Creating Files'));


    fs.copySync(test_files_dir,test_build_files_dir,err=>{
        if(err)
            console.error(chalk.bold.red(err));
        else
            console.log(chalk.green('Finished creating files'));
    });
}

function deleteTestFiles(){
  console.log(chalk.blue('Removing Files'));
    fs.remove(test_build_files_dir,err=>{
        if(err)
            console.error(chalk.bold.red(err));
        else
            console.log(chalk.green('Completed Deleting files'))
    });
}
 
gulp.task('debug',()=>{
    createTestFiles();

    var options ={
        directory:test_build_files_dir,
        isTesting:true
    };
    
    var fp = new FanucProcess(options);


    fp.processAll(deleteTestFiles);
})

gulp.task('default',()=>{
    createTestFiles();

    var options ={
        directory:test_build_files_dir,
        isTesting:true
    };
    
    var fp = new FanucProcess(options);


    fp.processAll();
    
    deleteTestFiles();
});
 
 