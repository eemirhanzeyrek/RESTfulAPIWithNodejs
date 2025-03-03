const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    //console.log(`${new Date().toUTCString()} - ${req.method} - ${req.hostname}`);
    const logs = `${new Date().toUTCString()} - ${req.method} - ${req.hostname}\n`;
    const logFolderPath = path.join(__dirname, 'logs.txt');
    fs.appendFile(logFolderPath, logs, (err) => {
        if(err) {
            console.error('Error writing to log file.', err);
        }
    });
    next();
};