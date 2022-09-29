const fs = require('fs')
const path = require('path')

async function fileRead() {
    fs.readFile(path.join(__dirname, '../menuData.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        return data;
    })
}

module.exports = { fileRead };