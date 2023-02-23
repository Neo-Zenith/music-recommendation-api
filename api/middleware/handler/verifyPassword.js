require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = async function verifyPassword(password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
};
