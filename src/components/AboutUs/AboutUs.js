
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


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

function AboutUs(props) {

    return (
      <main className="c-main">
        <CContainer fluid>
        <div className="row justify-content-md-center">
          <CCol md={10}>
            <img src="https://cdn.glitch.com/8f1cca0c-cc88-4087-a65a-f249b3c73864%2Fcamping-about-us.jpeg?v=1621293774497" class="img-fluid" alt="Responsive image"/>
          </CCol>
        </div>


        <br/><br/>
        <div className="row justify-content-md-center">
          <CCol md="auto">
            <h1>It Started With A Passion</h1>
          </CCol>
        </div>
        <br/>
        <div className="row justify-content-md-center">
          <CCol lg={8}>
            <p>
              The CampX story began with passion—gorgeous, glassy, barrelling waves.
            </p>
          </CCol>
        </div>

        <div className="row justify-content-md-center">
          <CCol lg={8}>
            <p>
              At CampX, our mission is to connect people to the outdoors and each other.
              That’s why our campgrounds across California make it easy to enjoy the beauty of nature and share adventures with family and friends.
              Our wide variety of family-friendly campgrounds and amenities provide the perfect place to get away, unwind and enjoy camping in the great outdoors.
            </p>
          </CCol>
        </div>

        <div className="row justify-content-md-center">
          <CCol lg={8}>
            <p>
              Whether you need a perfect site to pull into on your next RV road trip or a cozy spot where you and your kids can pitch your tent for the weekend, CampX is sure to have the ideal campsite for you.
              At CampX, we help people get outside because we know it changes them on the inside.
            </p>
          </CCol>
        </div>

        <div className="row justify-content-md-center">
          <CCol lg={8}>
            <p>
              We serve a million campers each year, helping them find their next adventure, including where to stay, activities to try and general camping resources. The outdoors is waiting, time to plan your next adventure with CampX.
            </p>
          </CCol>
        </div>

        <br/><br/>

        <div className="row justify-content-md-center">
          <CCol lg={8}>
          <CRow>
            <CCol>
              <CPopover content="Journey campgrounds are the perfect oases after a day on the road. Whether it’s along the way or a quick getaway, they’ve got you covered. Located near the highways and byways of North America with long Pull-thru RV Sites, they deliver convenience to the traveling camper. Pull in, ease back and take a load off." placement="left">
                <CButton color="secondary">Gateaway to Advanture</CButton>
              </CPopover>
            </CCol>
            <CCol>
              <CPopover content="Whether you’re exploring the local area or hanging out at the campground, CampX Holidays are an ideal place to relax and play. There’s plenty to do, with amenities and services to make your stay memorable. Plus, you’ll enjoy the outdoor experience with upgraded RV Sites with CampX Patios™ and Deluxe Cabins with full baths for camping in comfort. Bring your family, bring your friends, or bring the whole group – there’s plenty of ways to stay and explore.."placement="top">
                <CButton color="secondary">BaseCamp For Outdors</CButton>
              </CPopover>
            </CCol>
            <CCol>
              <CPopover
              content="CampX Resorts offer a carefree vacation in the great outdoors. Enjoy robust recreation and staff-led activities, kick back and relax by the resort-style pool, or grab a bite to eat, all while never leaving the campground. And with plenty of RV Sites with CampX Patios™ and Deluxe Cabins with full baths to meet your needs, it’s the ultimate camping getaway." placement="bottom">
                <CButton color="secondary">Destination for Recreation</CButton>
              </CPopover>
            </CCol>
            <CCol>
              <CPopover content="No RV? A tent’s not your style? No worries, CampX Cabins make camping easy. Our Deluxe Cabins even come complete with kitchens, bathrooms and more." placement="right">
                <CButton color="secondary">Home Away From Home</CButton>
              </CPopover>
            </CCol>
            </CRow>
          </CCol>
        </div>
        <br/><br/><br/><br/>
        </CContainer>
      </main>
    );
};

export default AboutUs
