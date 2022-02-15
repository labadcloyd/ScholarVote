
export default function DateInput(props) {
	const { value, setValue, fieldName, placeholder, title } = props

	function handleChange(e) {
		setValue((prevState) => {
			return {...prevState, [fieldName]: e.target.value}
		})
	}

	return (
		<div>
			{title &&
				<span>{title}</span>
			}
			<input type="date" value={value || ''} onChange={handleChange} placeholder={placeholder || ''} />
		</div>
	)
}