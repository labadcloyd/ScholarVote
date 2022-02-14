import { Vote } from '../../backend/models'

export default function handler(req, res) {
  if (req.method === 'POST') {
		console.log(req.body)
	}
}
