var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');

//middleware for api reqeust 
router.use(function(req, res, next){

	//allow all get request
	if(req.method === "GET"){
        return next();
    }
    //if user is authenticated allow all request 
    if (req.isAuthenticated()){
    	console.log("POSTING")
        return next();
    }

    // if the user is not authenticated then redirect him to the login page
    return res.redirect('/#login');
});

router.route('/posts')
	
	//getting all existing posts
	.get(function(req,res){

		Post.find(function(err, data){

			if(err){
				return res.send(500, err);
			}

			return res.send(200, data);
		});
	})

	//creating a new post
	.post(function(req,res){

		var post = new Post();
        post.text = req.body.text;
        post.createdBy = req.body.createdBy;

        post.save(function(err, post) {
            if (err){
                return res.send(500, err);
            }
            return res.json(post);
        });
	});

router.route('/posts/:id')
	
	// getting specific existing post
	.get(function(req,res){
		Post.findById(req.params.id, function(err, post){
            if(err){
                return res.send(err);
            }
            return res.json(post);
        });
	})

	// modifying specific existing post
	.put(function(req,res){
		Post.findById(req.params.id, function(err, post){
            if(err){
               return res.send(err);
            }

            post.created_by = req.body.created_by;
            post.text = req.body.text;

            post.save(function(err, post){
                if(err){
                    return res.send(err);
                }
                return res.json(post);
            });
        });
	})

	// deleting specific existing post
	.delete(function(req,res){
		Post.remove({
            _id: req.params.id
        }, function(err) {
            if (err){
               return res.send(err);
            }
            return res.json("deleted :(");
        });
	});

module.exports = router;