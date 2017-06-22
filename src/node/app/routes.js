var RobotProgramming=require('./models/robotprogramming')

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests



	// Controllers
	app.get('/api/controllers',function(req,res){
		
		RobotProgramming.getControllerNames()
			.then(function(data){
				res.json(data);
			})
			.catch(function(err){
				debugger;
				res.send(err);
			});

	});

	app.get('/api/apppaths',function(req,res){
		var id = req.query['id'];
		RobotProgramming.getAppPaths(req.query.id)
			.then(data=>{
				res.json(data);
			})
			.catch(err=>{
				debugger;
			})
	});

	// Applications
	app.get('/api/applications',function(req,res){
		var id = req.query['id'];
		RobotProgramming.getApplicationNames(req.query.id)
			.then(function(data){
				res.json(data);
			})
			.catch(function(err){
				debugger;
				res.send(err);
			});

	});
	app.get('*', function(req, res) {
		console.log('generic');
		res.sendfile('./public/index.html');
	});

};