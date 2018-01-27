
var Gridfs=require('./models/Gridfs.js');
var fs=require("fs");
var sd=require('silly-datetime');

var MongoClient=require('mongodb').MongoClient,
	GridStore=require('mongodb').GridStore,
	ObjectID=require('mongodb').ObjectID;

var tempTime=sd.format(new Date(),'YYYY-MM-DD');
var tempFilename="1.jpg";
var tempFileId=new ObjectID();

var gridJson={
	areaID:"s01",
	timeString:tempTime,
	filename:tempFilename,
	fileId:tempFileId
};

Gridfs.save(gridJson,function(err){});


//Gridfs.save(dataJson,function(err){});

