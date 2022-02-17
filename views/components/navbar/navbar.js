/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"
import css from './navbar.module.css'
import axios from 'axios'

export default function Navbar() {
	const { data, status } = useSession()
  const router = useRouter()

  async function logOut() {
    await axios.delete('/api/logout')
    router.reload(window.location.pathname)
  }

	return(
		<nav
			className={css.navWrapper}
		>
			<div className={css.navContainer}>
				<div className={css.logoContainer}>
					<img
						className={css.logo}
						alt="logo" 
						src="https://res.cloudinary.com/dzpphtqox/image/upload/v1644996339/Scholar%20Vote/logo_w6drip.png"
					/>
					<Link passHref href="/">
						<h5 className={css.logoTitle}>Scholar Vote</h5>
					</Link>
				</div>
				<div className={css.menuContainer}>
					<Link passHref href="/history">
						<a>Vote History</a>
					</Link>
					<Link passHref href="/vote">
						<a>Cast a Vote</a>
					</Link>
					{status !== 'loading' &&
						<>
							{status === 'authenticated'?
								<a onClick={() => { logOut() }}>Logout</a>
							:
								<Link passHref href="/login">
									<a>Signin</a>
								</Link>
							}
						</>
					}
				</div>
			</div>
		</nav>
	)
}