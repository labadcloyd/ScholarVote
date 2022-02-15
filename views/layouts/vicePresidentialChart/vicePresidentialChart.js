import { useEffect, useState } from "react";
import { BarChart } from "../../components"
import {
  vice_presidential_choice as vice_presidential_options
} from '../../../constants'

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
	const { data } = props
	const [chartData, setChartData] = useState(initialdata)

	useEffect(() => {
		if (data !== null) {
			if (Array.isArray(data)) {
				// adding color to data
				const pressDataWithColors = data?.map((item) => {
					const finalItem = vice_presidential_options.find((pres) => {
						if (pres.label === item._id) { return pres }
					})
					return { ...finalItem, quantity: item.quantity}
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
			<BarChart data={chartData} />
		</>
	)
}