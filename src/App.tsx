import React from 'react'
import { MenuItem, FormControl, Select } from '@material-ui/core'
import './App.css'
import { useState, useEffect } from 'react'
import api from './api'

interface Country {
	country: string
	continent: string
	countryInfo: { iso2: string }
}

function App() {
	const [countries, setCountries] = useState<Array<Country>>([])
	const [country, setCountry] = useState('worldwide')

	const fetchCountries = async () => {
		const { data } = await api.get('/countries')
		setCountries(data)
	}

	const onCountryChange = (e: any) => {
		setCountry(e!.target.value)
	}

	useEffect(() => {
		fetchCountries()
	}, [])

	return (
		<div className="App">
			<div className="app__header">
				<h1>Covid-19 TRACKER</h1>
				<FormControl className="app__dropdown">
					<Select variant="outlined" value={country} onChange={onCountryChange}>
						<MenuItem value="worldwide">worldwide</MenuItem>
						{countries.map(country => (
							<MenuItem key={country.country} value={country.countryInfo.iso2}>
								{country.country}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			{/* header */}
			{/* title + select input dropdown field */}
			{/* info box */}
			{/* info box */}
			{/* info box */}
			{/* table */}
			{/* graph */}
			{/* map */}
		</div>
	)
}

export default App
