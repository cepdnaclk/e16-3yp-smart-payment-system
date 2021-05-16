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
        console.log(result)
        callback(null)
      }
    })
  }
}

exports.cardIssueing = async (card, callback) => {
  if (card) {
    // sql query to register a user
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    console.log(card)
    const sql_issue_card = `UPDATE RFID_Card SET IsIssued = ${card.is_issued}, Amount = ${card.amount}, CustomerName = '${card.customer_name}',SecurityTag = '${card.tag}' ,EmployeeId  = '${card.employee_id}',date = '${year + "-" + month + "-" + date}',time = '${hours + ":" + minutes + ":" + seconds}' WHERE CardId =  '${card.card_id}';`
    
    // executing the query
    await client.sendQuery(sql_issue_card, (err, result) => {
      console.log("test 1")
      if(err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
				callback(err.code)
      } else {
        if (result.affectedRows > 0) {
					console.log(`Key_ID '${card.card_id}' successfully updated!`)
					callback(null)
				}
				else {
					callback(Error("ZERO_ROWS_AFFECTED"))
				}
      }
    })
  }
}

exports.addtoIssuelog = async(details,callback)=>{
  if(details){
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const sql_addtoissuelog = `INSERT INTO ISSUE_LOG(CardId, NIC, CustomerName, DepositAmount,Date,time) VALUES ('${details.card_id}','${details.employee_id}','${details.customer_name}','${details.amount}','${year + "-" + month + "-" + date}','${hours + ":" + minutes + ":" + seconds}');`
    await client.sendQuery(sql_addtoissuelog, (err, result) => {
      if(err) {
        
        console.error(`SQLQueryError : ${err.sqlMessage}`)
        callback(err.code)
      } else {
        callback(null)
      }
    })

  }
}

exports.cardState = async (card,callback)=>{
  try{
    if(card){
      //const sql_issue_card = `UPDATE RFID_Card SET IsIssued = ${card.is_issued}, Amount = ${card.amount}, CustomerName = '${card.customer_name}', EmployeeId  = '${card.employee_id}' WHERE CardId =  '${card.card_id}';`
      const sql_isissued = `SELECT IsIssued from RFID_Card WHERE CardId =  '${card.card_id}'`
      await client.sendQuery(sql_isissued, (err, result) => {
        if(err) {
          console.error(`SQLQueryError: ${err.sqlMessage}`)
          callback(err.code)
        } else {
          if (result[0]) {
            if(result[0]['IsIssued'] === 1){
              callback(new Error('Card is already issued'));
            }else{
              callback(null);
            }
          
          }
          else {
            callback(Error("ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG CARD_ID"))
          }
        }
         
      })
    }
  }catch(err){
    console.log(err)
  }
  

}

'${client.sendQuery(sql)}'

exports.cardRecharging = async (card,callback)=>{
  if(card){
    const sql_currentAmount = `SELECT Amount from RFID_Card WHERE CardId =  '${card.card_id}'`
 
    await client.sendQuery(sql_currentAmount, async (err, result) => {
      if(err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
				callback(err.code)
      } else {
        console.log(result.length)
        if(result.length<=0){
      
          callback(Error("ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG CARD_ID"))
        }else{
         
          const current_amount = result[0]['Amount'];
          await client.sendQuery(`UPDATE RFID_Card SET  Amount = '${card.refund_amount}'+'${current_amount}' WHERE CardId =  '${card.card_id}';`, (err, result) => {
            if(err) {
              console.error(`SQLQueryError: ${err.sqlMessage}`)
              callback(err.code)
            } else {
              if (result.affectedRows > 0) {
                console.log(`Key_ID '${card.card_id}' successfully refunded!`)
                callback(null)
              }
              else {
                callback(Error("ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG CARD_ID"))
              }
            }
          })
        }
      
      }
    })
    
  }
}

exports.cardReturning = async (details,callback)=>{
  if(details){
    const sql_cardReturn =  `UPDATE RFID_Card SET IsIssued = false, Amount = null, CustomerName = null, EmployeeId  = null WHERE CardId =  '${details.card_id}';`
    await client.sendQuery(sql_cardReturn,(err,result)=>{
      if(err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
        callback(err.code)
      } else {
        if (result.affectedRows > 0) {
          console.log(`Key_ID '${details.card_id}' successfully returned!`)
          //console.log(result.effectedRows)
					callback(null)
				}
				else {
					callback(Error("ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG CARD_ID"))
				}
      }
    })
  }
}


exports.addtolog = async(details,callback)=>{
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    if(details){
      const sql_addtolog = `INSERT INTO GAMING_LOG(CardId, NodeId, Date,time) VALUES ('${details.card_id}','${details.node_id}','${year + "-" + month + "-" + date}','${hours + ":" + minutes + ":" + seconds}');`
      await client.sendQuery(sql_addtolog, (err, result) => {
        if(err) {
          
          console.error(`SQLQueryError : ${err.sqlMessage}`)
          callback(err.code)
        } else {
          callback(null)
        }
      })

    }
}
exports.cardScanning = async (details,callback)=>{
    if(details){
      const sql_findBalance = `SELECT CustomerName,Amount,IsIssued,SecurityTag from RFID_Card WHERE CardId =  '${details.card_id}';`

      await client.sendQuery(sql_findBalance, (err, result) => {
        if(err) {
          console.error(`SQLQueryError: ${err.code}`)
          callback(err)
        } else {
          if (result[0]) {
              if(!result[0]['IsIssued']){
                   callback(Error("UNAUTHORIZED CARD"))
              }else{
                callback(null,result)
              }
            
         
          }
        
          else {
            
            

            callback(Error("ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG CARD_ID"));
          }
        }
      })
      
   }
   
}

exports.cardScanning2 = async (details,callback)=>{
  if(details){
    const sql_findPrice = `SELECT Price from GAMING_NODE WHERE NodeId =  '${details.node_id}';`

    await client.sendQuery(sql_findPrice, (err, result) => {
      if(err) {
        console.error(`SQLQueryError: ${err.code}`)
        callback(err)
      } else {
        if (result[0]) {   
          callback(null,result)
        }
        else {
          callback(Error("ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG NODE_ID"))
        }
      }
    })
    
 }

 
 
}

exports.cardDeleteing = async (details,callback)=>{
  if(details){
    const sql_delete = `DELETE from RFID_Card WHERE CardId =  '${details.card_id}';`

    await client.sendQuery(sql_delete, (err, result) => {
      if(err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
        console.log("test3")
        callback(err)
      } else {
        if (result.affectedRows>0) {
           
          console.log("test1")
          callback(null)

        }
        else {
          console.log("test2")
          callback(Error("ZERO_ROWS_AFFECTED POSSIBLY BECAUSE WRONG CARD_ID"))
        }
      }
    })
    
 }

 
 
}

exports.creatingCurrentBalanace = async (details,callback)=>{
  if(details){
    const sql_currentprice = `UPDATE RFID_Card SET  Amount = ${details.newAmount} WHERE CardId =  '${details.card_id}';`
    console.log("test");
    await client.sendQuery(sql_currentprice, (err, result) => {
      if(err) {
        console.error(`SQLQueryError: ${err.sqlMessage}`)
        callback(err.code)
      } else {
        if (result) {

          callback(null,result)

        }
        else {
         
          callback(null)
        }
      }
    })
    
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

//DELETE FROM table_name WHERE condition;


}