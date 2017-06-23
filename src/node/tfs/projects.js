const common=require('./common');
let rp=require('request-promise');
let chalk=require('chalk');
var error = chalk.bold.red;
var writelog=chalk.blue;
var get_projects="/_apis/projects?api-version=1.0";

function projects(){

}

projects.prototype.getProjects=function(){
    return common.request(get_projects)
        .then(result=>{
            return result.value;
        });
}
projects.prototype.listProjects=function(){
    this.getProjects()
        .then(values=>{
            values.forEach(value=>{
                chalk.blue(console.log('hello'));
                console.log('Project: '+writelog(value.name));
            });
        })


}
module.exports = new projects();