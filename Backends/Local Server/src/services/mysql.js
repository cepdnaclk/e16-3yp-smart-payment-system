'use strict'

const config = require('../config')
const mysql = require('mysql')
//const mysql2 = require('mysql')

const client = mysql.createConnection({
	host : config.db.host,
	user : config.db.user,
	password : config.db.password,
	multipleStatements : true,
	insecureAuth : true
})

const sql = {
	database: {
		create: 'CREATE DATABASE IF NOT EXISTS Smart_Payment_System;',
		use: 'USE Smart_Payment_System;'
	},
	test_database: {
		create: 'CREATE DATABASE IF NOT EXISTS Test_Smart_Payment_System;',
		use: 'USE Test_Smart_Payment_System;'
	},
	tables: {
		employee:'CREATE TABLE IF NOT EXISTS EMPLOYEE(NIC VARCHAR(12) PRIMARY KEY, FName VARCHAR(30) NOT NULL, LName VARCHAR(30) NOT NULL, Email VARCHAR(60) UNIQUE NOT NULL, Password VARCHAR(128) NOT NULL, Activation_Key CHAR(36) NOT NULL, Status BOOLEAN DEFAULT false,Role VARCHAR(36) NOT NULL)',
		rfidCard:'CREATE TABLE IF NOT EXISTS RFID_Card(CardId VARCHAR(20) PRIMARY KEY, EmployeeId VARCHAR(12) , CustomerName VARCHAR(25), Date DATE , Time TIME , IsIssued BOOLEAN DEFAULT false, Amount DOUBLE, FOREIGN KEY (EmployeeId) REFERENCES EMPLOYEE (NIC) ON UPDATE CASCADE)',
		// The format of Gaming Node Id: S_xx_N_xx (here xx is a hexadecimal value)
		gamingNode:'CREATE TABLE IF NOT EXISTS GAMING_NODE(NodeId CHAR(9) PRIMARY KEY, Price DOUBLE NOT NULL, Status BOOLEAN DEFAULT true)',
		gamingLog:'CREATE TABLE IF NOT EXISTS GAMING_LOG(LogId INT PRIMARY KEY AUTO_INCREMENT, NodeId CHAR(9),CardId VARCHAR(12), Date DATE, Time TIME, FOREIGN KEY (NodeId) REFERENCES GAMING_NODE (NodeId) ON UPDATE CASCADE, FOREIGN KEY (CardId) REFERENCES RFID_Card (CardId) ON UPDATE CASCADE)',
		issueLog:'CREATE TABLE IF NOT EXISTS ISSUE_LOG(LogId INT PRIMARY KEY AUTO_INCREMENT,NIC VARCHAR(12),CardId VARCHAR(10),CustomerName VARCHAR(30),DepositAmount DOUBLE,Date DATE , Time TIME , FOREIGN KEY (CardId) REFERENCES RFID_Card(CardId) ON UPDATE CASCADE, FOREIGN KEY (NIC) REFERENCES EMPLOYEE (NIC) ON UPDATE CASCADE)'
	}
}

exports.disconnect = async ()=>{
	client.end((err)=>{
		console.log(err)
	})
}

// This will execute this with a promise to await until the queries return.
// So the system awaits untill the database creation is completed
exports.connect = async () => {

// setting up the database connection
	client.connect((err) => {
		if (err) {
			console.log(`Could not connect to Mysql because of ${err.code}`)
			process.exit(1)
		}
		// else
		// 	console.log('Mysql Connection is set.Waiting for DB configurations...')
	})

// Check whether the database is already exists. If not create it
    //(config.env === 'test' ? sql.database.create : sql.test_database.create)
	client.query((config.env === 'dev' ? sql.database.create : sql.test_database.create), (err, results) => {
		
	  	if (err) {
	  		console.log(`Could not connect Database "Key_Management_System" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('DB Created')
	})

// Use created database
	client.query((config.env === 'dev' ? sql.database.use : sql.test_database.use), (err, results) => {
	  	if (err) {
	  		console.log(`Could not use Database "Key_Management_System" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log(`Use database "Key_Management_System" as the default database for following quries`)
	})

// creat table EMPLOYEE
	client.query(sql.tables.employee, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "EMPLOYEE" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('EMPLOYEE created')
	})

// creat table RFID_Card
	client.query(sql.tables.rfidCard, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "RFID_Card" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('RFID_TAG created')
	})


// creat table GAMING_NODE
	client.query(sql.tables.gamingNode, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "GAMING_NODE" because of ${err.code}`)
			process.exit(1)
	  	}
	  	// else
	  	// 	console.log('GAMING_NODE created')
	})

	// creat table GAMING_NODE
	client.query(sql.tables.issueLog, (err, results) => {
		if (err) {
			console.log(`Could not create table "ISSUE_NODE" because of ${err.code}`)
		  process.exit(1)
		}
		// else
		// 	console.log('GAMING_NODE created')
  })
  

// creat table GAMING_LOG
	client.query(sql.tables.gamingLog, (err, results) => {
	  	if (err) {
	  		console.log(`Could not create table "GAMING_LOG" because of ${err.code}`)
			process.exit(1)
	  	}
	  	else{
			// console.log('GAMING_LOG created')
			console.log("API is ready to use")
		}
		
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

exports.sendQuery2 =  (sql) => {
	try{
		console.log(sql);
		const result = client.query(sql);
		console.log("test3");
		//console.log(result);
	}catch(err){
		console.log(err.message);
	}
	
	
}

