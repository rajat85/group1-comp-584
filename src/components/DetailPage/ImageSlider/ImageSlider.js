import React from 'react'

function ImageSlider(props) {
    return (
        <React.Fragment>
            <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={props.image} alt="First slide" />
                    </div>
                </div>
                <a
                    className="carousel-control-prev"
                    role="button"
                    data-slide="prev"
                    onClick={props.previous}
                // disabled={activeStep === 0}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    role="button"
                    data-slide="next"
                    onClick={props.next}
                // disabled={activeStep === maxSteps - 1}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </React.Fragment>
    )
}

export default ImageSlider