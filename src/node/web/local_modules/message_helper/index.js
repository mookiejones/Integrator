var MongoClient=require('mongodb').MongoClient;
const DB_NAME="NerdSolutions";
const CollectionName='messageitems';
const url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';
const filter = {};

    const options={sort:{_id:-1},limit:100};


var result={
    project:{$project:{"name":"$Software"}},
    collection:function(){
        return MongoClient.connect(url)
            .then(function(db){
                            console.log('got collection');

                return db.db(DB_NAME).collection(CollectionName);
            })
            .catch(function(err){
                console.error(err);
            });
    }
};

result.find=function(){
    return this.collection()
        .then(function(collection){
            return collection.find(filter,options).toArray();
        })
        .catch(function(err){
            console.error(err);
        });
    
}


result.names=function(){
    return this.collection()
        .then(function(collection){
              var pipeline=[{$group:{_id:"$Software"}}];
               
              return collection.aggregate(pipeline).toArray();
                

        })
        .catch(function(err){
            console.error(err);
        });    
}
result.fromNames=function(name){
    var collection=this.collection();

        
}
result.fromNames=function(){
    MongoClient.connect(url)
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


result.userCount=function(){
    
        var group = {$group:{_id:"$User", count:{$sum:1}}};
        var sort={$sort:{count:-1}};
        var pipeline=[group,sort];
      return this.collection()
        .then(function(collection){
            return collection.aggregate(pipeline).toArray();
        })
        .catch(function(err){
            console.error(err);
        });
}

module.exports = result;