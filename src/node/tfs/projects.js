const common=require('./common');
let rp=require('request-promise');

var get_projects="/_apis/projects?api-version=1.0";

function projects(){

}

projects.prototype.listProjects=function(){
    rp(common.createOptions(get_projects))
        .then(result=>{
            var values = JSON.parse(result);
            values.value.forEach(v=>{
                console.log("Name: "+v.name);
            })

        });
}
module.exports = new projects();