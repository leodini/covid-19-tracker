import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import api from '../api'

const options = {
	legend: {
		display: false,
	},
	elements: {
		point: {
			radius: 0,
		},
	},
	maintainAspectRatio: false,
	tooltips: {
		mode: 'index',
		intersect: false,
		callbacks: {
			label: function (tooltipItem, data) {
				return numeral(tooltipItem.value).format('+0,0')
			},
		},
	},
	scales: {
		xAxes: [
			{
				type: 'time',
				time: {
					format: 'MM/DD/YY',
					tooltipFormat: 'll',
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					callback: function (value, index, values) {
						return numeral(value).format('0a')
					},
				},
			},
		],
	},
}

const LineGraph = ({ casesType = 'cases' }) => {
	const [data, setData] = useState({})

	const buildChartData = (data, casesType = 'cases') => {
		const chartData = []
		let lastDataPoint
		for (let date in data.cases) {
			if (lastDataPoint) {
				const newDataPoint = {
					x: date,
					y: data[casesType][date] - lastDataPoint,
				}
				chartData.push(newDataPoint)
			}
			lastDataPoint = data['cases'][date]
		}
		return chartData
	}

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await api.get('/historical/all?lastdays=120')
			const chartData = buildChartData(data)
			console.log(chartData)
			setData(chartData)
		}
		fetchData()
	}, [casesType])

	return (
		<div>
			{data?.length > 0 && (
				<Line
					data={{
						datasets: [
							{
								data,
								backgroundColor: 'rgba(204, 16, 52, 0.9)',
								borderColor: '#cc1034',
							},
						],
					}}
					options={options}
				/>
			)}
		</div>
	)
}

export default LineGraph
