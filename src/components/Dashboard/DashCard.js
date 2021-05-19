import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { CContainer, CRow, CCol } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashcard.css";
import Loading from '../loading.component';


const getImageList = (props) => {
  var imageList = []
  props.map(image => {
    imageList.push(image['url'])
  })
  return imageList
}

const getCampSiteData = (props) => {
  var campSitesData = []
  props.map(campSiteData => {
    const images = getImageList(campSiteData["images"])
    campSitesData.push(
      {
        "id": campSiteData['id'],
        "name": campSiteData['name'],
        "parkCode": campSiteData['parkCode'],
        "description": campSiteData['description'],
        "fees": campSiteData['fees'][0]['cost'],
        'images': images
      }
    )

  })
  return campSitesData
}

const Dashboard = function (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [campDetails, setCampDetail] = useState([{}]) //for all camp details

  const handleClick = (id, parkCode) => {
    props.history.push({ pathname: '/detail', state: { id: id, parkCode: parkCode } })
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const request = await fetch('https://developer.nps.gov/api/v1/campgrounds?stateCode=ca&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs&limit=20');
      const result = await request.json();
      const campSitesData = result["data"];
      setCampDetail(getCampSiteData(campSitesData));
      setIsLoaded(true);
    } catch (err) {

    }
  };

  if (!props.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  if (!isLoaded) {
    return <Loading />;
  } else {
    return (
      <CContainer>
        <CRow className={"justify-content-center"}>
          {campDetails.map((campDetail, index) => (
            <Card className="cardDesign" key={index}>
              <Card.Img
                className="img"
                src={campDetail.images[0]}
                alt="imagePark"
              />
              <Card.Body>
                <Card.Title>{campDetail.name}</Card.Title>
                <hr />
                <Card.Text>
                  {campDetail.description}
                </Card.Text>
              </Card.Body>
              <CRow>
                <CCol md={7}>
                  <Card.Title className="bottomText">{campDetail.fees.split('.')[0]}$</Card.Title>
                </CCol>
                <CCol md={5}>
                  <Button variant="link" className="btnShowDetail" onClick={() => handleClick(campDetail.id, campDetail.parkCode)}>Show Details</Button>
                </CCol>
              </CRow>
            </Card>
          ))
          }
        </CRow>
      </CContainer>
    );
  }
};

const mapStateToProps = function (state) {
  const { user, isLoggedIn } = state.auth;
  return {
    user,
    isLoggedIn,
  };
};

export default connect(mapStateToProps)(Dashboard);
