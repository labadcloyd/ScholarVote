import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import css from '../styles/history.module.css'

export default function History() {
	const [historyData, setHistoryData] = useState(null)
	const [loadingFetchData, setLoadingFetchData] = useState(false)
	const [reachedBottom, setReachedBottom] = useState(false)

	const divRef = useRef()

	async function fetchData(id) {
		setLoadingFetchData(true)
		try {
			const { data } = await axios.get('/api/history', { params: { id: (id || '') } })
			if (Array.isArray(data)) {
				if (historyData !== null) {
					if (data.length < 1) {
						return setReachedBottom(true)
					}
					setHistoryData((prevState) => ( [...prevState, ...data] ))
				} else {
					setHistoryData(data)
				}
				return setLoadingFetchData(false)
			}
			setHistoryData([])
			return setLoadingFetchData(false)
		} catch(err) {
			setHistoryData([])
			return setLoadingFetchData(false)
		}
	}
	async function onScroll() {
		if (divRef.current) {
			/* returning if its already fetching */
			if(loadingFetchData || reachedBottom){
				return
			}
			const { scrollTop, scrollHeight, clientHeight } = divRef.current;
			console.log(scrollTop+clientHeight, scrollHeight - 100)
			
			if((scrollTop+clientHeight) > (scrollHeight - 100)){
				const pastScroll = scrollTop
				await fetchData(historyData[historyData.length -1]?._id)

				await divRef.current.scrollTo(0, pastScroll)
			}
		}
	};

	useEffect(() => {
		fetchData()
	}, [])

  return (
		<div className={css.pageWrapper}>
			<div className={css.pageContainer}>
				<div className={css.infiniteScrollContainer} ref={divRef} onScroll={()=> {onScroll()}}>
					<h1>Vote History</h1>
					<div>
						<div>
							{historyData === null?
								<div>Loading...</div>
							:
								<div className={css.cardsWrapper}>
									{historyData.length > 0 && historyData.map((item) => {
										return(
											<div className={css.cardContainer} key={item._id}>
												<h5>Display Name: <span>{item.display_name}</span></h5>
												<h5>Presidential Vote: <span>{item.presidential_choice.label}</span></h5>
												<h5>Vice-Presidential Vote: <span>{item.vice_presidential_choice.label}</span></h5>
												<h6>{moment(item.createdAt).format("HH:mm:ss | MMM-DD-YYYY")}</h6>
											</div>
										)
									})}
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
  )
}