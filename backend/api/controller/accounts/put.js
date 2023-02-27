const {
    isStrongPassword,
    hashPassword,
} = require("../../middleware/authentication");
const Account = require("../../model/Account");

const { generateToken } = require("../../middleware/authorization");

async function put(user, username, password, name) {
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
}

module.exports = put;
