'use strict'

const client = require('../services/mysql')

exports.registerCustomer = async (center, customer, callback) => {
    if (customer && center) {
      // sql query to register a customer
      let sql_reg_customer = `INSERT INTO C${center}_CUSTOMER(Customer_ID, FName, LName, RFID_Tag, Employee_ID, Date, Time, Deposit_Amount) VALUES (${customer.customerid}, '${customer.fname}', '${customer.lname}', '${customer.rfidtag}', '${customer.employeeid}', '${customer.date}', '${customer.time}', ${customer.depositamount});`
      
      // executing the query
      await client.sendQuery(sql_reg_customer, (err) => {
        if(err) {
          return callback(err.code)
        } else {
          // console.log(`Customer ${customer.customerid} was successfully registered!`)
          return callback(null)
        }
      })
  
    } else {
      return callback('CENTER_CUSTOMER_MUST_BE_PROVIDED')
    }
}

