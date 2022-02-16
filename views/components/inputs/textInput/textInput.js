import css from './textInput.module.css'

export default function TextInput(props) {
	const { value, setValue, fieldName, placeholder, title, description } = props

	function handleChange(e) {
		setValue((prevState) => {
			return {...prevState, [fieldName]: e.target.value}
		})
	}

	return (
		<div className={css.textInputWrapper}>
			{title &&
				<h2>{title}</h2>
			}
			{description &&
				<span>{description}</span>
			}
			<input value={value || ''} onChange={handleChange} placeholder={placeholder || ''} />
		</div>
	)
}