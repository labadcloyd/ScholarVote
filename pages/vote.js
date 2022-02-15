import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { SurveyForm } from '../components'
import axios from 'axios'

export default function Vote(props) {
  const { data, status } = useSession()
	const router = useRouter()
	const [hasVoted, setHasVoted] = useState(null)

	async function fetchUser(email) {
		const foundUser = await axios.get('/api/user', { params: { email: email } })

		if (foundUser?.data?.voted === false) {
			setHasVoted(false)
		} else {
			setHasVoted(true)
		}
	}

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/login')
		}
		if (status === 'authenticated') {
			fetchUser(data.user.email)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

  return (
		<div>
			{ (status === 'authenticated' && hasVoted === true) &&
				<>
					<h1>You are only allowed to vote once</h1>
				</>
			}
			{ (status === 'authenticated' && hasVoted === false) &&
				<>
					<div>
						<h1>Answer Poll</h1>
						<SurveyForm session={data} />
					</div>
				</>
			}
			{ (status === 'loading' || hasVoted === null) &&
				<>
					<h1>Loading...</h1>
				</>
			}

		</div>
  )
}
