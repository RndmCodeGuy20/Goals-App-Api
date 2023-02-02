const bcrypt = require('bcryptjs');

async function checkHash(dbPass, userPass) {
    return await bcrypt.compare(dbPass, userPass);
}

module.exports = {checkHash}
