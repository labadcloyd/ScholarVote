import { User, Vote } from '../../backend/models'
import { getSession } from "next-auth/react"

export default async function handler(req, res) {
  const session = await getSession({ req })
	if (!session) {
		return res.status(401).json([{ message: 'Error: Unauthenticated request' }])
	}
  if (req.method === 'POST') {
		const { display_name, presidential_choice, vice_presidential_choice, email_domain, email } = req.body
		if (
			!presidential_choice.value ||
			!presidential_choice.label ||
			!vice_presidential_choice.value ||
			!vice_presidential_choice.label ||
			!email_domain ||
			!email
		) {
			return res.status(400).json([{ message: 'Error: Missing fields' }])
		}
		const foundUser = await User.findOne({ email: email })
		if (foundUser.voted === true) {
			return res.status(400).json([{ message: 'Error: You can only vote once' }])
		}

		const newVote = new Vote({
			display_name: display_name || 'Anonymous',
			presidential_choice,
			vice_presidential_choice, 
			email_domain,
			email
		})
		foundUser.voted = true

		try {
			await foundUser.save()
			await newVote.save()
			return res.status(201).json([{ message: 'Successfully saved vote' }])
		} catch(err){
			if (err) {
				console.error(err)
				return res.status(500).json([{ message: 'Error: an error eccored in the server' }])
			}
		}
	}
}
