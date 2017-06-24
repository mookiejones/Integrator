const sql = require('mssql');

const connection_string="mssql://kuka:I<3LarryDrake@robotprogramming.database.windows.net:1433/RobotProgramming?encrypt=true";


var doQuery=function(query){
    return sql.connect(connection_string)
        .then(pool=>{
            return pool.request().query(query)
                .then(result=>{return result.recordset;})
        });
}
module.exports={    
    getControllerNames:function(){
        return sql.connect(connection_string)
            .then(pool=>{
                return pool.request().query("SELECT * FROM Controllers Order By Controllers.ContName")
                    .then(result=>{
                        return result.recordset;

                    })

                    
            });
    },

    getApplicationNames:function(id){
        var query = "SELECT c.AppNum,c.ContNum,AppTypes.AppTypeName,c.Comment from CApplications as c Inner Join AppTypes On AppTypes.AppNum=c.AppNum where c.ContNum="+id+" OrderBy AppTypes.AppTypeName";
        return doQuery(query);
          

    }
}