const { userModel, postModel } = require("../models");

function newPost({
	title,
	keyword,
	location,
	date,
	imageUrl,
	description,
	author,
}) {
	return postModel
		.create({
			title,
			keyword,
			location,
			date,
			imageUrl,
			description,
			author,
		})
		.then((post) => {
			return Promise.all([
				userModel.updateOne(
					{ _id: author },
					{ $push: { posts: post._id } }
				),
			]);
		});
}

function getAllPosts(req, res, next) {
	const limit = Number(req.query.limit) || 0;

	postModel
		.find()
		.sort({ created_at: -1 })
		.limit(limit)
		.populate("author votes")
		.lean()
		.then((posts) => {
			posts.map((post) => {
				delete post.author["password"];
			});
			res.status(200).json(posts);
		})
		.catch(next);
}

function getProfilePosts(req, res, next) {
	const userId = req.user.id;
	const limit = Number(req.query.limit) || 0;

	postModel
		.find({ author: userId })
		.sort({ created_at: -1 })
		.limit(limit)
		.populate("author votes")
		.lean()
		.then((posts) => {
			posts.map((post) => {
				delete post.author["password"];
			});
			res.status(200).json(posts);
		})
		.catch(next);
}

function createPost(req, res, next) {
	const postData = {
		title: req.body.title.trim(),
		keyword: req.body.keyword.trim(),
		location: req.body.location.trim(),
		date: req.body.date.trim(),
		imageUrl: req.body.imageUrl.trim(),
		description: req.body.description.trim(),
		author: req.user._id,
	};

	newPost(postData)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch(next);
}

function getPost(req, res, next) {
	const id = req.params.id;

	postModel
		.findById(id)
		.populate("author")
		.populate("votes")
		.lean()
		.then((post) => {
			delete post.author["password"];
			post.votes.map((v) => {
				delete v["password"];
				delete v["posts"];
			});
			res.json(post);
		})
		.catch(next);
}

module.exports = {
	getAllPosts,
	getProfilePosts,
	newPost,
	createPost,
  getPost
};
