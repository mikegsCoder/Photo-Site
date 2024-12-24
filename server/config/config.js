const env = process.env.NODE_ENV || "development";

const config = {
	development: {
		port: process.env.PORT || 3000,
    dbURL: process.env.DB_URL_CREDENTIALS || "mongodb://127.0.0.1:27017/photo-site",
		origin: true,
	},
	production: {
		port: process.env.PORT || 3000,
		dbURL: process.env.DB_URL_CREDENTIALS,
		origin: true,
	},
};

module.exports = config[env];
