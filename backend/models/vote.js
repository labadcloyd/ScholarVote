const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
	presidential_choice: {
		label: {
			type: String,
			required: true
		},
		value: {
			type: String,
			required: true
		}
	},
	vice_presidential_choice: {
		label: {
			type: String,
			required: true
		},
		value: {
			type: String,
			required: true
		}
	},
	display_name: {
		type: String,
	},
	email_domain: {
		type: String,
		min: 1,
		required: true,
	},
	email: {
		type: String,
		min: 1,
		required: true,
	}
}, {
    timestamps: true
})
// ! it is very important to structure the model like this as Nextjs has a bug that creates the models again every render if the model is not done like this
const Vote = mongoose.models.Vote || mongoose.model('Vote', voteSchema )

module.exports = { Vote }