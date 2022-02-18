/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { signOut, useSession } from "next-auth/react"
import css from './navbar.module.css'
import { useRef, useState, useEffect } from 'react'

function useOutsideAlerter(ref, setShowOptions) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setShowOptions(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}

export default function Navbar() {
	const { data, status } = useSession()
	const [showMenu, setShowMenu] = useState(false)

	const optionRef = useRef(null)
	useOutsideAlerter(optionRef, setShowMenu)

  async function logOut() {
		await signOut()
  }

	return(
		<nav
			className={css.navWrapper}
			ref={optionRef}
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
								<Link passHref href="/api/auth/signout">
									<a>Log Out</a>
								</Link>
							:
								<Link passHref href="/login">
									<a>Sign In</a>
								</Link>
							}
						</>
					}
				</div>
			</div>
			<div 
				className={css.resHamburger} 
				onClick={() => {setShowMenu(!showMenu)}}
			>
				<span style={{background: showMenu? '#40bff8' : '#616616'}}></span>
				<span style={{background: showMenu? '#40bff8' : '#616616'}}></span>
				<span style={{background: showMenu? '#40bff8' : '#616616'}}></span>
			</div>
			<div
				className={css.resNavContainer} 
				style={{ right: showMenu? '10px' : '-170px'}}
			>
				<div className={css.resMenuContainer}>
					<Link passHref href="/history">
						<a>Vote History</a>
					</Link>
					<Link passHref href="/vote">
						<a>Cast a Vote</a>
					</Link>
					{status !== 'loading' &&
						<>
							{status === 'authenticated'?
								<Link passHref href="/api/auth/signout">
									<a>Log Out</a>
								</Link>
							:
								<Link passHref href="/login">
									<a>Sign In</a>
								</Link>
							}
						</>
					}
				</div>
			</div>
		</nav>
	)
}