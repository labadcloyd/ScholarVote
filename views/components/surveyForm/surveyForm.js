/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { presidential_choice, vice_presidential_choice } from '../../../constants/surveyFormOptions'
import { TextInput, Select } from '../inputs'
import DateInput from '../inputs/dateInput'
import { useTogglePopup } from "../../../context/uiContext";
import css from './surveyForm.module.css'
import { useRouter } from 'next/router'

export default function SurveyForm(props) {
	const router = useRouter()
	const { data: session } = useSession()
	const togglePopup = useTogglePopup()

	const [isVoteSubmitted, setIsVoteSubmitted] = useState(false)
	const [counter, setCounter] = useState(5)

	const initialFormData = {
		display_name: '',
		presidential_choice: {
			label: '',
			value: ''
		},
		vice_presidential_choice: {
			label: '',
			value: ''
		},
		birthdate: ''
	}

	const [formData, setFormData] = useState(initialFormData)

	async function handleSubmit(e) {
		e.preventDefault()
		if (
				!formData.presidential_choice.value ||
				!formData.presidential_choice.label ||
				!formData.vice_presidential_choice.value ||
				!formData.vice_presidential_choice.label ||
				!formData.birthdate
		){
			return	togglePopup(true, 'error', 'Error: Missing fields')
		}
		try {
			const [email, domain] = session.user.email.split('@')
			if (!formData.display_name) {
				const finalFormData = {
					...formData,
					email_domain: domain,
					display_name: 'Anonymous',
					email: session.user.email,
				}
				await axios.post('/api/vote', finalFormData)
				await axios.get('/api/auth/session', {params: { update: true } } )
				return setIsVoteSubmitted(true)
			}
			const finalFormData = {
				...formData,
				email_domain: domain,
				email: session.user.email
			}
			await axios.post('/api/vote', finalFormData)
			await axios.get('/api/auth/session', {params: { update: true } } )
			return setIsVoteSubmitted(true)
		} catch (err) {
			togglePopup(true, 'error', 'A server error occured')
		}
	}
	async function reloadPage() {
		return router.reload(window.location.pathname)
	}

	useEffect(() => {
		if (isVoteSubmitted === true) {
			setInterval(function () {
				if (counter > 0) {
					setCounter((prevState) => prevState -= 1)
				} if (counter < 1) {
					return
				}
			}, 1000)
		}
	}, [isVoteSubmitted])

	useEffect(() => {
		if(counter === 0) {
			reloadPage()
		}
	}, [counter])

  return (
		<>
			{!isVoteSubmitted &&
				<form onSubmit={handleSubmit}>
					<div className={css.formContainer}>
						<TextInput
							value={formData.display_name}
							title={'Display Name'}
							description={'The display name will be publicly displayed in the vote history page. You may leave this empty.'}
							setValue={setFormData}
							fieldName={'display_name'}
							placeholder={'Display Name'}
						/>
						<Select
							value={formData.presidential_choice}
							setValue={setFormData}
							title={'Presidential Choice'}
							options={presidential_choice}
							fieldName={'presidential_choice'}
							placeholder={'Presidential Choice'}
						/>
						<Select
							value={formData.vice_presidential_choice}
							setValue={setFormData}
							title={'Vice-Presidential Choice'}
							options={vice_presidential_choice}
							fieldName={'vice_presidential_choice'}
							placeholder={'Vice-Presidential Choice'}
						/>
						<DateInput
							value={formData.birthdate}
							title={'Birthdate'}
							setValue={setFormData}
							options={vice_presidential_choice}
							fieldName={'birthdate'}
							placeholder={'Birthdate'}
						/>
						<span>Once this vote is submitted you will no longer be able to change it. This vote will also be publicly displayed in the vote history page.</span>
						<button>Submit</button>
					</div>
				</form>
			}
			{isVoteSubmitted &&
				<div className={css.formContainer}>
					<h4>Vote Has Been Submitted!</h4>
					<p>Please refresh the page or will automatically refresh the page in {counter}</p>
				</div>
			}
		</>
  )
}
