'use strict'

const config = require('../config')
const mysql = require('mysql')

const client = mysql.createConnection({
	host : config.db.host,
	user : config.db.user,
	password : config.db.password,
	multipleStatements : true
})

const sql = {
	database: {
		create: 'CREATE DATABASE IF NOT EXISTS World_Play_KCC;',
		use: 'USE World_Play_KCC;'
	},
	tables: {
		owner:'CREATE TABLE IF NOT EXISTS OWNER(NIC VARCHAR(12) PRIMARY KEY, FName VARCHAR(30) NOT NULL, LName VARCHAR(30) NOT NULL, Email VARCHAR(60) UNIQUE NOT NULL, Password VARCHAR(128) NOT NULL)',
		// Format of center ID is INT (auto increse)
		center:'CREATE TABLE IF NOT EXISTS CENTER(CENTER_ID INT AUTO_INCREMENT PRIMARY KEY, OWNER_ID VARCHAR(12) NOT NULL, NAME VARCHAR(30) NOT NULL, ACTIVATION BOOLEAN DEFAULT false)'
	}
}

// This will execute this with a promise to await until the queries return.
// So the system awaits untill the database creation is completed
exports.connect = async () => {

// setting up the database connection
	client.connect((err) => {
		if (err) {
			console.log(`Could not connect Mysql because of ${err.code}`)
			process.exit(1)
		}

		console.log('Mysql Connection is set. Waiting for DB configurations...')
	})




	
/////////////////////////////   Until the testinig is over   ///////////////////////////////////////
	client.query("DROP DATABASE World_Play_KCC", (err, results) => {
		if (err) {
			console.log(`Couldn't drop previous database "World_Play_KCC" because of ${err.code}`)
		  process.exit(1)
	  }
		
	  console.log(`Drop previous database "World_Play_KCC"`)
  })
///////////////////////////////////////////////////////////////////////////////////////////////////////






// Check whether the database is already exists. If not create it
	client.query(sql.database.create, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create Database "World_Play_KCC" because of ${err.code}`)
			process.exit(1)
		}
		  
		console.log(`DB "World_Play_KCC" is Created`)
	})

// Use created database
	client.query(sql.database.use, (err, results) => {
	  	if (err) {
	  		console.log(`Could not use Database "World_Play_KCC" because of ${err.code}`)
			process.exit(1)
		}
		  
		console.log(`Use database "World_Play_KCC" as the default database for following quries`)
	})

// creat table OWNER
	client.query(sql.tables.owner, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "OWNER" because of ${err.code}`)
			process.exit(1)
	  	}
		console.log('Table OWNER is created')
	})

// creat table CENTER
	client.query(sql.tables.center, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "CENTER" because of ${err.code}`)
			process.exit(1)
	  	}
		console.log('Table CENTER is created')
	})
}

// create dynamic tables when the gaming center is activated
exports.createGamingCenter = async (centerID, callback) => {

	// let strcenterid = centerID.toString() if center id is refuesed by the sql server
	
	// sql quries to create dynamics tables
	const dynamic_tables = {
		employee: `CREATE TABLE IF NOT EXISTS C${centerID}_EMPLOYEE(NIC VARCHAR(12) PRIMARY KEY, FName VARCHAR(30) NOT NULL, LName VARCHAR(30) NOT NULL, Email VARCHAR(60) UNIQUE NOT NULL, Password VARCHAR(128) NOT NULL, Role BOOLEAN DEFAULT false)`,
		// The format of Gaming Node Id is INT
		gamingNode:`CREATE TABLE IF NOT EXISTS C${centerID}_GAMING_NODE(Node_ID INT PRIMARY KEY, Value DOUBLE NOT NULL, Availability BOOLEAN DEFAULT true, Setup_Date DATE NOT NULL, Name VARCHAR(30) NOT NULL)`,
		customer:`CREATE TABLE IF NOT EXISTS C${centerID}_CUSTOMER(Customer_ID INT PRIMARY KEY, FName VARCHAR(30) NOT NULL, LName VARCHAR(30) NOT NULL, RFID_Tag VARCHAR(10) NOT NULL, Employee_ID VARCHAR(12) NOT NULL, Date DATE NOT NULL, Time TIME NOT NULL, Deposit_Amount DOUBLE NOT NULL, FOREIGN KEY (Employee_ID) REFERENCES C${centerID}_EMPLOYEE (NIC) ON UPDATE CASCADE)`,
		gamingLog:`CREATE TABLE IF NOT EXISTS C${centerID}_GAMING_LOG(Node_ID INT, Customer_ID INT, Date DATE NOT NULL, Time TIME, PRIMARY KEY(Node_ID, Customer_ID, Date, Time), FOREIGN KEY (Node_ID) REFERENCES C${centerID}_GAMING_NODE (Node_ID) ON UPDATE CASCADE, FOREIGN KEY (Customer_ID) REFERENCES C${centerID}_CUSTOMER (Customer_ID) ON UPDATE CASCADE)`
		
		// If we want to track RFID card also
		// rfidTag:`CREATE TABLE IF NOT EXISTS C${centerID}_RFID_TAG(Tag_ID VARCHAR(10) PRIMARY KEY, Employee_ID VARCHAR(12) NOT NULL, Date DATE NOT NULL, Time TIME NOT NULL, In_Store BOOLEAN DEFAULT true, FOREIGN KEY (Employee_ID) REFERENCES EMPLOYEE (NIC) ON UPDATE CASCADE)`
	}

// creat table C${centerID}_EMPLOYEE
	client.query(dynamic_tables.employee, (err, results) => {
		if (err) {
			// console.log(`Could not create table "C${centerID}_EMPLOYEE" because of ${err.code}`)
			return callback(err)
		}
	  console.log(`Table "C${centerID}_EMPLOYEE" is created`)
  })

// creat table C${centerID}_GAMING_NODE
	client.query(dynamic_tables.gamingNode, (err, results) => {
		if (err) {
			// console.log(`Could not create table "C${centerID}_GAMING_NODE" because of ${err.code}`)
			return callback(err)
		}
		console.log(`Table "C${centerID}_GAMING_NODE" is created`)
	})

// creat table C${centerID}_CUSTOMER
client.query(dynamic_tables.customer, (err, results) => {
	if (err) {
		// console.log(`Could not create table "C${centerID}_CUSTOMER" because of ${err.code}`)
		return callback(err)
	}
  console.log(`Table "C${centerID}_CUSTOMER" is created`)
})

// creat table C${centerID}_GAMING_LOG
client.query(dynamic_tables.gamingLog, (err, results) => {
	if (err) {
		// console.log(`Could not create table "C${centerID}_GAMING_LOG" because of ${err.code}`)
		return callback(err)
	}
  console.log(`Table "C${centerID}_GAMING_LOG" is created`)
})
}

// We will use this to execute the sql queries 
exports.sendQuery = async (sql, callback) => {
	client.query(sql, (err, results) => {
	  	if (err) {
	  		callback(err, null);
	  	} else {
	  		callback(null, results)
	  	}
	})
}
