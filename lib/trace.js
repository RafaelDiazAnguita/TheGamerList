import { getTodayDate } from './utils';
import { DDMMYYYY } from './utils';
const fs = require('fs');

export function writeTrace(data){

    const today = getTodayDate(DDMMYYYY)

    fs.appendFile("trace/QueryTrace_" + today + ".txt", data + "\n", function (err) {
        if (err) throw err;        
    }); 
}