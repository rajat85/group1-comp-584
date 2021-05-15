<<<<<<< HEAD
import {CContainer, CCol, CRow, CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem, CFade} from "@coreui/react";
=======
import { CContainer, CCol, CRow, CCard, CCardHeader, CCardBody, CListGroup, CListGroupItem } from "@coreui/react";
>>>>>>> 1e5bc91 ( api added dashboard)
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";
import "./DetailPage.css";
import Card from './Card/Card'
import SmallCard from './Card/SmallCard/SmallCard'
import ImageSlider from './ImageSlider/ImageSlider'
import DatePicker from './DatePicker/Datepicker'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { getImageList, getCamsiteDetail, getCampAmenities, getActivitiesWithImg } from './DetailStore/DataParse'
import {Link} from "react-router-dom";


function DetailPage(props) {
    // const [activeStep, setActiveStep] = React.useState(0);
<<<<<<< HEAD
=======
import { useSelector, useDispatch } from 'react-redux';
=======
import { getImageList, getCamsiteDetail, getCampAmenities, getActivitiesWithImg } from './Store/DataParse'
>>>>>>> 76eec7d (Remove error regarding key and api implementation for activities and other details in detail screen)


function DetailPage() {
    const [activeStep, setActiveStep] = React.useState(0);
>>>>>>> 1e5bc91 ( api added dashboard)
=======
import { getImageList, getCamsiteDetail, getCampAmenities, getActivitiesWithImg } from './DetailStore/DataParse'


function DetailPage() {
    // const [activeStep, setActiveStep] = React.useState(0);
>>>>>>> 9767f61 (Detail screen change image height and file name changes)
=======
    const { id, parkCode } = props.location.state
>>>>>>> 0d93e1d (Booking campground and homepage dashboard with API)
    const [isLoaded, setIsLoaded] = useState(false)
    const [imgPath, setImgPath] = useState([]) //for Image
    const [campDetail, setCampDetail] = useState({}) //for all camp details
    const [campSiteArea, setCampSiteArea] = useState({}) //handle the state for camsite Area
    const [campAreaAminities, setCampAreaAminities] = useState({}) //handle the state for camAminities
<<<<<<< HEAD
<<<<<<< HEAD
    const [campAreaActivites, setCampActivities] = useState({})
    const apiUrlForGetCampDetail = 'https://developer.nps.gov/api/v1/campgrounds?id=BC707FA3-F575-4734-8E62-34689982F615&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs'
    const apiUrlFetchParkActivites = 'https://developer.nps.gov/api/v1/activities?parkCode=seki&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC'

=======
>>>>>>> 1e5bc91 ( api added dashboard)
=======
    const [campAreaActivites, setCampActivities] = useState({})

<<<<<<< HEAD
>>>>>>> 76eec7d (Remove error regarding key and api implementation for activities and other details in detail screen)
=======
    const apiUrlForGetCampDetail = `https://developer.nps.gov/api/v1/campgrounds?id=${id}&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs`
    const apiUrlFetchParkActivites = `https://developer.nps.gov/api/v1/activities?parkCode=${parkCode}&api_key=ebkHAQqxYcIP2uGebz8ASYNVFfvte7BsrBhfhAvC`
>>>>>>> 0d93e1d (Booking campground and homepage dashboard with API)

    useEffect(() => {
        fetchData()
    }, [])

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 0d93e1d (Booking campground and homepage dashboard with API)
    const fetchData = async () => {
        try {
            const getCampDetails = await fetch(apiUrlForGetCampDetail)
            const result = await getCampDetails.json();
=======
    const fetchData = async () => {
        try {
            const request = await fetch('https://developer.nps.gov/api/v1/campgrounds?id=E7CC7363-9C34-42ED-B3F0-769BB39E9400&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs')
            const result = await request.json();
>>>>>>> 1e5bc91 ( api added dashboard)
=======

    const fetchData = async () => {
        try {
            const getCampDetails = await fetch(apiUrlForGetCampDetail)
            const result = await getCampDetails.json();
>>>>>>> 76eec7d (Remove error regarding key and api implementation for activities and other details in detail screen)
            var campSiteData = result["data"][0]
            setCampDetail(campSiteData)
            setImgPath(getImageList(campSiteData["images"]))
            setCampSiteArea(getCamsiteDetail(campSiteData["campsites"]))
            setCampAreaAminities(getCampAmenities(campSiteData["amenities"]))
<<<<<<< HEAD
<<<<<<< HEAD
            const getActivities = await fetch(apiUrlFetchParkActivites)
            const activitiesData = await getActivities.json();
            setCampActivities(getActivitiesWithImg(activitiesData['data']))
            setIsLoaded(true)
        } catch (err) {
            alert('Error while fetching data')
        }
    }

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    if (!isLoaded) {
        return (
          <main className="c-main">
            <CContainer fluid>
                <CRow className="align-items-center">
                    <CCol>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </CContainer>
          </main>
        );
    } else {
        return (
          <main className="c-main">
              <CContainer fluid>
                  <CFade>
                      <div className="camp_site_content">
                          {/* Imagesetup */}
                          <ImageSlider image={imgPath} />
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
                                              <CRow><p className="camp_text">Address:</p>{campDetail["addresses"][0]["line1"]}</CRow>
                                              <CRow><p className="camp_text">City:</p>{campDetail["addresses"][0]["city"]}</CRow>
                                              <CRow><p className="camp_text">State:</p>{campDetail["addresses"][0]["stateCode"]}</CRow>
                                          </CCol>
                                          <CCol>
                                              <CRow><p className="camp_text">Phone Number:</p>{campDetail["contacts"]["phoneNumbers"][0]["phoneNumber"]}</CRow>
                                              <CRow><p className="camp_text">Email:</p>{campDetail["contacts"]["emailAddresses"][0]["emailAddress"]}</CRow>
                                              <CRow><p className="camp_text">Accepts bookings:</p>3 months out</CRow>
                                          </CCol>
                                      </CRow>
                                  </CCol>
                              </CRow>
                          </CContainer>
                          <SmallCard arrActivities={campAreaActivites} key='campAct' />
                      </div>
                  </CFade>
              </CContainer>
          </main>
=======
            console.log(campSiteArea.list)
=======
            const getActivities = await fetch(apiUrlFetchParkActivites)
            const activitiesData = await getActivities.json();
            setCampActivities(getActivitiesWithImg(activitiesData['data']))
>>>>>>> 76eec7d (Remove error regarding key and api implementation for activities and other details in detail screen)
            setIsLoaded(true)
        } catch (err) {
            alert('Error while fetching data')
        }
    }

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    const bookingHandler = (data) => {
        // console.log('booking handler', data.userCount, data.startDate._d, data.endDate._d)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "user_id": 1,
                "park_code": parkCode,
                "camp_ground_id": id,
                "users_count": data.userCount,
                "start_date": data.startDate._d,
                "end_date": data.endDate._d
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
                <ImageSlider image={imgPath} />
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
                                    <CRow><p className="camp_text">Address:</p>{campDetail["addresses"][0]["line1"]}</CRow>
                                    <CRow><p className="camp_text">City:</p>{campDetail["addresses"][0]["city"]}</CRow>
                                    <CRow><p className="camp_text">State:</p>{campDetail["addresses"][0]["stateCode"]}</CRow>
                                </CCol>
                                <CCol>
                                    <CRow><p className="camp_text">Phone Number:</p>{campDetail["contacts"]["phoneNumbers"][0]["phoneNumber"]}</CRow>
                                    <CRow><p className="camp_text">Email:</p>{campDetail["contacts"]["emailAddresses"][0]["emailAddress"]}</CRow>
                                    <CRow><p className="camp_text">Accepts bookings:</p>3 months out</CRow>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CContainer>
                <SmallCard arrActivities={campAreaActivites} key='campAct' />
            </div>
>>>>>>> 1e5bc91 ( api added dashboard)
        );
    }
};

export default DetailPage
