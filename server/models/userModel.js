const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
	{
		password: {
			type: String,
			required: true,
			minlength: [4, "Password must be at least 4 characters long."],
		},
		firstName: {
			type: String,
			required: true,
			minlength: [3, "First name must be at least 3 characters long."],
			validate: {
				validator: function (v) {
					return /^[A-Za-z]+$/g.test(v);
				},
				message: (props) =>
					`${props.value} must contains only latin letters.`,
			},
		},
		lastName: {
			type: String,
			required: true,
			minlength: [5, "Last name must be at least 5 characters long."],
			validate: {
				validator: function (v) {
					return /^[A-Za-z]+$/g.test(v);
				},
				message: (props) =>
					`${props.value} must contains only latin letters.`,
			},
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		posts: [
			{
				type: ObjectId,
				ref: "Post",
				default: [],
			},
		],
	},
	{ timestamps: { createdAt: "created_at" } }
);

userSchema.methods = {
	matchPassword: function (password) {
		return bcrypt.compare(password, this.password);
	},
};

userSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
				next(err);
			}
			bcrypt.hash(this.password, salt, (err, hash) => {
				if (err) {
					next(err);
				}
				this.password = hash;
				next();
			});
		});
		return;
	}
	next();
});

module.exports = mongoose.model("User", userSchema);
