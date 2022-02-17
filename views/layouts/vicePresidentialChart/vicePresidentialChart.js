import moment from "moment";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { BarChart } from "../../components"
import {
  vice_presidential_choice as vice_presidential_options
} from '../../../constants'
import css from './vicePresidentialChart.module.css'

export const initialdata = {
	labels: vice_presidential_options.map((item) => item.label),
	datasets: [
		{
			data: vice_presidential_options.map((item) => 0),
			backgroundColor: vice_presidential_options.map((item) => item.color),
		},
	],
};

export default function VicePresidentialChart(props) {
  const { data: session, status } = useSession()

	const { data } = props
	const [chartData, setChartData] = useState(initialdata)
	const [totalVotes, setTotalVotes] = useState(0)

	const currentDate = moment(new Date()).format('h:mma MMMM D, YYYY')

	useEffect(() => {
		if (data !== null) {
			if (Array.isArray(data)) {
				let tempTotalVotes = 0
				// adding color to data
				const pressDataWithColors = vice_presidential_options.map((item) => {
					const finalItem = data.find((pres) => {
						if (pres._id === item.label) {
							tempTotalVotes += (pres?.quantity || 0)
							return pres
						}
					})
					return { ...item, ...finalItem, quantity: (finalItem?.quantity || 0)}
				})
				pressDataWithColors.sort((a, b) => a.quantity > b.quantity ? -1 : 1)

				const finalChartData = {
					labels: pressDataWithColors.map((item) => item.label),
					datasets: [
						{
							data: pressDataWithColors.map((item) => item.quantity),
							backgroundColor: pressDataWithColors.map((item) => item.color),
						},
					],
				}
				setTotalVotes(tempTotalVotes)
				return setChartData(finalChartData)
			}
		}
	}, [data])
	return (
		<>
			<div className={css.componentWrapper}>
				{status === 'loading' &&
					<div className={css.chartWrapper}>
						<div className={css.chartContainer}>
							<div>Loading...</div>
						</div>
					</div>
				}
				{status !== 'loading' &&
					<>
						{session?.voted === false || !session ?
							<div className={css.chartWrapper}>
								<div className={css.chartContainer}>
									You must be logged in and cast a vote to view this poll
								</div>
							</div>
						:
							<div className={css.chartWrapper}>
								<div className={css.chartContainer}>
									<BarChart data={chartData} />
									<p>{`As of ${currentDate}, this poll has collected a total ${totalVotes} votes`} </p>
								</div>
							</div>
						} 
					</>
				}
			</div>
		</>
	)
}