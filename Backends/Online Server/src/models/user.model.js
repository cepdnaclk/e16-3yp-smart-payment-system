'use strict'

const client = require('../services/mysql')

exports.registerOwner = async (user, callback) => {
  if (user) {
    // sql query to register a user
    let sql_reg_owner = `INSERT INTO OWNER(NIC, FName, LName, Email, Password) VALUES ('${user.nic}', '${user.fname}', '${user.lname}', '${user.email}', '${user.password}');`
    
    // executing the query
    await client.sendQuery(sql_reg_owner, (err) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`User ${user.email} was successfully registered!`)
        return callback(null)
      }
    })

  } else {
    return callback('USER_MUST_BE_PROVIDED')
  }
}

exports.registerEmployeeTmp = async (user, callback) => {
  if (user) {
    // sql query to register a user
    let sql_reg_employeetmp = `INSERT INTO EMPLOYEE(Email, CENTER_ID) VALUES ('${user.email}', ${user.centerid});`
    
    // executing the query
    await client.sendQuery(sql_reg_employeetmp, (err) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`User ${user.email} was successfully registered!`)
        return callback(null)
      }
    })

  } else {
    return callback('USER_MUST_BE_PROVIDED')
  }
}

exports.registerEmployee = async (center, user, callback) => {
  if (user && center) {
    // sql query to register a user
    let sql_reg_employee = `INSERT INTO C${center}_EMPLOYEE(NIC, FName, LName, Email, Password, Role) VALUES ('${user.nic}', '${user.fname}', '${user.lname}', '${user.email}', '${user.password}', '${user.role}');`
    
    // executing the query
    await client.sendQuery(sql_reg_employee, (err) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`User ${user.email} was successfully registered!`)
        return callback(null)
      }
    })

  } else {
    return callback('USER_CENTER_MUST_BE_PROVIDED')
  }
}


exports.findOwner = async (email, callback) => {
  if (email) {
    // sql query to find a user
    let sql_findowner = `SELECT * FROM OWNER WHERE Email = '${email}';`

    // executing the query
    await client.sendQuery(sql_findowner, (err, result) => {
      // sql error happend
      if (err) {
        return callback(err.code, null)
        // User is found or not 
      } else if (!err && result.length <= 1) {
        return callback(null, result)
        // Multiple user have registered using same email
      } else {
        return callback('DUPLICATE_INSTANCES', null)
      }
    })

  } else {
    callback('EMAIL_MUST_BE_PROVIDED', null)
  }
}

exports.findEmployeeTmp = async (email, callback) => {
  if (email) {
    // sql query to find a user
    let sql_findemployeetmp = `SELECT * FROM EMPLOYEE WHERE Email = '${email}';`

    // executing the query
    await client.sendQuery(sql_findemployeetmp, (err, result) => {
      // sql error happend
      if (err) {
        return callback(err.code, null)
        // User is found or not 
      } else if (!err && result.length <= 1) {
        return callback(null, result)
        // Multiple user have registered using same email
      } else {
        return callback('DUPLICATE_INSTANCES', null)
      }
    })

  } else {
    callback('EMAIL_MUST_BE_PROVIDED', null)
  }
}

exports.findEmployee = async (center, email, callback) => {
  if (email && center) {
    // sql query to find a user
    let sql_findemployee = `SELECT * FROM C${center}_EMPLOYEE WHERE Email = '${email}';`

    // executing the query
    await client.sendQuery(sql_findemployee, (err, result) => {
      // sql error happend
      if (err) {
        return callback(err.code, null)
        // User is found or not 
      } else if (!err && result.length <= 1) {
        return callback(null, result)
        // Multiple user have registered using same email
      } else {
        return callback('DUPLICATE_INSTANCES', null)
      }
    })

  } else {
    return callback('EMAIL_CENTER_MUST_BE_PROVIDED', null)
  }
}


exports.updateOwnerPassword = async (user, callback) => {
  if (user) {
    // sql query to register a user
    let sql_upt_owner = `UPDATE OWNER SET Password = '${user.password}' WHERE NIC = '${user.nic}';`
    
    // executing the query
    await client.sendQuery(sql_upt_owner, (err) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`Password of ${user.nic} was successfully reset!`)
        return callback(null)
      }
    })

  } else {
    return callback('USER_MUST_BE_PROVIDED')
  }
}

exports.updateEmployeePassword = async (center, user, callback) => {
  if (user && center) {
    // sql query to register a user
    let sql_upt_emp = `UPDATE C${center}_EMPLOYEE SET Password = '${user.password}' WHERE NIC = '${user.nic}';`
    
    // executing the query
    await client.sendQuery(sql_upt_emp, (err) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`Password of ${user.nic} was successfully reset!`)
        return callback(null)
      }
    })

  } else {
    return callback('USER_CENTER_MUST_BE_PROVIDED')
  }
}

exports.updateOwnerRole = async (user, callback) => {
  if (user) {
    // sql query to register a user
    let sql_upt_owner_role = `UPDATE OWNER SET Role = '${user.role}' WHERE NIC = '${user.nic}';`
    
    // executing the query
    await client.sendQuery(sql_upt_owner_role, (err) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`Role of ${user.nic} was successfully changed!`)
        return callback(null)
      }
    })

  } else {
    return callback('USER_MUST_BE_PROVIDED')
  }
}

exports.updateEmployeeRole = async (center, user, callback) => {
  if (user && center) {
    // sql query to register a user
    let sql_upt_emp_role = `UPDATE C${center}_EMPLOYEE SET Role = '${user.role}' WHERE NIC = '${user.nic}';`
    
    // executing the query
    await client.sendQuery(sql_upt_emp_role, (err) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`Role of ${user.nic} was successfully changed!`)
        return callback(null)
      }
    })

  } else {
    return callback('USER_CENTER_MUST_BE_PROVIDED')
  }
}