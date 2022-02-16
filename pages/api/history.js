import { Vote } from "../../backend/models"

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const id = req.query?.id
		if (id) {
			try {
				const data = await Vote.find({ _id: { $lt: id } }).sort({ _id: -1 }).limit(20)
				return res.status(200).json(data)
			} catch(err) {
				console.error(err)
				return res.status(500).json([{ message: 'An error occured in the server' }])
			}
		}
		try {
			const data = await Vote.find().sort({ _id: -1 }).limit(20)
			return res.status(200).json(data)
		} catch(err) {
			console.error(err)
			return res.status(500).json([{ message: 'An error occured in the server' }])
		}
	}
}