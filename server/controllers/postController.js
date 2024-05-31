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

module.exports = {
	getAllPosts,
	getProfilePosts,
};
