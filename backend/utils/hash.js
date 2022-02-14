const { hash, compare } = require('bcryptjs');

async function hashPassword(password){
	const hashedPassword = await hash(password, 12);
	return hashedPassword
}

async function verifyPassword(plainPassword, hashedPassword){
	const isValid = await compare(plainPassword, hashedPassword);
	return isValid;
}


module.exports = { hashPassword, verifyPassword };