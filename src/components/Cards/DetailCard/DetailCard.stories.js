import React, { Children } from 'react'
import DetailCard from './DetailCard'

export default {
    title: 'Cardwrap',
    component: DetailCard,
}


// export const cardWrp = () => <Cardwrap title='Amenities' variant='Light' list={['Water Available','Wifi Available','Bins','Picnic Table']}/>
export const cardWrp = () => <DetailCard/>