
var mongodb=require('./mongodb.js');
var Schema=mongodb.mongoose.Schema;
var PictureSchema=new Schema({
	areaID:String,
	time:{type:Date,default:Date.now},
	timeString:String,
	pictureData:[
		{img:String}
	],
	analyse:{
		greenPix:String,
		yellowPix:String,
		growPeriod:String
	}
});

var Picture=mongodb.mongoose.model("Picture",PictureSchema);
var PictureDAO=function(){};

PictureDAO.prototype.save=function(obj){
	var instance=new Picture(obj);
	instance.save(function(err){
		if(err){
			console.log(err);
		}else{
			console.log("save success");
		}
	});
};

PictureDAO.prototype.findAll=function(queryJson,callback){
	Picture.find(queryJson,function(err,obj){
		callback(err,obj);
	});	
}
PictureDAO.prototype.findOne=function(queryJson,callback){
	Picture.findOne(queryJson,function(err,obj){
		callback(err,obj);
	});
}

PictureDAO.prototype.remove=function(queryJson){
	Picture.remove(queryJson,function(err){
		if(err) console.log(err);
	});
}	

PictureDAO.prototype.update=function(queryJson,updateJson){
	Picture.findOneAndUpdate(queryJson,updateJson,function(err){
		if(err){
			console.log(err);
		}else{
			console.log("update success");
		}
	});
}

module.exports=new PictureDAO();

