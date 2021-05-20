import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import  CIcon  from '@coreui/icons-react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";

import "./Contact.css";

import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardText,
  CFade,
  CPopover,
  CButton
} from '@coreui/react';


function Contact() {

    return (
      <main className="c-main">
         <CContainer fluid>
            <section className="section">
               <div className="row justify-content-md-center">
                  <CCol md={4}>
                     <h2 className="section-heading h1 text-center">Contact Us</h2>
                  </CCol>
               </div>
               <br/>
               <div className="row justify-content-md-center">
                  <CCol md={10}>
                     <p className="section-description text-center">CampX is a growing community of good-natured people and the most comprehensive resource for unique outdoor stays.
                        By connecting people with the land and each other, CampX works to support those who care for the land and get more people out under the stars. We do this because we believe humans in nature bring out the best of human nature.
                     </p>
                  </CCol>
               </div>
               <br/>
               <div className="row justify-content-md-center">
                  <div className="col-lg-8">
                     <div className="row text-center">
                        <div className="col-md-4">
                          <div className="row justify-content-md-center">
                            <FontAwesomeIcon pull="left" icon={Icon.faMapMarkerAlt} size='5x'/>
                          </div>
                          <br/>
                           <a className="btn-floating blue accent-1"></a>
                           <p>18111 Nordhoff St,<br/> Northridge, CA 91330</p>
                        </div>

                        <div className="col-md-4">
                          <div className="row justify-content-md-center">
                            <FontAwesomeIcon pull="left" icon={Icon.faPhone} size='5x'/>
                          </div>
                          <br/>
                           <a className="btn-floating blue accent-1"><i className="fas fa-phone"></i></a>
                           <p>+1 818 677 1200 <br/>8:00AM - 6:00PM</p>
                        </div>
                        <div className="col-md-4">
                          <div className="row justify-content-md-center">
                            <FontAwesomeIcon pull="left" icon={Icon.faEnvelope} size='5x'/>
                          </div>
                          <br/>
                          <a className="btn-floating blue accent-1"><i className="fas fa-envelope"></i></a>
                          <p>info@gmail.com <br/> sale@gmail.com</p>
                        </div>
                     </div>
                     <div>
                     </div>
                  </div>
               </div>
               <br/><br/>
               <div className="row">
                  <div className="col-lg-12">
                      <div id="map-container-google-11" className="z-depth-1-half map-container-6">
                        <iframe  loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJj2ayD1SawoARVirZh_OSEPA&key=AIzaSyA9DlULtahqe530Lud9A_Lh5b8J5-ablnc"></iframe>
                     </div>
                  </div>
                </div>
            </section>
         </CContainer>
      </main>
    );
};

export default Contact
