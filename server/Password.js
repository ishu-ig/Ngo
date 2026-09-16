const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
    .is().min(6)
    .is().max(100);

module.exports = schema;
