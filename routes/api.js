var express = require('express');
var router = express.Router();

router.route('/posts')
	
	//getting all existing posts
	.get(function(req,res){

		//temp solution
		res.send({message: 'TODO return all posts'});
	})

	//creating a new post
	.post(function(req,res){

		//temp solution
		res.send({message: 'TODO create new post'})
	});

router.route('/posts/:id')
	
	// getting specific existing post
	.get(function(req,res){

		//temp solution
		res.send({message: 'TODO return post with ID '+req.params.id});
	})

	// modifying specific existing post
	.put(function(req,res){

		//temp solution
		res.send({message: 'TODO modify post with ID '+req.params.id});
	})

	// deleting specific existing post
	.delete(function(req,res){

		//temp solution
		res.send({message: 'TODO delete post with ID '+req.params.id});
	});

module.exports = router;