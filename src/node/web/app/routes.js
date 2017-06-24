 // app/routes.js

// grab the nerd model we just created
    var multer = require('multer');
    var FileServer = require('../../FileServer/fileserver');
    var Nerd = require('./models/nerd');
    var Messages = require('./models/messages');
    var fs = require('fs');
    var KukaMongo = require('./kukamongo');
    var formidable = require('formidable');
    var mh = require('./export/message_helper');
    const test = require('assert');
    const MongoClient = require('mongodb').MongoClient;
    const kukamongo = require('./kukamongo');
    const filter = {};
    console.log('hello');
    const options={sort:{_id:-1},limit:100};

    

    const CollectionName = 'messageitems';
    const collection_name='messageitems';
    // const url = 'mongodb://Nerd.Solutions:27017/NerdSolutions';
	const url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';

//    const url='mongodb://mookie:Mookie_jones313@138.197.30.159:27017/admin';
    const dev_url='mongodb://10.10.1.65:27017/kuka-tech-us';
	const license_filter={Message:{$regex:/A new license/i}};
    var getUserCount=mh.userCount;

    var storage=multer.diskStorage({
       destination:function(req,file,cb){
           cb(null,__dirname +'/upload/');
      
       },
        filename:function(req,file,cb){
           
            
            var result=file.originalname.replace(/([^.]+).zip/i,"$1-"+Date.now()+".zip");
            cb(null,result)
            
        }
    })

    var upload=multer({ storage:storage,filefilter:'.zip'})
    module.exports = function(app) {
        
        // Get Timeline items
        app.get('/api/timeline',function(req,res){
            mh.timeline()
                .then(function(results){
                    res.json(results);
                })
                .catch(function(err){
                    res.send(err);
                });
        });
         app.get('/api/usercount',function(req,res){
             console.log('Getting Usercount');
            mh.userCount()
                .then(function(results){
                    res.json(results);

                })
                .catch(function(err){
                    res.send(err);
                });
          
        });
        app.get('/api/charles',function(req,res){
                         console.log('Getting Usercount');

            mh.userCount()
                .then(function(results){
                    res.json(results);

                })
                .catch(function(err){
                    res.send(err);
                });
          
        });

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

	app.get('/api/license',function(req,res){

		kukamongo.getLicenses()
			.then(function(result){				
				res.json(result);
			})
			.catch(function(error){
				res.send(error);
			});
		 
			
	});
        // sample api route
        app.get('/api/nerds', function(req, res) {


            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });
       
     
        app.post('/upload',upload.single('zipfile'),FileServer.processFile,(req,res,next)=>{
            debugger;
        });

        app.post('/api/files',function(req,res){
            console.log(Object.keys(req));
            console.log(req.body);
             return;
               /*
            fs.readFile(req.files.file.path,(err,data)=>{
                
            })
            var file = req.files[0];
            console.log(file);
            console.log('get file');
            res.json({"ok":1});
           
           fs.readFile(req.files[0].path,function(err,data){
                console.log('reading file');
            });
           console.log("url is "+req.url);
            var form = new formidable.IncomingForm();
            console.log(req.data);
            res.send(req);
            try{
             form.parse(req, function (err, fields, files) {
                 console.log(files);
                  var oldpath = files.filetoupload.path;
                  var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
                  var newpath = './uploads/' + files.filetoupload.name;
                  res.json({'msg':'uploaded'});
              //res.write('File uploaded');
              //res.end();
             });
            }catch(e){
                res.send(e);
            }*/
            
        });
        app.get('/api/messageUsers',function(req,res){
           mh.getUsers()
            .then(function(results){
                res.json(results);
            })
            .catch(function(err){
                res.send(err);
            });

/*
            MongoClient.connect(url)
                .then(function(db){
                   db=db.db("NerdSolutions");
                    var collection = db.collection(collection_name);
                    collection.aggregate([{$group:{_id:{user:'$User'}, count: {$sum:1}}}]).toArray()
                        .then(function(result){
                          
                            res.json(result);

                        })
                        .catch(function(error){
                            console.log('error: '+ error);
                            res.send(error);
                        });

                })
                .catch(function(error){
                            console.log('error: '+ error);
                            res.send(error);
                        });*/
            });
     

        app.get('/api/statistics',function(req,res){
            MongoClient.connect(url)
                .then(function(db){
                    var collection=db.db('NerdSolutions').collection(CollectionName);
                    
                })
                .catch(function(err){
                    res.send(error);
                })
        })
        app.get('/api/messages',function(req,res){       
            mh.find() 
            // Messages.find()
                .then(function(docs){
                    res.json(docs);                    
                })  
                .catch(function(err){
                    res.send(error);
                }) ;
           
        });

       
        app.get('/user/:id',function(req,res){
            mh.softwareCount(req.params.id)
                .then(function(docs){
                    res.json(docs);
                })
                .catch(function(err){
                    res.send(err);
                });
        });
     

        // route to handle creating goes here (app.post)
        app.delete('/api/messages/:id',function(req,res){
            console.log('deleting messages');

            var id=req.params.id;
            console.log('deleting '+ req.params.id);
            MongoClient.connect(url)
                .then(function(db){
                    var collection = db.collection(CollectionName);
                    collection.findOneAndDelete({_id:id})
                        .then(function(result){
                            console.log('success in deleting item '+ result);
                            db.close();
                            res.json(result);
                        })
                        .catch(function(error){
                            console.error('error in deleting item '+ error);
                            res.send(error);
                        });
                       
                  

                })
                .catch(function(error){
                    console.error('there was an error '+ error);
                    res.send(error);

                });

            // console.log('delete messages',res.type);
        });
     

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

        app.post('/fileupload',FileServer.upload);
    }






    
