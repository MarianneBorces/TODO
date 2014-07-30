var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo = mongoose.model( 'Todo' );

/* GET users listing. */
router.get('/delete/:id', function(req, res) {
	Todo.findByIdAndRemove( req.params.id, function( err ){
		if (err){
			return res.end( JSON.stringify( err ));
		}
		res.redirect( '/todos' );
	});
});

module.exports = router;
