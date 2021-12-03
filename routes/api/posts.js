const express = require("express");
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');

const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const config = require('config');

//Adding posts

router.post('/', [
    authMiddleware,
    [
        check('text', 'text is required').not().isEmpty(),
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        return res.json(post);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }


});

//get a post

router.get('/', authMiddleware, async (req, res) => {

    try {

        const posts = await Post.find().sort({ date: -1 });

        if (posts) {
            return res.json(posts);
        }
        else {
            return res.json({ msg: " no posts found " });
        }

    } catch (error) {

        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "post not found" });
        }
        res.status(500).send(error.message)

    }

});

//Delete a post

router.delete('/:id', authMiddleware, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: " post not found " });
        }

        if (post.user.toString() != req.user.id) {

            return res.status(401).json({ msg: "User not authorized" });

        }

        await post.remove();

        return res.json({ msg: "Post removed" });

    } catch (error) {

        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "profile not found" });
        }
        res.status(500).send("Server Error")

    }

});


//Like a post
router.put('/likes/:id', authMiddleware, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: " post not found " });
        }

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: " Post already liked " });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        return res.json(post);

    } catch (error) {

        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "profile not found" });
        }
        res.status(500).send("Server Error")

    }

});

// Unlike a post

router.put('/unlike/:id', authMiddleware, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        //check if post is liked or not
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {


            return res.status(400).json({ msg: " Post has not yet been liked " });

        }
        //if liked
        const removeIndex = await post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        return res.json(post);



    } catch (error) {

        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "profile not found" });
        }
        res.status(500).send("Server Error")

    }

});



//Adding comments to posts

router.post('/comments/:id', [
    authMiddleware,
    [
        check('text', 'text is required').not().isEmpty(),
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        post.comments.unshift(newComment);
        await post.save();
        return res.json(post);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }


});


//Deleting Comments 
router.delete('/comments/:id/:comment_id', authMiddleware, async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);


        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({ msg: " Comment does not exists " });

        }


        if (comment.user.toString() !== req.user.id) {


            return res.status(401).json({ msg: " User not authorized " });

        }

        const removeIndex = await post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();
        return res.json(post);



    } catch (error) {

        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: "No comment" });
        }
        res.status(500).send(error.message);

    }

});


module.exports = router;