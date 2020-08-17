import React from 'react'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'

const casesTypeColors = {
	cases: {
		hex: '#CC1034',
		multiplier: 800,
	},
	recovered: {
		hex: '#7dd71d',
		multiplier: 1200,
	},
	deaths: {
		hex: '#fb4443',
		multiplier: 2000,
	},
}

export const showDataOnMap = (data, casesTypes = 'cases') =>
	data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			color={casesTypeColors[casesTypes].hex}
			fillColor={casesTypeColors[casesTypes].hex}
			radius={
				Math.sqrt(country[casesTypes]) * casesTypeColors[casesTypes].multiplier
			}
		>
			<Popup>
				<h1>
					{numeral(country[casesTypes]).format('0,0')} {casesTypes}
				</h1>
			</Popup>
		</Circle>
	))
