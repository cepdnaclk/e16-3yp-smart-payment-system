'use strict'

const client = require('../services/mysql')

exports.registerGnode = async (center, gnode, callback) => {
  if (gnode && center) {
    // sql query to register a user
    let sql_reg_gnode = `INSERT INTO C${center}_GAMING_NODE(Node_ID, Value, Setup_Date, Name) VALUES (${gnode.nodeid}, ${gnode.value}, '${gnode.setupdate}', '${gnode.name}');`
    
    // executing the query
    await client.sendQuery(sql_reg_gnode, (err) => {
      if(err) {
        return callback(err.code)
      } else {
        // console.log(`Gaming node ${gnode.nodeid} was successfully registered!`)
        return callback(null)
      }
    })

  } else {
    return callback('GNODE_CENTER_MUST_BE_PROVIDED')
  }
}

exports.updateGnodeValue = async (center, gnode, callback) => {
    if (gnode && center) {
      // sql query to register a user
      let sql_upt_gnode = `UPDATE C${center}_GAMING_NODE SET Value = ${gnode.value}, Setup_Date = '${gnode.setupdate}', Name = '${gnode.name}' WHERE Node_ID = ${gnode.nodeid};`
      
      // executing the query
      await client.sendQuery(sql_upt_gnode, (err) => {
        if(err) {
          return callback(err.code)
        } else {
          // console.log(`Gaming node ${gnode.nodeid} was successfully updated!`)
          return callback(null)
        }
      })
  
    } else {
      return callback('GNODE_CENTER_MUST_BE_PROVIDED')
    }
}

exports.getGnodes = async (center, callback) => {
    if (center) {
      // sql query to find a user
      let sql_getgnodes= `SELECT * FROM C${center}_GAMING_NODE;`
  
      // executing the query
      await client.sendQuery(sql_getgnodes, (err, result) => {
        // sql error happend
        if (err) {
          return callback(err.code, null)
          // gaming nodes found 
        } else {
          return callback(null, result)
        }
      })
  
    } else {
      return callback('CENTER_MUST_BE_PROVIDED', null)
    }
  }