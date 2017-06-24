
const name='messageitems';
var MongoClient = require('mongodb').MongoClient,
	test = require('assert');

// Connection url
var url = 'mongodb://Nerd.Solutions:27017/NerdSolutions';

// Connect using MongoClient
MongoClient.connect(url, function(err, db) {
  // Create a collection we want to drop later

  var collection = db.collection(name);

  //insertItems(collection);
    findItems(collection);
   // dropCollection(collection,db);
 

	db.close();
	

});

var insertItems = function(collection){


	var items = new Array();
	for(i=0;i<1000;i++){
		var item = { a:i,b:i};
		items.push(item);
	}
	collection.insert(items,function(err,result){
		test.equal(null,err);
	});

}
var listCollections = function(db){
	db.listCollections().toArray(function(err,replies){
		var found = false;

		// For each collection in the list of collection names in this db, look for the 
		// dropped collection
		replies.forEach(function(document){
			console.log(document.name);
			if(document.name == name){
				found=true;
				return;
			}
		})
	})
}

var findItems = function(collection){
	collection.find({}).toArray(function(err,items){
		test.equal(null,err);
		items.forEach(function(x){
			console.log(x);
		});
	});
}

var dropCollection=function(collection,db){
	collection.drop(function(err,reply){

		 
		console.log("Searching Collection names");
		listCollections(db);
		 
	});
}