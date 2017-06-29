
const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
var urls=[
    'mongodb://Nerd.Solutions:27017/NerdSolutions',
    'mongodb://10.10.1.65:27017/kuka-tech-us'
];
const target_url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';


const COLLECTION_NAME="messageitems";


var copyToMaster=function(items,callback){
    MongoClient.connect(target_url,function(err,db){
        test.equal(err,null);
        var collection = db.db('NerdSolutions').collection(COLLECTION_NAME);
        collection.insertMany(items,callback);
    });


    console.log('hello');
}

var getMessagesForURL=function(url){
    MongoClient.connect(url,function(err,db){
        test.equal(err,null);
        var collection = db.collection(COLLECTION_NAME);
        collection.find().toArray(function(err,items){
              test.equal(err,null);
          
            if(items.length==0){
                db.close();
                return;
            }
            copyToMaster(items,function(err,result){
                var ids=[];
                for(i=0;i<items.length;i++){
                    var item = items[i];
                    ids.push(item._id);
                };

                collection.remove({_id:{$in:ids}},function(err,result){
                    test.equal(err,null);
                    test.equal(result.result.n,items.length);
                    db.close();
                })
             
                     
                  
            });
               
        })
    
    });
}

var getMessages=function(){
    var messages=[];
    for(i=0;i<urls.length;i++){
        var url=urls[i];
        var items = getMessagesForURL(url);
        messages.push(items);

    }
    console.log('got');
}
setTimeout(getMessages,3000);