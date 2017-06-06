const sql = require('mssql');
const SERVER_NAME = 'robotprogramming.database.windows.net';
const DB_NAME = 'RobotProgramming';
const ControllerQuery = "SELECT * FROM Controllers";

const config = {
            user: 'kuka',
            userName: 'kuka',
            password: 'I<3LarryDrake',
            database: DB_NAME,
            server: SERVER_NAME,
            options: {
                encrypt: true,
                database: DB_NAME //update me
            }
        };

module.exports = {

	// the database url to connect
	url : 'mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu',
	sql:sql.connect(config)
}