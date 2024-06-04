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

function updatePost(req, res, next) {
	const postData = {
		id: req.params.id,
		author: req.user.id,
		title: req.body.title.trim(),
		keyword: req.body.keyword.trim(),
		location: req.body.location.trim(),
		date: req.body.date.trim(),
		imageUrl: req.body.imageUrl.trim(),
		description: req.body.description.trim(),
		author: req.user._id,
	};

	// if the userId is not the same as this one of the post, the post will not be updated
	postModel
		.findOneAndUpdate(
			{
				_id: postData.id,
				author: postData.author,
			},
			{
				title: postData.title,
				keyword: postData.keyword,
				location: postData.location,
				date: postData.date,
				imageUrl: postData.imageUrl,
				description: postData.description,
			},
			{ new: true }
		)
		.then((updatedPost) => {
			if (updatedPost) {
				res.status(200).json(updatedPost);
			} else {
				res.status(401).json({
					message: `You can't edit post you haven't created.`,
				});
			}
		})
		.catch(next);
}

function deletePost(req, res, next) {
	const id = req.params.id;
	const { _id: author } = req.user;

	Promise.all([
		postModel.findOneAndDelete({ _id: id, author }),
		userModel.findOneAndUpdate({ _id: author }, { $pull: { posts: id } }),
	])
		.then((deletedOne) => {
			if (deletedOne) {
				res.status(200).json(deletedOne);
			} else {
				res.status(401).json({
					message: `You can't delete post you haven't created.`,
				});
			}
		})
		.catch(next);
}

function votePositive(req, res, next) {
	const id = req.params.id;
	const userId = req.user._id;

	console.log("Vote positive by user: " + userId);

	postModel
		.updateOne(
			{ _id: id },
			{
				$addToSet: { votes: userId },
				$inc: { rating: 1 },
			},
			{ new: true }
		)
		.then(() => {
			res.status(200).json({ message: "Voted successful!" });
		})
		.catch(next);
}

module.exports = {
	getAllPosts,
	getProfilePosts,
	newPost,
	createPost,
	getPost,
	updatePost,
	deletePost,
  votePositive
};
