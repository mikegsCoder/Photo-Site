const { userModel, tokenBlacklistModel } = require("../models");

const utils = require("../utils");
const { authCookieName } = require("../app-config");

const bsonToJson = (data) => {
	return JSON.parse(JSON.stringify(data));
};
const removePassword = (data) => {
	const { password, __v, ...userData } = data;
	return userData;
};

function register(req, res, next) {
	const { firstName, lastName, email, password } = req.body;

	return userModel
		.create({ firstName, lastName, email, password })
		.then((createdUser) => {
			createdUser = bsonToJson(createdUser);
			createdUser = removePassword(createdUser);

			const token = utils.jwt.createToken({ id: createdUser._id });
			if (process.env.NODE_ENV === "production") {
				res.cookie(authCookieName, token, {
					httpOnly: true,
					sameSite: "none",
					secure: true,
				});
			} else {
				res.cookie(authCookieName, token, { httpOnly: true });
			}
			res.status(200).send(createdUser);
		})
		.catch((err) => {
			if (err.name === "MongoError" && err.code === 11000) {
				let field = err.message.split("index: ")[1];
				field = field.split(" dup key")[0];
				field = field.substring(0, field.lastIndexOf("_"));

				res.status(409).send({
					message: `This ${field} is already registered.`,
				});
				return;
			}
			next(err);
		});
}

module.exports = {
  register
}