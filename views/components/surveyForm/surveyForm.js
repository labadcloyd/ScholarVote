import { useEffect, useState } from 'react'
import { presidential_choice, vice_presidential_choice } from '../../../constants/surveyFormOptions'
import { TextInput, Select } from '../inputs'
import axios from 'axios'

export default function SurveyForm(props) {
	const { session } = props

	const initialFormData = {
		display_name: '',
		presidential_choice: {
			label: '',
			value: ''
		},
		vice_presidential_choice: {
			label: '',
			value: ''
		}
	}

	const [formData, setFormData] = useState(initialFormData)

	async function handleSubmit(e) {
		e.preventDefault()
		if (
				!formData.presidential_choice.value ||
				!formData.presidential_choice.label ||
				!formData.vice_presidential_choice.value ||
				!formData.vice_presidential_choice.label
		){
			return
		}

		const [email, domain] = session.user.email.split('@')

		if (!formData.display_name) {
			const finalFormData = {
				...formData,
				email_domain: domain,
				display_name: 'Anonymous',
				email: session.user.email
			}
			return await axios.post('/api/vote', finalFormData)
		}

		const finalFormData = {
			...formData,
			email_domain: domain,
			email: session.user.email
		}
		return await axios.post('/api/vote', finalFormData)

	}

  return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<h1>Survey Form</h1>
					<div>
						<TextInput
							value={formData.display_name}
							setValue={setFormData}
							fieldName={'display_name'}
							placeholder={'Display Name'}
						/>
					</div>

					<div>
						<Select
							value={formData.presidential_choice}
							setValue={setFormData}
							options={presidential_choice}
							fieldName={'presidential_choice'}
							placeholder={'Presidential Choice'}
						/>
					</div>

					<div>
						<Select
							value={formData.vice_presidential_choice}
							setValue={setFormData}
							options={vice_presidential_choice}
							fieldName={'vice_presidential_choice'}
							placeholder={'Vice-Presidential Choice'}
						/>
					</div>

					<button>Submit</button>
				</div>
			</form>
		</>
  )
}
