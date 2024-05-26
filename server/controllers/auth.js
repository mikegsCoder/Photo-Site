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
