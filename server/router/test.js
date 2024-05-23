const express = require("express");
const router = express.Router();

const data = {
	name: "rest-api",
	version: "1.0.0",
	description: "REST-api for back-end of Photo Site project",
	main: "index.js",
};

router.get("/", function (req, res) {
	res.send(data);
});

module.exports = router;
