const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/AuthenticateToken");
const postValidator = require("../middleware/AddPostMWValidator");
const reactValidator = require("../middleware/ReactMWValidator");
const commentValidator = require("../middleware/AddCommentMWValidator");
const editCommentValidator = require("../middleware/EditCommentMWValidator");
const getCommentsValidator = require("../middleware/PostIDMWValidator");
const { Post } = require("../models/PostModel");

router.post("/", authenticateToken, postValidator, async (req, res) => {
    try {
        let post = new Post({
            body: req.body.postBody,
            fullname: req.fullname,
            email: req.email
        });
        post.save();
        res.status(200).send("Posted successfully...")
    }
    catch (err) {
        console.log(err.message)
    }
});


router.post("/get", authenticateToken, async (req, res) => {
    try {
        let posts = await Post.find().sort({ date: -1 });
        if (!posts) return res.status(500).send("No posts found...");
        res.status(200).send(posts);
    }
    catch (err) {
        console.log(err.message)
    }
});

router.post("/getcomments", authenticateToken, getCommentsValidator, async (req, res) => {
    try {
        let comments = await Post.findById(req.body.postId).select("comments");
        if (!comments) return res.status(500).send("No Cooments found...");
        res.status(200).send(comments);
    }
    catch (err) {
        console.log(err.message)
    }
});

router.post("/react", authenticateToken, reactValidator, async (req, res) => {
    try {
        await Post.updateOne({ _id: req.body.postID }, { $pull: { likes: { id: req.userid } } });
        await Post.updateOne({ _id: req.body.postID }, { $pull: { dislikes: { id: req.userid } } });
        if (!req.body.add) return res.status(200).send(await Post.findById(req.body.postID).select("likes dislikes"));
        if (req.body.react == "like") {
            await Post.updateOne({ _id: req.body.postID }, { $push: { likes: { id: req.userid } } });

        }
        else if (req.body.react == "dislike") {
            await Post.updateOne({ _id: req.body.postID }, { $push: { dislikes: { id: req.userid } } });

        }
        return res.status(200).send(await Post.findById(req.body.postID).select("likes dislikes"));

    }
    catch (err) {
        console.log(err.message)
    }
});

router.post("/comment", authenticateToken, commentValidator, async (req, res) => {
    try {
        await Post.updateOne({ _id: req.body.postID }, { $push: { comments: { body: req.body.commentBody, fullname: req.fullname, email: req.email } } });
        res.status(200).send(await Post.findById(req.body.postId).select("comments"));
    }
    catch (err) {
        console.log(err.message)
    }

});
router.put("/comment", authenticateToken, editCommentValidator, async (req, res) => {
    try {
        let post = await Post.updateOne({ _id: req.body.postID, comments: { $elemMatch: { _id: req.body.commentID, email: req.email } } }, { $set: { "comments.$.body": req.body.commentBody } })
        if (!post.matchedCount) return res.status(400).send("Bad request...");

        res.status(200).send("Comment added...");
    }
    catch (err) {
        console.log(err.message)
    }

});

router.delete("/comment", authenticateToken, editCommentValidator, async (req, res) => {
    try {
        let post = await Post.updateOne({ _id: req.body.postID, comments: { $elemMatch: { _id: req.body.commentID, email: req.email } } }, { $pull: { comments: { _id: req.body.commentID, email: req.email } } })
        if (!post.matchedCount) return res.status(400).send("Bad request...");

        res.status(200).send("Comment removed...");
    }
    catch (err) {
        console.log(err.message)
    }

});

module.exports = router;