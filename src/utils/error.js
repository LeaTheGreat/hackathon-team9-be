const errors = {
    missingParams: { error: "missing params in the request body" },
    emailExist: { error: "email already exists" },
    incorrectLoginParams: { error: 'email or password is incorrect' },
    incorrectID: { error: "ID doesn't exist" }
}

module.exports = errors;