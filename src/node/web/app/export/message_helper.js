var MongoClient=require('mongodb').MongoClient;
 
var http = require('http');
const DB_NAME="NerdSolutions";
const CollectionName='messageitems';
const url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';
const filter = {};

const options={sort:{_id:-1},limit:100};

console.log('getting');

var getCollection=function(){
     return MongoClient.connect(url)
            .then(function(db){
                            
                 var result=db.db(DB_NAME).collection(CollectionName);

                 var filter={User:'cberman'};
                 
                 var o=result.deleteMany(filter,function(err,o){
                     if(err)
                        console.log(err);
                  //  if(o)
                 //       console.log(o);
                 });

                 return result;

            })
            .catch(function(err){
                console.error(err);
            });
}

var MessageHelper={};
MessageHelper.collection=getCollection;
MessageHelper.project={$project:{"name":"$Software"}};
MessageHelper.find=function(){
    return getCollection()
         .then(function(collection){
            return collection.find(filter,options).toArray();
        })
        .catch(function(err){
            console.error(err);
        });
};
MessageHelper.names=function(){
     return this.collection()
        .then(function(collection){
              var pipeline=[{$group:{_id:"$Software"}}];
               
              return collection.aggregate(pipeline).toArray();
                

        })
        .catch(function(err){
            console.error(err);
        });    
};
 
 MessageHelper.fromNames=function(){
    return MongoClient.connect(url)
            .then(function(db){
                var collection = db.db(DB_NAME).collection(CollectionName);
                var pipeline=[{$group:{_id:"$Software"}}];
                collection.aggregate(pipeline).toArray()
                    .then(function(names){

                    })
                    .catch(function(err){

                    })
                
            })
            .catch(function(err){

            })
 }
 
 
MessageHelper.aggregate=function(pipeline){
    

    return getCollection()
        .then(function(collection){
            return collection.aggregate(pipeline).toArray();
        })
        .catch(function(err){
            console.error(err);
        });
}
MessageHelper.softwareCount=function(name){
    var filter={$match:{"User":name}};
    var group={$group:{_id:'$Software',count:{$sum:1}}};
    var sort={$sort:{count:-1}};
    var pipeline=[filter,group,sort];

    return this.aggregate(pipeline);

}
MessageHelper.timeline=function(){
    var stage1={$project:{TimeStamp:1,Software:1,time:{$substr:["$TimeStamp",0,10]}}};
    var stage2={$group:{_id:{time:"$time",name:"$Software"},count:{$sum:1}}};
    var stage3={$sort:{"_id.name":1}};
    var stage4={$group:{_id:"$_id.time",items:{$push:{name:"$_id.name",count:"$count"}}}};
    var stage5={$project:{_id:1,items:1,
        year:{$substr:["$_id",0,4]},
        month:{$substr:["$_id",5,2]},
        day:{$substr:["$_id",8,2]}
    }};
    var stage6={$sort:{year:1,month:1,day:1}};
    var pipeline=[stage1,stage2,stage3,stage4,stage5,stage6];
    return this.aggregate(pipeline);

}

MessageHelper.getUsers=function(){
    

        var group = {$group:{_id:{user:'$User'},count:{$sum:1}}};
        var sort={$sort:{count:-1}};
         var pipeline=[group,sort];
        var result= this.aggregate(pipeline);
        return result;            
}
MessageHelper.userCount=function(){
    
        var group = {$group:{_id:"$User", count:{$sum:1}}};
        var sort={$sort:{count:-1}};
        var pipeline=[group,sort];
        console.log('stop');
        return this.aggregate(pipeline);
    
}

MessageHelper.deleteDeveloper=function(){
    collection.deleteMany({"User":'cberman'});
}
 
module.exports = MessageHelper;