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
    try {
      return fetchData()
    } catch(err) {
      togglePopup(true, 'error', 'A server error occured')
    }
  }, [])
  
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
              Disclaimer: All votes were supposed to be 100% casted by verified students. Users were not allowed to cast a vote unless they were verified through their school email with a domain ending in &rdquo;edu.ph&rdquo;. But due to poor marketing, only a hand few students answered the survey. And with that, this site is no longer a legitimate poll but will now only serve as a portfolio project. The data shown above was randomly made and does not represent any verified students&apos; vote. 
            </p>
          </div>
        </div>
      </div>
      <div className={css.footerContainer}>
        <p className={css.footerText}>
          <Link passHref href='/'>
            <span className={css.copyrightText}>
              © Scholar Vote 2022
            </span>
          </Link>
          <Link passHref href='/privacypolicy'>
            <span>
              Privacy Policy
            </span>
          </Link>
          <Link passHref href='/termsandconditions'>
            <span>
              Terms And Conditions
            </span>
          </Link>
          <Link passHref href='mailto:myscholarvote@gmail.com'>
            <span>
              Contact
            </span>
          </Link>
          <span>
            Developed by: 
            <Link href='https://github.com/labadcloyd'> Cloyd Abad</Link>
          </span>
        </p>
      </div>

    </div>
  )
}
