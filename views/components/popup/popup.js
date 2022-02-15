import { useEffect } from "react";
import {
	useAuthContext,
  usePopupState,
  useTogglePopup
} from "../../../context/uiContext";

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
				<div style={{ 
					height: '100vh', 
					width: '100vw',
					position: 'fixed',
					top: '0',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
					<h1>
						{popup.message || ''}
					</h1>
				</div>
			}
		</>
	)
}