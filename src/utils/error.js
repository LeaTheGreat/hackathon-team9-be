const errors = {
    missingParams: { error: "missing params in the request body" },
    emailExist: { error: "email already exists" },
    incorrectLoginParams: { error: 'email or password is incorrect' },
    incorrectID: { error: "ID doesn't exist" }
}

const errorsArray = (errorObject) => {
    const eArray = [];
    for (field in errorObject.errors) {
       eArray.push(errorObject.errors[field].properties.message);
    }
    return eArray;
}

module.exports = {errors, errorsArray};