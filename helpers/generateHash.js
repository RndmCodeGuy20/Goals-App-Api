const bcrypt = require('bcryptjs');

async function generateHash(password) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    return await bcrypt.hash(password, salt);
}

module.exports = {generateHash}
