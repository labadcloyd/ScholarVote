import { useRouter } from 'next/router'
import { getProviders, signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useEffect } from 'react'

export default function Login({ providers }) {
  const { data, status } = useSession()
	const router = useRouter()

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

  return (
		<div>
			{status === 'unauthenticated' &&
				<>
					<h1>LOGIN OR SIGNUP</h1>
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<button onClick={() => signIn(provider.id)}>
								Signin or Signup with {provider.name}
							</button>
						</div>
					))}
				</>
			}
			{status === 'loading' && 
				<div>
					<h1>Loading...</h1>
				</div>
			}
		</div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}