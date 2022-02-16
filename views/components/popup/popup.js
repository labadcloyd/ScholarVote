import { useEffect } from "react";
import {
	useAuthContext,
  usePopupState,
  useTogglePopup
} from "../../../context/uiContext";
import css from './popup.module.css'

export default function Popup() {
	const popup = usePopupState()
	const togglePopup = useTogglePopup()
	
	useEffect(() => {
		if (popup.show === true) {
			setTimeout(() => { togglePopup({ show: false, type:'', message:'' }) }, 4000)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popup])
	return (
		<>
			{popup.show === true &&
				<div className={css.popupContainer}>
					<p>
						{popup.message || ''}
					</p>
				</div>
			}
		</>
	)
}