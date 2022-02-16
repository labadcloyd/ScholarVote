import { useRef, useState, useEffect } from 'react'
import css from './select.module.css'

function useOutsideAlerter(ref, setShowOptions) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setShowOptions(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}

export default function Select(props) {
	const { value: { value, label }, setValue, fieldName, options, placeholder, title } = props

	const [showOptions, setShowOptions] = useState(false)

	const optionRef = useRef(null)
	useOutsideAlerter(optionRef, setShowOptions)

	function toggleOption() {
		setShowOptions((prevState) => !prevState)
	}

	function handleClick({value, label}) {
		setValue((prevState) => {
			return {...prevState, [fieldName]: { value, label }}
		})
	}

	return (
		<div className={css.selectWrapper}>
			{title &&
				<h2>{title}</h2>
			}
			<div className={css.selectContainer}>
				<div className={css.valueContainer} onClick={toggleOption}>{!!label? label : placeholder }</div>
				{showOptions &&
					<div className={css.optionsContainer} ref={optionRef}>
						{options.map(({ value: val, label: lab}, i) => {
							return (
								<div 
									key={val}
									className={css.optionItem}
									onClick={() => { handleClick({ value: val, label: lab }); setShowOptions(false) }}
								>
									{lab}
								</div>
							)
						})}
					</div>
				}
			</div>
		</div>
	)
}