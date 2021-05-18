import { CContainer, CCol, CRow, CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem } from "@coreui/react";
import React, { useEffect, useState, useSelector, useDispatch } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import "./DetailPage.css";
import Card from './Card/Card'
import SmallCard from './Card/SmallCard/SmallCard'
import DatePicker from './DatePicker/Datepicker'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
// import Swiper core and required modules
import SwiperCore, {
    EffectFade, Navigation, Pagination
} from 'swiper/core';

import { getImageList, getCamsiteDetail, getCampAmenities, getActivitiesWithImg } from './DetailStore/DataParse'

SwiperCore.use([EffectFade, Navigation, Pagination]);

function DetailPage(props) {
    const { id, parkCode } = props.location.state
    const [isLoaded, setIsLoaded] = useState(false)
    const [images, setImages] = useState([]) //for Image
    const [campDetail, setCampDetail] = useState({}) //for all camp details
    const [campSiteArea, setCampSiteArea] = useState({}) //handle the state for camsite Area
    const [campAreaAminities, setCampAreaAminities] = useState({}) //handle the state for camAminities
    const [campAreaActivites, setCampActivities] = useState({})

    const apiUrlForGetCampDetail = `https://developer.nps.gov/api/v1/campgrounds?id=${id}&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs`
    const apiUrlFetchParkActivites = `https://developer.nps.gov/api/v1/activities?parkCode=${parkCode}&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC`

    useEffect(() => {
        fetchData()
    }, [])


    const fetchData = async () => {
        try {
            const getCampDetails = await fetch(apiUrlForGetCampDetail)
            const result = await getCampDetails.json();
            var campSiteData = result["data"][0]
            console.log('result', result)
            setCampDetail(campSiteData)
            setImages(getImageList(campSiteData["images"]))
            setCampSiteArea(getCamsiteDetail(campSiteData["campsites"]))
            setCampAreaAminities(getCampAmenities(campSiteData["amenities"]))
            const getActivities = await fetch(apiUrlFetchParkActivites)
            const activitiesData = await getActivities.json();
            setCampActivities(getActivitiesWithImg(activitiesData['data']))
            setIsLoaded(true)
        } catch (err) {
            alert('Error while fetching data')
        }
    }

    const bookingHandler = (data) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please SignIn to book this site!!!')
            return
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "user_id": user.id,
                "park_code": parkCode,
                "camp_ground_id": id,
                "users_count": data.userCount,
                "start_date": data.startDate,
                "end_date": data.endDate
            })
        };
        fetch('/api/booking', requestOptions)
            .then(response => response.json())
    }

    if (!isLoaded) {
        return <div>Loading....</div>
    } else {
        return (
            <div className="camp_site_content">
                {/* Imagesetup */}
                <Swiper slidesPerView={1} navigation={true} pagination={{
                    "clickable": true
                }} className="mySwiper">
                    {images.map((image, index) => {
                        return <SwiperSlide key={`swiper-${index}`}><img src={image} /></SwiperSlide>;
                    })}
                </Swiper>
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
                            <DatePicker fees={campDetail["fees"][0]["cost"]} bookingClick={bookingHandler} />
                        </CCol>
                    </CRow>
                </CContainer>
                <CContainer className="camp_padding">
                    <CRow>
                        <CCol md={8}>
                            <CRow>
                                <CCol>
                                    <Card arrData={campSiteArea} />
                                </CCol>
                                <CCol>
                                    <Card arrData={campAreaAminities} />
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
                                <CCardHeader style={{ fontWeight: "bold" }}>{'Direction and Weather Info'}</CCardHeader>
                                <CCardBody>
                                    <CRow>
                                        <CCol>
                                            <CListGroup flush className="camp_list_bg" style={{ padding: 10 }}>
                                                <CListGroupItem className="listItem">
                                                    {<FontAwesomeIcon pull="left" icon={Icon.faDirections} />}
                                                    {campDetail["directionsOverview"]}
                                                </CListGroupItem>
                                                <CListGroupItem className="listItem">
                                                    {<FontAwesomeIcon pull="left" icon={Icon.faCloudSun} />}
                                                    {campDetail["weatherOverview"]}
                                                </CListGroupItem>
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
                                    <CRow><p className="camp_text">Address:</p>{campDetail["addresses"].length != 0 ? campDetail["addresses"][0]["line1"] : 'No Information'}</CRow>
                                    <CRow><p className="camp_text">City:</p>{campDetail["addresses"].length != 0 ? campDetail["addresses"][0]["city"] : 'No Information'}</CRow>
                                    <CRow><p className="camp_text">State:</p>{campDetail["addresses"].length != 0 ? campDetail["addresses"][0]["stateCode"] : 'No Information'}</CRow>
                                </CCol>
                                <CCol>
                                    <CRow><p className="camp_text">Phone Number:</p>{campDetail["contacts"]["phoneNumbers"].length != 0 ? campDetail["contacts"]["phoneNumbers"][0]["phoneNumber"] : 'No Information'}</CRow>
                                    <CRow><p className="camp_text">Email:</p>{campDetail["contacts"]["emailAddresses"].length != 0 ? campDetail["contacts"]["emailAddresses"][0]["emailAddress"] : 'No Information'}</CRow>
                                    <CRow><p className="camp_text">Accepts bookings:</p>3 months out</CRow>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CContainer>
                <SmallCard arrActivities={campAreaActivites} key='campAct' />
            </div>
        );
    }
};

export default DetailPage
