const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "this is my secret";

function createToken(data) {
	return jwt.sign(data, secret, { expiresIn: "1d" });
}

module.exports = {
	createToken
};
