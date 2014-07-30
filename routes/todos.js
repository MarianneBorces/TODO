var express = require( 'express' );
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo = mongoose.model('Todo');
/* GET home page. */
router.get('/', function(req, res) {

	Todo.find( {}, function( err, todos ) {
	  res.render('todos', { title: 'TO DO LIST',todos:todos });
	});
});

router.get( '/create', function( req, res) {
	res.render( 'todos-form', {title: 'Add To Do'});
});

router.post( '/create', function( req, res){
	var todo = new Todo(req.body);

	//save todo to db
	todo.save( function(err) {
		//if error, then prints error
		if (err){
			return res.end( JSON.stringify(err));
		}

		//if success, then redirect page to /todos
		res.redirect( '/todos' );
	});
});

router.get('/done/:id', function(req, res) {
	Todo.findByIdAndUpdate( req.params.id, {status: 'done'}, function( err ){
		if (!err){
			res.redirect( '/todos' );
		}
		else {
			return res.end( JSON.stringify( err ));
		}
	});
});



module.exports = router;
