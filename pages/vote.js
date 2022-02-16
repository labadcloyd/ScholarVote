import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { SurveyForm } from '../views/components'

import css from '../styles/vote.module.css'

export default function Vote(props) {
	const { data, status } = useSession()

	const router = useRouter()
	const [hasVoted, setHasVoted] = useState(null)

	async function fetchUser(email) {
		const foundUser = await axios.get('/api/user', { params: { email: email } })
		setHasVoted(false)
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
		<div className={css.pageWrapper}>
			{ (status === 'authenticated' && hasVoted === true) &&
				<div className={css.pageContainer}>
					<div className={css.formContainer}>
						<h1>You are only allowed to vote once</h1>
					</div>
				</div>
			}
			{ (status === 'authenticated' && hasVoted === false) &&
				<>
					<div className={css.pageContainer}>
						<div className={css.formContainer}>
							<h1>2022 Philippine Elections Poll</h1>
							<SurveyForm session={data} />
						</div>
					</div>
				</>
			}
			{ (status === 'loading' || hasVoted === null) &&
				<div className={css.pageContainer}>
					<div className={css.formContainer}>
						<h1>Loading...</h1>
					</div>
				</div>
			}

		</div>
  )
}
