module.exports = function isStrongPassword(password) {
    if (password.length < 8) {
        return false;
    }

    // Contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Contains at least one digit
    if (!/\d/.test(password)) {
        return false;
    }

    // Contains at least one special character
    if (!/[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?\\~`]/.test(password)) {
        return false;
    }

    return true;
};
