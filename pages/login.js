/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from 'next/router'
import { getProviders, signIn } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useEffect } from 'react'

import css from '../styles/login.module.css'

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
		<div className={css.pageWrapper}>
			{status === 'unauthenticated' &&
				<div className={css.pageContainer}>
					<div className={css.cardContainer}>
						<h1>SIGN IN OR SIGN UP</h1>
						<p>
							In order to keep the votes casted as authentic as possible, you are required to use your school email that ends with a domain of &rdquo;edu.ph&rdquo;
						</p>
						{Object.values(providers).map((provider) => (
							<div key={provider.name}>
								<button onClick={() => signIn(provider.id)}>
									<img src='https://res.cloudinary.com/dzpphtqox/image/upload/v1645021309/Scholar%20Vote/178-1783296_g-transparent-circle-google-logo-min_enf1cz.png'/>
									Sign In or Sign Up with {provider.name}
								</button>
							</div>
						))}
					</div>
				</div>
			}
			{status === 'loading' && 
				<div className={css.pageContainer}>
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