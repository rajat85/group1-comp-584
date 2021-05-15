import * as Icon from "@fortawesome/free-solid-svg-icons";

const getImageList = (props) => {
    var imageList = []
    props.map(image => (
        imageList.push(image['url'])
    ))
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

const arrActivites = {
    title: "Activities",
    list: []
}

const dicActivities = {
    Hiking: {
        icon: Icon.faHiking,
        name: "Hiking",
    },
    Fishing: {
        icon: Icon.faFish,
        name: 'Fishing'
    },
    Swimming: {
        icon: Icon.faSwimmer,
        name: 'Swimming'
    },
    Climbing: {
        icon: Icon.faMountain,
        name: 'Climbing'
    },
    Skiing: {
        icon: Icon.faSkiing,
        name: 'Skiing'
    },
    "Horse Trekking": {
        icon: Icon.faHorse,
        name: 'Horse Trekking'
    }

}

const getActivitiesWithImg = (props) => {
    props.map(activity => {
        if (activity.name in dicActivities) {
            arrActivites.list.push(dicActivities[activity.name])
        }
    })
    return arrActivites
}

export { getImageList, getCamsiteDetail, getCampAmenities, getActivitiesWithImg }

