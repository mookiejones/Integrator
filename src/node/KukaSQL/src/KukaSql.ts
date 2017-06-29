import * as sql from 'mssql';
import { ConnectionPool, Request } from 'mssql';
import * as config from '../../KukaConfig'



const connection_string:string="mssql://kuka:I<3LarryDrake@robotprogramming.database.windows.net:1433/RobotProgramming?encrypt=true";
const APP_PATH:string="SELECT * FROM AppPaths Inner Join StandardPaths On AppPaths.PathNum=StandardPaths.PathNum";
const CONTROLLER_NAME_QUERY:string = "SELECT * FROM Controllers Order By Controllers.ContName";

sql.on('error',err=>{
    debugger;
})
var doQuery=function(query){    

        
    return new ConnectionPool(connection_string)
        .connect()
        .then(pool=>{
            const request = new Request(pool);
          
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

            
            var result = request.query(query,null)
                .then(result=>{
                    return result.recordset;
                });
            return result;


        })

}


export class RobotProgramming{
    constructor(){
        sql.connect(connection_string);
    }

    public getControllerNames(){
        return doQuery(CONTROLLER_NAME_QUERY);
    }

    public getApplicationNames(){
        let query = "SELECT c.CAppNum,c.AppNum,c.ContNum,AppTypes.AppTypeName,c.Comment from CApplications as c Inner Join AppTypes On AppTypes.AppNum=c.AppNum where c.ContNum="+id+" Order By AppTypes.AppTypeName";
        return doQuery(query);          

    }
    public getAppPaths(){
         var query ="SELECT a.AppPathID,a.PathNum,StandardPaths.PathName from AppPaths as a Inner Join StandardPaths On a.PathNum=StandardPaths.PathNum Where a.CAppNum="+id+" Order By StandardPaths.PathName";
        return doQuery(query);
    }

}
 