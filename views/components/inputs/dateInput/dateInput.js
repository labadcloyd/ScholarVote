import css from './dateInput.module.css'

export default function DateInput(props) {
	const { value, setValue, fieldName, placeholder, title } = props

	function handleChange(e) {
		setValue((prevState) => {
			return {...prevState, [fieldName]: e.target.value}
		})
	}

	return (
		<div className={css.DateInputWrapper}>
			{title &&
				<h2>{title}</h2>
			}
			<input type="date" value={value || ''} onChange={handleChange} placeholder={placeholder || ''} />
		</div>
	)
}