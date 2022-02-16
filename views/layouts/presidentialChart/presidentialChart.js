import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { BarChart } from "../../components"
import {
  presidential_choice as presidential_options,
  vice_presidential_choice as vice_presidential_options
} from '../../../constants'

export const initialdata = {
	labels: presidential_options.map((item) => item.label),
	datasets: [
		{
			data: presidential_options.map((item) => 0),
			backgroundColor: presidential_options.map((item) => item.color),
		},
	],
};

export default function PresidentialChart(props) {
  const { data: session, status } = useSession()
	console.log(session)
	const { data } = props
	const [chartData, setChartData] = useState(initialdata)

	useEffect(() => {
		if (data !== null) {
			if (Array.isArray(data)) {
				// adding color to data
				const pressDataWithColors = presidential_options.map((item) => {
					const finalItem = data.find((pres) => {
						if (pres._id === item.label) { return pres }
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

				return setChartData(finalChartData)
			}
		}
	}, [data])
	return (
		<>
			<div>
				{status === 'loading' &&
					<div>Loading...</div>
				}
				{status !== 'loading' &&
					<>
						{session?.voted === false || !session ?
							<div>You must be logged in and cast a vote to view this poll</div>
						:
							<BarChart data={chartData} />
						} 
					</>
				}
			</div>
		</>
	)
}