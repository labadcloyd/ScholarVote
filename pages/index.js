import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useTogglePopup } from "../context/uiContext"
import { PresidentialChart } from '../views/layouts'
import VicePresidentialChart from '../views/layouts/vicePresidentialChart'
import css from '../styles/home.module.css'

export default function Home(props) {
  const router = useRouter()
	const togglePopup = useTogglePopup()

  const [presChoice, setPresChoice] = useState(null)
  const [vPresChoice, setVPresChoice] = useState(null)
  
  async function fetchData() {
    const presidential_choice = axios.get('/api/vote', { params: { voteChoice: 'presidential_choice' } })
    const vice_presidential_choice = axios.get('/api/vote', { params: { voteChoice: 'vice_presidential_choice' } })
    Promise.all([presidential_choice, vice_presidential_choice]).then((results) => {
      setPresChoice(results[0].data)
      setVPresChoice(results[1].data)
    });
  }

  useEffect(() => {
    try {
      fetchData()
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
            <PresidentialChart data={presChoice} />
        </div>
      </div>

      <div className={css.sectionWrapper}>
        <div className={css.sectionContainer}>
            <span>This poll will continue receving votes until April 25, 2022</span>
            <h2>Vice-Presidential bets for the 2022 elections</h2>
            <VicePresidentialChart data={vPresChoice} />
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
          <span>© Scholar Vote 2022</span>
          <Link href='/privacypolicy'>Privacy Policy</Link>
          <Link href='/termsandconditions'>Terms And Conditions</Link>
          <span>Contact: myscholarvote@gmail.com </span>
        </p>
      </div>

    </div>
  )
}
