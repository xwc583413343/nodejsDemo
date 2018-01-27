
var mongodb=require('./mongodb.js');
var MongoClient=require('mongodb').MongoClient,
	GridStore=require('mongodb').GridStore;


var Schema=mongodb.mongoose.Schema;
var GridfsSchema=new Schema({
	areaID:String,
	time:{type:Date,default:Date.now},
	timeString:String,
	filename:String,
	fileId:Schema.Types.ObjectId
});

var Gridfs=mongodb.mongoose.model("Gridfs",GridfsSchema);
var GridfsDAO=function(){};


GridfsDAO.prototype.save=function(obj){
	var instance=new Gridfs(obj);
	instance.save(function(err){
		if(err){
			console.log(err);
		}else{
			MongoClient.connect('mongodb://localhost:27017/nodejs',function(err,db){
					var gridStore=new GridStore(db,obj.fileId,obj.filename,'w');
					gridStore.open(function(err,gridStore){

						gridStore.writeFile(obj.filename,function(err,doc){
							db.close();				
						});
					});

					});
			console.log("save gridfs success");
		}
	});
};

GridfsDAO.prototype.findAll=function(queryJson,callback){
	Gridfs.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}
GridfsDAO.prototype.findOne=function(queryJson,callback){
	Gridfs.findOne(queryJson,function(err,obj){
		callback(err,obj);
	});
}

GridfsDAO.prototype.remove=function(queryJson){
	Gridfs.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

module.exports=new GridfsDAO();

