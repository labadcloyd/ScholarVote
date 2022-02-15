import { User } from '../../backend/models'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
	if (!session) {
		return res.status(401).json([{ message: 'Error: Unauthenticated request' }])
	}
	if (req.method === 'GET') {
		if (!req?.query?.email) {
			return res.status(400).json([{ message: 'Error: invalid parameters' }])
		}
		const foundUser = await User.findOne({ email: req.query.email})

		if (foundUser) {
			return res.status(200).json(foundUser)
		} else {
			return res.status(400).json([{ message: 'Error: no user found' }])
		}
	}
}