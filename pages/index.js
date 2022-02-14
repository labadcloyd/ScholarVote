import Head from 'next/head'
import Image from 'next/image'
import { useSession } from "next-auth/react"
import Link from 'next/link'

export default function Home() {
  const { data, status } = useSession()
  
  return (
    <div>
      <Head>
        <title>My Student Vote</title>
        <meta name="description" content="Student votes for the 2022 Philippine Elections" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Polls by Verified Filipino Students</h1>
        <p>Browse through polls that were answered by verified students accross thousands of schools in the Philippines</p>
        <div>
          <Link passHref href="/vote">
            <button>
              Cast a Vote
            </button>
          </Link>
          <button>View Active Polls</button>
        </div>
      </div>

      <div>
        <h2>Presidential bets for 2022 elections</h2>
        <p>This poll will continue receving votes until May 8, 2022</p>
      </div>

      <div>
        <h2>Vice-Presidential bets for 2022 elections</h2>
        <p>This poll will continue receving votes until May 8, 2022</p>
      </div>

      <div>
        <p>
          All votes are 100% casted by verified students. Users are not allowed to cast a vote unless they are verified through their school email with a domain ending in &rdquo;edu.ph&rdquo;.
        </p>
      </div>
    </div>
  )
}
