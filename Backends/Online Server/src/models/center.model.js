'use strict'

const client = require('../services/mysql')

exports.registerCenter = async (center, callback) => {
  if (center) {
    // sql query to register a user
    let sql_reg_center = `INSERT INTO CENTER(OWNER_ID, NAME) VALUES ('${center.ownerid}', '${center.name}');`
    
    // executing the query
    await client.sendQuery(sql_reg_center, (err, result) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`Center ${center.name} was successfully registered!`)
        return callback(null)
      }
    })

  } else {
    return callback('CENTER_MUST_BE_PROVIDED')
  }
}

exports.findCenter = async (centerid, callback) => {
    if (centerid) {
      // sql query to find a user
      let sql_findcenter = `SELECT * FROM CENTER WHERE CENTER_ID = ${centerid};`
  
      // executing the query
      await client.sendQuery(sql_findcenter, (err, result) => {
        // sql error happend
        if (err) {
          return callback(err.code, null)
          // Center is found or not 
        } else if (!err && result.length <= 1) {
          return callback(null, result)
          // Multiple center have registered using same centerid
        } else {
          return callback('DUPLICATE_INSTANCES', null)
        }
      })
  
    } else {
      callback('CENTERID_MUST_BE_PROVIDED', null)
    }
}

exports.createCenterTables = async (centerid, callback) => {
    if (centerid) {
      
      // executing the query
      await client.createGamingCenter(centerid, (err) => {
        if(err) {
          return callback(err.code)
        } else {
          // console.log(`Center tables of ${centerid} was successfully created!`)
          return callback(null)
        }
      })
  
    } else {
      return callback('CENTERID_MUST_BE_PROVIDED')
    }
}

exports.changeCenterName = async (center, callback) => {
    if (center) {
      // sql query to change the name of center
      let sql_reg_center_name = `UPDATE CENTER SET NAME = '${center.name}' WHERE CENTER_ID = ${center.id};`
      
      // executing the query
      await client.sendQuery(sql_reg_center_name, (err, result) => {
        if(err) {
          return callback(err.code)
        } else {
          // console.log(`Center Name of ${center.id} was successfully changed!`)
          return callback(null)
        }
      })
  
    } else {
      return callback('CENTER_MUST_BE_PROVIDED')
    }
}

exports.changeCenterActivation = async (center, callback) => {
    if (center) {
      // sql query to change the activation of center
      let sql_reg_center_act = `UPDATE CENTER SET ACTIVATION = ${center.activation} WHERE CENTER_ID = ${center.id};`
      
      // executing the query
      await client.sendQuery(sql_reg_center_act, (err, result) => {
        if(err) {
          return callback(err.code)
        } else {
          // console.log(`Center Activation of ${center.id} was successfully changed!`)
          return callback(null)
        }
      })
  
    } else {
      return callback('CENTER_MUST_BE_PROVIDED')
    }
}