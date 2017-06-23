let common = require('./common')

function bug(){

}

bug.prototype.listBugs=function(){
    common.request('/_apis/wit/workitems?&api-version=1.0')
        .then(r=>{
            console.log();
        })
        .catch(err=>{
            console.log();
        })
}

module.exports = new bug();