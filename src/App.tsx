import React from 'react'
import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from '@material-ui/core'
import './App.css'
import { useState, useEffect } from 'react'
import api from './api'
import InfoBox from './components/InfoBox'
import Map from './components/Map.jsx'
import Table from './components/Table'
import { sortData } from './utils/sortTableData'
import LineGraph from './components/LineGraph.js'
import 'leaflet/dist/leaflet.css'

interface Country {
	country: string
	continent: string
	countryInfo: { iso2: string }
}

interface CountryInfo {
	cases: number
	total: number
	todayCases: number
	todayDeaths: number
	todayRecovered: number
	recovered: number
	deaths: number
}

function App() {
	const [countries, setCountries] = useState<Array<Country>>([])
	const [country, setCountry] = useState<string>('worldwide')
	const [countryInfo, setCountryInfo] = useState<CountryInfo>()
	const [tableData, setTableData] = useState<any>([])
	const [mapCenter, setMapCenter] = useState<any>({
		lat: 34.80746,
		lng: -40.4796,
	})
	const [mapZoom, setMapZoom] = useState(3)
	const [mapCountries, setMapCountries] = useState<any>([])

	const fetchCountries = async () => {
		const { data } = await api.get('/countries')
		const sortedData = sortData(data)
		setCountries(data)
		setTableData(sortedData)
		setMapCountries(data)
	}

	const onCountryChange = async (e: any) => {
		setCountry(e!.target.value)
	}

	const fetchContryInfo = async () => {
		const url = country === 'worldwide' ? 'all' : `/countries/${country}`
		const { data } = await api.get(url)
		setCountryInfo(data)
		if (!!data.countryInfo?.lat) {
			setMapCenter([data.countryInfo.lat, data.countryInfo.long])
			setMapZoom(4)
		}
	}

	useEffect(() => {
		fetchContryInfo()
	}, [country])

	useEffect(() => {
		fetchCountries()
	}, [])

	if (!countryInfo) return null
	return (
		<div className='App'>
			<div className='app__left'>
				<div className='app__header'>
					<h1>Covid-19 TRACKER</h1>
					<FormControl className='app__dropdown'>
						<Select
							variant='outlined'
							value={country}
							onChange={onCountryChange}
						>
							<MenuItem value='worldwide'>worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem
									key={country.country}
									value={country.countryInfo.iso2}
								>
									{country.country}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className='app__stats'>
					<InfoBox
						title='Coronavirus cases'
						total={countryInfo.cases}
						cases={countryInfo.todayCases}
					/>
					<InfoBox
						title='Recovered'
						total={countryInfo.recovered}
						cases={countryInfo.todayRecovered}
					/>
					<InfoBox
						title='Deaths'
						total={countryInfo.deaths}
						cases={countryInfo.todayDeaths}
					/>
				</div>

				<Map center={mapCenter} zoom={mapZoom} countries={mapCountries} />
			</div>
			<Card className='app__right'>
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					<h3>Worldwide new Cases</h3>
					<LineGraph />
				</CardContent>
			</Card>
		</div>
	)
}

export default App
