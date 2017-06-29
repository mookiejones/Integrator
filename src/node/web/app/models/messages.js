// app/models/nerd.js
// grab the mongoose module


// Modules


// var mongoose = require('mongoose'),
//     test=require('assert');
var mh=require('../export/message_helper');
// const DB_NAME="NerdSolutions";
// const CollectionName='messageitems';
// const url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';
// var MongoClient=require('mongodb').MongoClient;
//     const filter = {};

//     const options={sort:{_id:-1},limit:100};
module.exports=mh;

// module.exports={
//     find:function(){
//        return MongoClient.connect(url)
//             .then(function(db){
//                 db=db.db(DB_NAME);
//                 var collection=db.collection(CollectionName);
//                 return collection.find(filter,options).toArray();
//             })
//             .catch(function(err){
//                 console.error(err);
//             })
//     },
//     update:function(){

//     }
// };

// define our nerd model
// module.exports allows us to pass this to other files when it is called
// module.exports = mongoose.model('Messages', {
//     name : {type : String, default: ''}
// });