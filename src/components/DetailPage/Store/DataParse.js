const getImageList = (props) => {
    var imageList = []
    props.map(image => {
        imageList.push(image['url'])
    })
    return imageList
}

const getCamsiteDetail = (props) => {
    const arrCampDetail = {
        title: "Campsite area",
        list: [
            "Bring your own tents",
            `Total CampSites : ${props.totalSites}`,
            `Tent Sites :      ${props.tentOnly}`,
            `RV Sites :        ${props.rvOnly}`
        ]
    }
    console.log("arrCampDetail", arrCampDetail)
    return arrCampDetail
}

const getCampAmenities = (props) => {
    const arrCampAmenities = {
        title: "Aminities",
        list: [
            "Bring your own tents",
            "Picnic table available",
            `foodStorageLockers: ${props.foodStorageLockers}`,
            `laundry :        ${props.laundry}`,
            `potableWater :   ${props.potableWater[0]}`,
            `showers :        ${props.showers[0]}`,
            `toilets :        ${props.toilets[0]}`
        ]

    }
    return arrCampAmenities
}

export { getImageList, getCamsiteDetail, getCampAmenities }

