export default ({ env }) => ({
	connection: {
		client: 'mysql',
		connection: {
		host: env('DATABASE_HOST', 'strapi_mysql'),
			port: env.int('DATABASE_PORT', 3306),
			database: env('DATABASE_NAME', 'connex_db'),
			user: env('DATABASE_USERNAME', 'root'),
			password: env('DATABASE_PASSWORD', 'abcd1234@'),
			ssl: env.bool('DATABASE_SSL', false)
		}
	}
});
