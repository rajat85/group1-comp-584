import { CContainer, CCol, CRow, CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import "./DetailPage.css";
import Card from './Card/Card'
import SmallCard from './Card/SmallCard/SmallCard'
import ImageSlider from './ImageSlider/ImageSlider'
import DatePicker from './DatePicker/Datepicker'
import { useSelector, useDispatch } from 'react-redux';


import { getImageList, getCamsiteDetail, getCampAmenities } from './Store/DataParse'


const arrActivites = {
    title: "Activities",
    list: [
        {
            icon: Icon.faHiking,
            name: "Hiking",
        },
        {
            icon: Icon.faHorse,
            name: "Horseback riding",
        },
        {
            icon: Icon.faBiking,
            name: "Off-roading (OHV)",
        },
        {
            icon: Icon.faMountain,
            name: "Climbing",
        },
        {
            icon: Icon.faBiking,
            name: "Biking",
        },
    ],
}

const arrCampDetail = {
    title: "Camping details",
    list: [
        {
            icon: Icon.faLightbulb,
            name: "No electrical hookup",
        },
        {
            icon: Icon.faFaucet,
            name: "No water hookup",
        },
        {
            icon: Icon.faToilet,
            name: "No sewage hookup",
        },
        {
            icon: Icon.faTv,
            name: "No TV hookup",
        },
        {
            icon: Icon.faShower,
            name: "Generators not allowed",
        },
        {
            icon: Icon.faRulerHorizontal,
            name: "Max length 30ft",
        }
    ]
}



const secondColumnStart = Math.ceil(arrCampDetail.list.length / 2);

function DetailPage() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoaded, setIsLoaded] = useState(false)
    const [imgPath, setImgPath] = useState([]) //for Image
    const [campDetail, setCampDetail] = useState({}) //for all camp details
    const [campSiteArea, setCampSiteArea] = useState({}) //handle the state for camsite Area
    const [campAreaAminities, setCampAreaAminities] = useState({}) //handle the state for camAminities

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const request = await fetch('https://developer.nps.gov/api/v1/campgrounds?id=E7CC7363-9C34-42ED-B3F0-769BB39E9400&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs')
            const result = await request.json();
            var campSiteData = result["data"][0]
            setCampDetail(campSiteData)
            setImgPath(getImageList(campSiteData["images"]))
            setCampSiteArea(getCamsiteDetail(campSiteData["campsites"]))
            setCampAreaAminities(getCampAmenities(campSiteData["amenities"]))
            console.log(campSiteArea.list)
            setIsLoaded(true)
        } catch (err) {

        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if (!isLoaded) {
        return <div>Loading....</div>
    } else {
        return (
            <div className="camp_site_content">
                {/* Imagesetup */}
                <ImageSlider image={imgPath[activeStep]} next={handleNext} previous={handleBack} />
                <CContainer>
                    <CRow>
                        <CCol md={8}>
                            {/* Campsite Name */}
                            <CRow>
                                <CCol>
                                    <h1 className="display-5">{campDetail.name}</h1>
                                    <h5>Nearby:Angeles National Forest</h5>
                                </CCol>
                            </CRow>
                            {/* Campsite Description */}
                            <CRow>
                                <CCol className="camp_border">
                                    <p>{campDetail.description}</p>
                                    <p>{campDetail.audioDescription}</p>
                                    <p>{campDetail.reservationInfo}</p>
                                </CCol>
                            </CRow>
                        </CCol>
                        {/* DatePicker for reservation */}
                        <CCol md={4}>
                            <DatePicker fees={campDetail["fees"][0]["cost"]} />
                        </CCol>
                    </CRow>
                </CContainer>
                <CContainer className="camp_padding">
                    <CRow>
                        <CCol md={8}>
                            <CRow>
                                <CCol>
                                    <Card arrData={campSiteArea} key='campArea' />
                                </CCol>
                                <CCol>
                                    <Card arrData={campAreaAminities} key='campAmenities' />
                                </CCol>
                                {/* <CCol>
                                    <Card arrData={campSiteArea} key='camp' />
                                </CCol> */}
                            </CRow>
                        </CCol>
                    </CRow>
                </CContainer>
                <CContainer>
                    <CRow>
                        <CCol md={8}>
                            <CCard color='light'>
                                <CCardHeader style={{ fontWeight: "bold" }}>{arrCampDetail.title}</CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol>
                                            <CListGroup flush className="camp_list_bg">
                                                {arrCampDetail.list.slice(0, secondColumnStart).map((i) => (
                                                    <CListGroupItem className="listItem">
                                                        {<FontAwesomeIcon pull="left" icon={i.icon} />}
                                                        {i.name}
                                                    </CListGroupItem>
                                                ))}
                                            </CListGroup>
                                        </CCol>
                                        <CCol>
                                            <CListGroup flush className="camp_list_bg">
                                                {arrCampDetail.list.slice(secondColumnStart).map((i) => (
                                                    <CListGroupItem className="listItem">
                                                        {<FontAwesomeIcon pull="left" icon={i.icon} />}
                                                        {i.name}
                                                    </CListGroupItem>
                                                ))}
                                            </CListGroup>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
                <CContainer>
                    <CRow>
                        <CCol md={8} className="camp_border">
                            <CRow>
                                <CCol><p className="camp_text">Details</p></CCol>
                                <CCol>
                                    <CRow><p className="camp_text">Check in:</p>After 2PM</CRow>
                                    <CRow><p className="camp_text">Check out:</p>Before 12PM</CRow>
                                    <CRow><p className="camp_text">Cancellation policy:</p>Moderate</CRow>
                                </CCol>
                                <CCol>
                                    <CRow><p className="camp_text">On arrival:</p>Go straight to camp</CRow>
                                    <CRow><p className="camp_text">Minimum nights:</p>1 night</CRow>
                                    <CRow><p className="camp_text">Accepts bookings:</p>3 months out</CRow>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CContainer>
                <SmallCard arrActivities={arrActivites} key='campAct' />
            </div>
        );
    }
};

export default DetailPage
