import { useRouter } from 'next/router'
import { getProviders, signIn } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function Login({ providers }) {
  const { data, status } = useSession()

  return (
		<div>
			<h1>LOGIN OR SIGNUP</h1>
			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button onClick={() => signIn(provider.id)}>
						Signin or Signup with {provider.name}
					</button>
				</div>
			))}
		</div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}