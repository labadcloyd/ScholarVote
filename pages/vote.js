import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import { useEffect } from 'react'
import { SurveyForm } from '../components'

export default function Vote() {
  const { data, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status !== 'loading' && !data) {
			router.push('/login')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

  return (
		<div>
			{ status !== 'loading' &&
				<div>
					<h1>Answer Poll</h1>
					<SurveyForm session={data} />
				</div>
			}

		</div>
  )
}
