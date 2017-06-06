// 'use strict';
import sql = require('mssql');

export default class RobotProgramming{
// Create connection to database
    private SERVER_NAME:string='robotprogramming.database.windows.net';
    private DB_NAME:string='RobotProgramming';
    private ControllerQuery:string="SELECT * FROM Controllers";

    private config(){
        var result={
            user:'kuka',
            userName: 'kuka', // update me
            password: 'I<3LarryDrake', // update me
            database:this.DB_NAME,
            server: this.SERVER_NAME, // update me
            options: {
                encrypt:true,
                database: this.DB_NAME //update me
                }            
        }
        return result;
    }
    
    getQuery(query:string):Promise<any>{

        var config = this.config();

        var result = sql.connect(config)
            .then(()=>{
                return sql.query(query);                    
            })
            .catch(err=>{
              return err;  
            });
        return result;
    }

    getControllerNames():Promise<any>{
        return this.getQuery(this.ControllerQuery);
    }

}


/*

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.log(err)
    }
    else{
        getControllers()
    }
});

function getControllers(){
    request = new Request("SELECT ContName FROM Controllers",function(err,rowCount,rows){
        console.log(rowCount + 'row(s) returned');
    });
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
    
}

function RobotProgramming(){

}

RobotProgramming.prototype.getControllers = function(){
    result=[];
     request = new Request("SELECT ContName FROM Controllers",function(err,rowCount,rows){
        console.log(rowCount + 'row(s) returned');
    });

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            result.push(column.value);
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
    console.log('results '+result);
}
function queryDatabase(){
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        "SELECT * From Controllers",
        function(err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}*/