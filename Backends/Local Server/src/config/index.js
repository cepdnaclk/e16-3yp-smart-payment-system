require('dotenv/config')

module.exports = {
	app : process.env.APP,
	port : process.env.PORT,
	env : process.env.NODE_ENV,
	secret : process.env.SECRET,
	db : {
		host : process.env.DBHOST,
		user : process.env.DBUSR,
		password : process.env.DBPWD,
	},
	testdb : {
		host : process.env.TESTDBHOST,
		user : process.env.TESTDBUSR,
		password : process.env.TESTDBPWD,
	}
}