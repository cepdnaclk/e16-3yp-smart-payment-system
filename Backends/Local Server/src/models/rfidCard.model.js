'use strict'

const client = require('../services/mysql')

exports.cardAdding = async (card, callback) => {
  if (card) {
    // sql query to register a user
    const sql_add_card = `INSERT INTO RFID_Card(CardId) VALUES ('${card.id}');`
    
    // executing the query
    await client.sendQuery(sql_add_card, (err, result) => {
      if(err) {
        if (err.code != "ER_DUP_ENTRY")
          console.error(`SQLQueryError: ${err.sqlMessage}`)
        
        callback(err.code)
      } else {
        // console.log(`User ${user.email} was successfully registered!`)
        callback(null)
      }
    })
  }
}

exports.cardIssueing = async (card, callback) => {
  if (card) {
    // sql query to register a user
    console.log(card)
    const sql_issue_card = `UPDATE RFID_Card SET IsIssued = ${card.is_issued}, Amount = ${card.amount}, CustomerName = '${card.customer_name}', EmployeeId  = '${card.employee_id}' WHERE CardId =  '${card.card_id}';`
    
    // executing the query
    await client.sendQuery(sql_issue_card, (err, result) => {
      if(err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
				callback(err.code)
      } else {
        if (result.affectedRows > 0) {
					console.log(`Key_ID '${card.card_id}' successfully updated!`)
					callback(null)
				}
				else {
					callback("ZERO_ROWS_AFFECTED")
				}
      }
    })
  }
}

exports.cardScanning = async (details)=>{
  try{
    if(details){
      const sql_findBalance = `SELECT CustomerName,Amount from RFID_Card WHERE CardId =  '${details.card_id}';`
      const sql_findPrice = `SELECT Price from GAMING_NODE WHERE NodeId =  '${details.node_id}';`
      console.log("test");
      await client.sendQuery2(sql_findBalance);
      //const price = await client.sendQuery2(sql_findPrice);
      console.log(balanceDetails)
      console.log("test2");

   }

  }catch(err){
    console.log(err.message)
  }
 
   
   
}

exports.findUser = async (email, callback) => {
  if (email) {
    // sql query to find a user
    const sql_find = `SELECT * FROM EMPLOYEE WHERE Email = '${email}';`

   // executing the query
    await client.sendQuery(sql_find, (err, result) => {
      // sql error happend
      if (err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
        callback(err.code, null)
        // If the requested user is there or not 
      } else if (!err && result.length <= 1) {
        callback(null, result)
        // Multiple user have registered using same email
      } else {
        console.error(`Duplicate instance found on user ${email}`)
        callback('Multiple users found', null)
      }
    })
  }
}