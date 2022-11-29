
export const DDMMYYYY = "DD/MM/YYYY" 

export function getTodayDate(format){

    const date = new Date()

    //current days
    let days = ("0" + date.getDate()).slice(-2);

    // current month
    let month = ("0" + (date.getMonth() + 1)).slice(-2);

    // current year
    let year = date.getFullYear();

    // current hours
    let hours = date.getHours();

    // current minutes
    let minutes = date.getMinutes();

    // current seconds
    let seconds = date.getSeconds();

    if(format == DDMMYYYY)
        return days + '-' + month + '-' + year
}

export function getNumberOfPages(count,pageSize){    

    count /= pageSize    
    
    //Decimal
    if(!(count % 1 == 0))
        count = Math.trunc(count) + 1
    
    return count
}