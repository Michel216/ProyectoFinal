const bcryptjs = require('bcryptjs');
// const Instructor = require('../models/instructor');


const comparePassword = (password, hash) => {
    return bcryptjs.compareSync(password, hash);
}


module.exports = {
    comparePassword
}