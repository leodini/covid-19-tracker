import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

interface Props {
	title: string
	cases: number
	total: number
}

const InfoBox: React.FC<Props> = ({ title, total, cases }) => {
	return (
		<Card>
			<CardContent>
				<Typography className='infoBox__title' color='textSecondary'>
					{title}
				</Typography>
				<h2 className='infoBox__cases'>{cases}</h2>
				<Typography className='infoBox__total' color='textSecondary'>
					{total}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default InfoBox
