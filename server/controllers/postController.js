const { userModel, postModel } = require("../models");

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

module.exports = {
	getAllPosts,
};
