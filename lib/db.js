const mysql = require('mysql2/promise')
import {writeTrace} from './trace'


let connection;

async function getConnection(){

    if(!connection){        
        try{
            writeTrace("Creating connection...")
            connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS
              });  
        }
        catch (e){            
            writeTrace("Error creating connection: " + e)
            throw e;
        }          
        
        if(!connection)
        throw "Error";
    }  
}

export async function select(pFields,pTables,pWhere,pOrder,pLimit){        
    
    await getConnection()

    const where = [...pWhere]
    
    if(pFields.length == 0)
        throw "Empty fields in select query"
    if(pTables.length == 0)
        throw "Empty tables in select query"

    let query = "SELECT " + pFields.join() + " FROM " + pTables.join()    

    if(where.length > 0){
        query += " WHERE " + where[0]
        where.shift()
    }
    where.map( sentence => query += " and " + sentence)        
        
    
    if(pOrder.length > 0)
        query += " ORDER BY " + pOrder.join()

    if(pLimit.length > 0)
        query += " LIMIT " + pLimit.join()      
    
    //Save to trace
    writeTrace(query)

    let results = null
    try{     
        results = await connection.query(query); 
    }
    catch(e){
        if(e.toString().includes("Can't add new command when connection is in closed state")){
            connection = null
            select(pFields,pTables,where,pOrder,pLimit)   
        }    
            
        else
            writeTrace("ERROR: " + e)
    }                            

    return results[0];
}
