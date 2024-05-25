const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required."],
			minLength: [6, "Title must be at least 6 characters long."],
		},
		imageUrl: {
			type: String,
			required: [true, "ImageUrl is required."],
			match: [/^https?/, "Image must be a valid URL."],
		},
		keyword: {
			type: String,
			required: [true, "Keyword is required."],
			minLength: [4, "Keyword must be at least 4 characters long."],
		},
		location: {
			type: String,
			required: [true, "Location is required."],
			maxLength: [15, "Location must be at most 15 characters long."],
		},
		date: {
			type: String,
			required: [true, "Date is required."],
			minlength: [10, "Date must be 10 characters long."],
			maxlength: [10, "Date must be 10 characters long."],
		},
		description: {
			type: String,
			minLength: [8, "Description must be at least 9 characters long."],
		},
		rating: { type: Number, default: 0 },
		author: { type: ObjectId, ref: "User" },
		votes: [{ type: ObjectId, ref: "User", default: [] }],
	},
	{ timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Post", postSchema);
