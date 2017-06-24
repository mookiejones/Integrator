var MongoClient=require('mongodb').MongoClient;
var test=require('assert');

const DB_NAME="NerdSolutions";
const CollectionName='messageitems';
const url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';
const filter = {};

const options={sort:{_id:-1},limit:100};

var collection=function(){
    return MongoClient.connect(url)
    .then(function(db){
        return db.db(DB_NAME).collection(CollectionName);
    })
    .catch(function(err){
        test.fail(err);
    });
}

var result=collection();