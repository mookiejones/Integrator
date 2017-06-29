// app/KukaMongo.js

const MongoClient=require('mongodb').MongoClient;
const url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';
const license_filter={Message:{$regex:/License/i}};
const CollectionName='messageitems';
const DBName='NerdSolutions';
var kukamongo={

};
kukamongo.url=url;

kukamongo.getDB=function(req,res){
	MongoClient.connect(url)
		.then(function(db){
			return db.db(DBName);
		})
		.catch(function(error){
			res.send(error);
		});
}
kukamongo.getLicenses=function(req,res){
	
	return MongoClient.connect(url)		 
		.then(function(db){

			var collection = db.db(DBName).collection(CollectionName);
			console.log('getting license info');
			collection.find(license_filter).toArray()
				.then(function(result){
					res.json(result);
					db.close();
				})
				.catch(function(error){
					res.send(result);
				});
		})
		.catch(function(error){

		});
}

module.exports = kukamongo;