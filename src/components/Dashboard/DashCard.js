
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashcard.css";
import { CContainer, CRow } from "@coreui/react";

// const tutorialSteps = {
//   label: "Joshua",
//   imgPath: [
//     "https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto:subject,h_400,q_60,w_780/v1618334259/campground-photos/cbqtudbdoixiiyfalshi.jpg",
//     "https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto:subject,h_400,q_60,w_780/v1618335482/campground-photos/ltlfvm4hiyhgcwuvpi0p.jpg",
//     "https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto:subject,h_400,q_60,w_780/v1618335556/campground-photos/jbgu5minkwrzgd2scr6x.jpg",
//   ],
// };

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

export default function DashCard(props) {
  // const [activeStep, setActiveStep] = React.useState(0);
  const [isLoaded, setIsLoaded] = useState(false)
  const [campDetails, setCampDetail] = useState([{}]) //for all camp details


  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleClick = (id, parkCode) => {
    props.history.push({ pathname: '/detail', state: { id: id, parkCode: parkCode } })
  };

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const request = await fetch('https://developer.nps.gov/api/v1/campgrounds?stateCode=ca&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs&limit=20')
      const result = await request.json();
      var campSitesData = result["data"]
      console.log(campSitesData)
      setCampDetail(getCampSiteData(campSitesData))
      setIsLoaded(true)
    } catch (err) {

    }
  }


  if (!isLoaded) {
    return <div>Loading....</div>
  } else {
    return (
      <CContainer>
        <CRow>
          {campDetails.map((campDetail, index) => (
            <Card className="cardDesign" onClick={() => handleClick(campDetail.id, campDetail.parkCode)} key={index}>
              <Card.Img
                className="img"
                src={campDetail.images[0]}
                alt="imagePark"
              />
              {/* <Card.ImgOverlay className="btnAlignNext">
                <Button
                  variant="Light"
                  size="sm"
                  className="btnColor"
                  onClick={handleNext}
                  disabled={activeStep === campDetail.images.length - 1}
                >
                  {">"}
                </Button>
              </Card.ImgOverlay> */}
              {/* <Card.ImgOverlay className="btnAlignPrevious">
                <Button
                  variant="Light"
                  size="sm"
                  className="btnColor"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {"<"}
                </Button>
              </Card.ImgOverlay> */}
              <Card.Body>
                <Card.Title>{campDetail.name}</Card.Title>
                <hr />
                <Card.Text>
                  {campDetail.description}
                </Card.Text>
              </Card.Body>
              <Card.Title className="bottomText">{campDetail.fees.split('.')[0]}$</Card.Title>
            </Card>
          ))}

        </CRow>
      </CContainer>
    );
  }
}
