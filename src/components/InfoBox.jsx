import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import numeral from 'numeral'
import './infoBox.css'

const InfoBox = (props) => {
	const { title, total, cases, ...other } = props
	return (
		<Card className='infoBox' {...other}>
			<CardContent>
				<Typography className='infoBox__title' color='textSecondary'>
					{title}
				</Typography>
				<h2 className='infoBox__cases'>{numeral(cases).format('0,0')}</h2>
				<Typography className='infoBox__total' color='textSecondary'>
					{numeral(total).format('0,0')} total
				</Typography>
			</CardContent>
		</Card>
	)
}

export default InfoBox
