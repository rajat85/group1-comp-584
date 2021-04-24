import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DashCard.css";

const tutorialSteps = {
  label: "Joshua",
  imgPath: [
    "https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto:subject,h_400,q_60,w_780/v1618334259/campground-photos/cbqtudbdoixiiyfalshi.jpg",
    "https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto:subject,h_400,q_60,w_780/v1618335482/campground-photos/ltlfvm4hiyhgcwuvpi0p.jpg",
    "https://hipcamp-res.cloudinary.com/image/upload/c_fill,f_auto,g_auto:subject,h_400,q_60,w_780/v1618335556/campground-photos/jbgu5minkwrzgd2scr6x.jpg",
  ],
};

export default function DashCard(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.imgPath.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Card className="cardDesign">
        <Card.Img
          className="img"
          src={tutorialSteps.imgPath[activeStep]}
          alt={tutorialSteps.label}
        />
        <Card.ImgOverlay className="btnAlignNext">
          <Button
            variant="Light"
            size="sm"
            className="btnColor"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {">"}
          </Button>
        </Card.ImgOverlay>
        <Card.ImgOverlay className="btnAlignPrevious">
          <Button
            variant="Light"
            size="sm"
            className="btnColor"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {"<"}
          </Button>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Title>Country Views</Card.Title>
          <hr />
          <Card.Text>
            d an old time hardware store. A lot of movies and shows are filmed
            in and around the area so you may recognize these locations. We are
            only @ 15 minutes to Chase bank, Starbucks and Vons supermarket and
            @ 1/2 an hour to Magic Mountain.
          </Card.Text>
        </Card.Body>
        <Card.Title className="bottomText">45$/night</Card.Title>
      </Card>
    </>
  );
}
