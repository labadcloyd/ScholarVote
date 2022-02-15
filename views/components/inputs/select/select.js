
export default function Select(props) {
	const { value: { value, label }, setValue, fieldName, options, placeholder, title } = props

	function handleClick({value, label}) {
		setValue((prevState) => {
			return {...prevState, [fieldName]: { value, label }}
		})
	}

	return (
		<div>
			{title &&
				<span>{title}</span>
			}
			<div>
				<div>{!!label? label : placeholder }</div>
				<div>
					{options.map(({ value: val, label: lab}, i) => {
						return (
							<div key={val} onClick={() => { handleClick({ value: val, label: lab }) }}>
								{lab}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}