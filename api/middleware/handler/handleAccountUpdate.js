const Account = require("../../model/accounts");

const hashPassword = require("../handler/hashPassword");
const isStrongPassword = require("../handler/isStrongPassword");
const generateToken = require("../../middleware/authentication/auth-generate-token");

module.exports = async function handleAccountUpdate(
    user,
    username,
    password,
    name
) {
    const existingUser = await Account.find({ username: username });
    // 2nd condition ensures we are not checking ourselves
    if (existingUser.length != 0 && user.username != username) {
        return -1;
    }

    if (isStrongPassword(password)) {
        const hashedPassword = await hashPassword(password);
        const query = { id: user.id };
        await Account.findOneAndUpdate(query, {
            name: name,
            username: username,
            password: hashedPassword,
        });
        const token = generateToken(username);
        return token;
    } else {
        return 0;
    }
};
