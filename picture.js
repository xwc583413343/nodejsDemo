
var Picture=require('./models/Picture.js');
var fs=require("fs");
var sd=require('silly-datetime');

var tempData=fs.readFileSync("./1.jpg","binary");
var tempTime=sd.format(new Date(),'YYYY-MM-DD');

var dataJson={
	areaID:"p01",
	timeString:tempTime,
	pictureData:[
		{img:"xxxx"}
	],

	analyse:{
		greenPix:"50%",
		yellowPix:"50%",
		growPeriod:"生产期"
	}
};

//Picture.save(dataJson,function(err){});

updateJson={
	$set:
	{
	analyse:{
		greenPix:"20%",
		yellowPix:"30%",
		growPeriod:"生产期"
	}
	}
}
//Picture.update({timeString:"2017-07-31"},updateJson);
Picture.findOne({},function(err,result){
	if(err){
		console.log(err);
	}else{
		var imgData=result;
		console.log(imgData.analyse);
	}
});
