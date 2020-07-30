import React from 'react'
import './Table.css'

interface Props {
	countries: [
		{
			country: string
			cases: number
		}
	]
}

const Table = ({ countries }: Props) => {
	return (
		<div className="table">
			{countries.map(({ country, cases }) => (
				<tr key={country}>
					<td>{country}</td>
					<td>
						<strong>{cases}</strong>
					</td>
				</tr>
			))}
		</div>
	)
}

export default Table
