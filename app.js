
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/mongooseDB',{useMongoClient:true});
var db=mongoose.connection;

var kittySchema=mongoose.Schema({
	name:String
});

var Kitten=mongoose.model('Kitten',kittySchema);

var silence=new Kitten({name:'Silence'});

silence.save(function(err,obj){
	if(err){
		return console.log(err);
	}else{
		console.log(obj.name);
	}
});

Kitten.find(function(err,kittens){
	if(err) return console.error(err);
	console.log(kittens);
});
