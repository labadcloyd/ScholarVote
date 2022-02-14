const { hashPassword, verifyPassword } = require('./hash');
const { connectDb } = require('./connectDB');


module.exports = { connectDb, hashPassword, verifyPassword };