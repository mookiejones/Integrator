var MongoClient=require('mongodb').MongoClient,
    test=require('assert');
var mh=require('message_helper');

// var mh = require('../local_modules/message_helper/index.js');
const DB_NAME="NerdSolutions";
const CollectionName='messageitems';
const url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';


var group = {$group:{_id:"$User", count:{$sum:1}}};
var sort={$sort:{count:-1}};
var pipeline=[group,sort];

var getCollection=function(){
        return MongoClient.connect(url)
            .then(function(db){
                            

                return db.db(DB_NAME).collection(CollectionName);
            })
            .catch(function(err){
                console.error(err);
            });
}

 
var sortByName=function(name){
    console.log('sortByName '+ name);
    getCollection()
        .then(function(collection){
            var items=collection.find({'Software':name}).toArray()
            .then(function(result){
                console.log('');
            })
            .catch(function(err){
                console.log('');

            });
        })
        .catch(function(err){

        });

}

mh.userCount()
.then(function(result){
    console.log(result);
})
.catch(function(err){
    console.error(err);
});

var getNames=function(){
    mh.names()
        .then(function(items){
            var names=items.map(function(item){return item._id});
            names.forEach(function(name){
                sortByName(name);
            });

        })
} 
getNames();





mh.find()
    .then(function(docs){
        console.log('there are '+docs.length+' docs');
    })
    .catch(function(err){
        console.log(err);
    });
var c=mh.collection();
mh.names()
    .then(function(names){
        var items = names.map(function(item){
     
        return item._id;

        });

        console.log(items);
    })
    .catch(function(err){
        console.log(err);
    });

 
