import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PresidentialChart } from '../views/layouts'
import VicePresidentialChart from '../views/layouts/vicePresidentialChart'
import { useTogglePopup } from "../context/uiContext";

export default function Home() {
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
    <div>
      <Head>
        <title>Scholar Vote</title>
        <meta name="description" content="Student votes for the 2022 Philippine Elections" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
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

      <div>
        <h2>Presidential bets for the 2022 elections</h2>
        <p>This poll will continue receving votes until April 8, 2022</p>
        <PresidentialChart data={presChoice} />
      </div>

      <div>
        <h2>Vice-Presidential bets for the 2022 elections</h2>
        <p>This poll will continue receving votes until April 8, 2022</p>
        <VicePresidentialChart data={vPresChoice} />
      </div>

      <div>
        <p>
          All votes are 100% casted by verified students. Users are not allowed to cast a vote unless they are verified through their school email with a domain ending in &rdquo;edu.ph&rdquo;.
        </p>
      </div>
    </div>
  )
}
