// TIME IN FILE NAMING //

/**
 * Retrieves and formats the current time and date for file naming when code is executed on the server side
 */
export function getNamingTime() {
    let dateObj = new Date(Date.now());
    return `${dateObj.getMonth()}-${dateObj.getDay()}-${dateObj.getFullYear()}_${dateObj.getHours()}-${dateObj.getSeconds()}-${dateObj.getMilliseconds()}`;
}