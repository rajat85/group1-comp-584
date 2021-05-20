import { CContainer, CCol, CRow, CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem, CAlert } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import "./DetailPage.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import * as QueryString from "query-string"

// import Swiper core and required modules
import SwiperCore, {
    EffectFade,
    Navigation,
    Pagination
} from 'swiper/core';
import { getImageList, getCamsiteDetail, getCampAmenities, getActivitiesWithImg } from './DetailStore/DataParse'
const Loading = React.lazy(() => import('../loading.component'));
const Card = React.lazy(() => import('./Card/Card'));
const SmallCard = React.lazy(() => import('./Card/SmallCard/SmallCard'));
const DatePicker = React.lazy(() => import('./DatePicker/Datepicker'));

SwiperCore.use([EffectFade, Navigation, Pagination]);

const DetailPage = function (props) {
    const parkCode = QueryString.parse(props.location.search).park_code;
    const campgroud_id = props.match.params.id
    const [isLoaded, setIsLoaded] = useState(false);
    const [isBooking, setBookingFlag] = useState();
    const [isSuccessBooking, setSuccessBooking] = useState(false);
    const [images, setImages] = useState([]); //for Image
    const [campDetail, setCampDetail] = useState({}); //for all camp details
    const [campSiteArea, setCampSiteArea] = useState({}); //handle the state for camsite Area
    const [campAreaAminities, setCampAreaAminities] = useState({}); //handle the state for camAminities
    const [campAreaActivites, setCampActivities] = useState({});
    const apiUrlForGetCampDetail = `https://developer.nps.gov/api/v1/campgrounds?id=${campgroud_id}&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs`;
    const apiUrlFetchParkActivites = `https://developer.nps.gov/api/v1/activities?parkCode=${parkCode}&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC`;


    useEffect(() => {
        fetchData()
    }, []);


    const fetchData = async () => {
        try {
            const getCampDetails = await fetch(apiUrlForGetCampDetail)
            const result = await getCampDetails.json();
            var campSiteData = result["data"][0]
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
        const { user } = props;
        if (!user) {
            return <Redirect to="/login" />;
        }
        setBookingFlag(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "user_id": user.id,
                "park_code": parkCode,
                "camp_ground_id": campgroud_id,
                "users_count": data.userCount,
                "start_date": data.startDate,
                "end_date": data.endDate
            })
        };
        // fetch('/api/booking', requestOptions)
        //     .then(response => response.json())
        fetch('/api/booking', requestOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
            .then((responseJson) => {
                setBookingFlag(false)
                setSuccessBooking(true)
            })
            .catch((error) => {
                setBookingFlag(false)
                console.log(error)
            });
    }

    if (!isLoaded) {
        return <Loading />
    }

    return (
        <div className="camp_site_content">
            {/* Imagesetup */}
            <Swiper slidesPerView={1} navigation={true} pagination={{
                "clickable": true
            }} className="mySwiper">
                {images.map((image, index) => {
                    return <SwiperSlide key={`swiper-${index}`}><img src={image} alt='' /></SwiperSlide>;
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
                        <DatePicker fees={campDetail["fees"][0]["cost"]} bookingClick={bookingHandler} booking={isBooking} />
                        {isSuccessBooking &&
                            <CAlert color="primary" style={{ marginTop: 10 }}>
                                Your booking is successfully done.
                            </CAlert>
                        }
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
                                <CRow><p className="camp_text">Address:</p>{campDetail["addresses"].length !== 0 ? campDetail["addresses"][0]["line1"] : 'No Information'}</CRow>
                                <CRow><p className="camp_text">City:</p>{campDetail["addresses"].length !== 0 ? campDetail["addresses"][0]["city"] : 'No Information'}</CRow>
                                <CRow><p className="camp_text">State:</p>{campDetail["addresses"].length !== 0 ? campDetail["addresses"][0]["stateCode"] : 'No Information'}</CRow>
                            </CCol>
                            <CCol>
                                <CRow><p className="camp_text">Phone Number:</p>{campDetail["contacts"]["phoneNumbers"].length !== 0 ? campDetail["contacts"]["phoneNumbers"][0]["phoneNumber"] : 'No Information'}</CRow>
                                <CRow><p className="camp_text">Email:</p>{campDetail["contacts"]["emailAddresses"].length !== 0 ? campDetail["contacts"]["emailAddresses"][0]["emailAddress"] : 'No Information'}</CRow>
                                <CRow><p className="camp_text">Accepts bookings:</p>3 months out</CRow>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CContainer>
            <SmallCard arrActivities={campAreaActivites} key='campAct' />
        </div>
    );
};

const mapStateToProps = function (state) {
    const { user } = state.auth;
    return {
        user,
    };
};

export default connect(mapStateToProps)(DetailPage);
