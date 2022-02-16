import { User, Vote } from '../../backend/models'
import { getSession } from "next-auth/react"
import { decode, encode } from "next-auth/jwt"
const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req, res) {
  if (req.method === 'GET') {
		const { voteChoice } = req.query
		const totalVotes = await Vote.aggregate([
			{
      	$group: { _id: ('$'+voteChoice+'.label'), quantity: {$sum: 1} }
   		}
		])
		if (totalVotes) {
			return res.status(200).json(totalVotes)
		}
	}
  if (req.method === 'POST') {
		const session = await getSession({ req })
		if (!session) {
			return res.status(401).json([{ message: 'Error: Unauthenticated request' }])
		}
		const { display_name, presidential_choice, vice_presidential_choice, email_domain, email, birthdate } = req.body
		if (
			!presidential_choice.value ||
			!presidential_choice.label ||
			!vice_presidential_choice.value ||
			!vice_presidential_choice.label ||
			!email_domain ||
			!email ||
			!birthdate
		) {
			return res.status(400).json([{ message: 'Error: Missing fields' }])
		}
		const foundUser = await User.findOne({ email: email })
		if (foundUser.voted === true) {
			return res.status(400).json([{ message: 'Error: You can only vote once' }])
		}

		function calculateAge(birthday) {
			var ageDifMs = Date.now() - new Date(birthday).getTime();
			var ageDate = new Date(ageDifMs);
			return Math.abs(ageDate.getUTCFullYear() - 1970);
		}

		const newVote = new Vote({
			display_name: display_name || 'Anonymous',
			presidential_choice,
			vice_presidential_choice, 
			email_domain,
			email,
			age: calculateAge(birthdate)
		})
		foundUser.voted = true
		foundUser.age = calculateAge(birthdate)

		// UPDATING SESSION TOKEN
		const cookieHeader = req.headers.cookie.split(';')
		const foundToken = cookieHeader.find((item) => {
			if (item.includes('next-auth.session-token')) {
				return item
			}
		})
		const token = foundToken.split('=')
		const jwt = await decode({ token: token[1], secret: secret })
		
		jwt.voted = true
		const encodedCookie = await encode({ token: jwt, secret: secret })
		token[1] = encodedCookie
		cookieHeader[cookieHeader.length-1] = token.join('=')

		try {
			await foundUser.save()
			await newVote.save()
			return res.setHeader('Set-Cookie', cookieHeader).status(201).json([{ message: 'Successfully saved vote' }])
		} catch(err){
			if (err) {
				console.log({error: err})
				return res.status(500).json([{ message: 'Error: an error eccored in the server' }])
			}
		}
	}
}
