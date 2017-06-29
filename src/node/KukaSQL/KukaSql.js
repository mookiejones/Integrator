const sql = require('mssql');

const config = require('../KukaConfig/KukaConfig');


const connection_string="mssql://kuka:I<3LarryDrake@robotprogramming.database.windows.net:1433/RobotProgramming?encrypt=true";



const APP_PATH="SELECT * FROM AppPaths Inner Join StandardPaths On AppPaths.PathNum=StandardPaths.PathNum";
sql.on('error',err=>{
    debugger;
})
var doQuery=function(query){    
    return new sql.ConnectionPool(connection_string)
        .connect()
        .then(pool=>{
            const request = new sql.Request(pool);
            request.on('error',err=>{
                debugger;
            })

            request.on('recordset',recordset=>{
                debugger;
            })

            request.on('done',returnValue=>{
                debugger;
            })

            request.on('info',message=>{
                debugger;
            })

            return request.query(query)
                .then(result=>{
                    return result.recordset;
                })


        })

}



function RobotProgramming(){
    fs.readSyn
    sql.connect(connection_string);
}

RobotProgramming.prototype.getControllerNames=function(){

}
module.exports={
    getControllerNames:function(){
        var query = "SELECT * FROM Controllers Order By Controllers.ContName";
        return doQuery(query);
    },

    getApplicationNames:function(id){
        var query = "SELECT c.CAppNum,c.AppNum,c.ContNum,AppTypes.AppTypeName,c.Comment from CApplications as c Inner Join AppTypes On AppTypes.AppNum=c.AppNum where c.ContNum="+id+" Order By AppTypes.AppTypeName";
        return doQuery(query);          
    },
    getAppPaths:function(id){
        var query ="SELECT a.AppPathID,a.PathNum,StandardPaths.PathName from AppPaths as a Inner Join StandardPaths On a.PathNum=StandardPaths.PathNum Where a.CAppNum="+id+" Order By StandardPaths.PathName";
        return doQuery(query);
    }

}