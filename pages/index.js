import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"

import { useTogglePopup } from "../context/uiContext"
import { PresidentialChart } from '../views/layouts'
import VicePresidentialChart from '../views/layouts/vicePresidentialChart'
import css from '../styles/home.module.css'

export default function Home(props) {
  const router = useRouter()
	const togglePopup = useTogglePopup()
  const { session, status } = useSession()

  const [presChoice, setPresChoice] = useState(null)
  const [vPresChoice, setVPresChoice] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  async function fetchData() {
    const presidential_choice = axios.get('/api/vote', { params: { voteChoice: 'presidential_choice' } })
    const vice_presidential_choice = axios.get('/api/vote', { params: { voteChoice: 'vice_presidential_choice' } })
    Promise.all([presidential_choice, vice_presidential_choice]).then((results) => {
      setPresChoice(results[0].data)
      setVPresChoice(results[1].data)
      setIsLoading(false)
    });
  }

  useEffect(() => {
    if (status === 'authenticated') {
      try {
        return fetchData()
      } catch(err) {
        togglePopup(true, 'error', 'A server error occured')
      }
    } if (status === 'unauthenticated') {
      setIsLoading(false)
    }
  }, [status])
  
  return (
    <div className={css.homeWrapper}>
      <Head>
        <title>Scholar Vote</title>
        <meta name="description" content="Student votes for the 2022 Philippine Elections" />
      </Head>

      <div className={css.headerWrapper}>
        <div className={css.headerContainer}>
          <div className={css.headerTitleContainer}>
            <h1>Polls by Verified Filipino Students</h1>
            <p>
              Browse through polls that were answered by verified students from the thousands of schools in the Philippines.
              <span> Current poll is for the 2022 Philippine elections.</span>
            </p>
            <div>
              <Link passHref href="/vote">
                <button>
                  Cast Vote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={css.sectionWrapper}>
        <div className={css.sectionContainer}>
            <span>This poll will continue receving votes until April 25, 2022</span>
            <h2>Presidential bets for the 2022 elections</h2>
            <PresidentialChart loading={isLoading} data={presChoice} />
        </div>
      </div>

      <div className={css.sectionWrapper}>
        <div className={css.sectionContainer}>
            <span>This poll will continue receving votes until April 25, 2022</span>
            <h2>Vice-Presidential bets for the 2022 elections</h2>
            <VicePresidentialChart loading={isLoading} data={vPresChoice} />
        </div>
      </div>
      
      <div className={css.sectionWrapper}>
        <div className={css.sectionContainer}>
          <div className={css.footerTextContainer}>
            <p className={css.footerText}>
              All votes are 100% casted by verified students. Users are not allowed to cast a vote unless they are verified through their school email with a domain ending in &rdquo;edu.ph&rdquo;.
            </p>
          </div>
        </div>
      </div>
      <div className={css.footerContainer}>
        <p className={css.footerText}>
          <div>
            <Link href='/privacypolicy'>Privacy Policy</Link>
            <Link href='/termsandconditions'>Terms And Conditions</Link>
          </div>
          <span>© Scholar Vote 2022</span>
          <div>
            <span>Contact: myscholarvote@gmail.com</span>
            <span>
              Developed by: 
              <Link href='https://github.com/labadcloyd'> Cloyd Abad</Link>
            </span>
          </div>
        </p>
      </div>

    </div>
  )
}
