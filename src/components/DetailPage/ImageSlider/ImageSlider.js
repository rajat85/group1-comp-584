import React from 'react'
import './ImageSlider.css'

function ImageSlider(props) {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log("next", activeStep)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        console.log("back", activeStep)

    };

    return (
        <React.Fragment>
            <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100 camp_slider_image" src={props.image[activeStep]} alt="First slide" />
                    </div>
                </div>
                <a
                    className="carousel-control-prev"
                    role="button"
                    data-slide="prev"
                    disabled={activeStep === 0}
                    onClick={handleBack}

                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    role="button"
                    data-slide="next"
                    onClick={handleNext}
                    disabled={activeStep === props.image.length - 1}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </React.Fragment>
    )
}

export default ImageSlider