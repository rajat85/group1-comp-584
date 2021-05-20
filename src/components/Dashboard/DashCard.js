import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Dexie from 'dexie';
import _ from 'lodash';
import { Card, Button } from "react-bootstrap";
import { CContainer, CRow, CCol } from "@coreui/react";
import { Input } from "antd";
import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashcard.css";
import Loading from '../loading.component';
import { search } from '../../actions/search';
const { Search } = Input;

const db = new Dexie('ParkList');
db.version(1).stores(
  { items: "++id, stateCode, name, data" }
);

const getImageList = (props) => {
  return props.map(image => (image['url']));
};

const getCampSiteData = (stateCode = 'ca', props = [], searchTerm = '') => {
  const campSitesData = [];
  props.forEach(campSiteData => {
    const name = campSiteData['name'];
    db.items.add({
      stateCode,
      name,
      data: campSiteData
    });
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
    );
  });
  return campSitesData;
}

const Dashboard = function (props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [campDetails, setCampDetail] = useState([{}]) //for all camp details

  const handleClick = (id, parkCode) => {
    props.history.push({ pathname: `/detail/${id}`, search: `?park_code=${parkCode}` })
  };

  const handleSearch = (inputEl) => {
    const { value } = inputEl;
    props.search({ searchTerm: value });
  };

  useEffect(() => {
    fetchData()
  }, []);

  const filterItems = (campDetails, searchTerm) => {
    if (!searchTerm) {
      return campDetails;
    }
    return campDetails.filter(({ name, description }) => {
      searchTerm = searchTerm.toLowerCase();
      return name.toLowerCase().includes(searchTerm) || description.toLowerCase().includes(searchTerm);
    });
  };

  const fetchData = async () => {
    try {
      const request = await fetch('https://developer.nps.gov/api/v1/campgrounds?stateCode=ca&api_key=T3MkOlIozZmqR97FAoE52uxAtlfa2bsdZPn1pwMs&limit=20');
      const result = await request.json();
      const campSitesData = result["data"];
      setCampDetail(getCampSiteData('ca', campSitesData, ''));
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
          <CCol md={9}>
            <Card>
              <Card.Body>
                <div className="input-group">
                  <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    id={'search'}
                    onSearch={() => handleSearch(document.getElementById('search'))}
                  />
                </div>
              </Card.Body>
            </Card>
          </CCol>
        </CRow>
        <CRow className={"justify-content-center"}>

          {filterItems(campDetails, _.trim(props.searchTerm)).map((campDetail, index) => (
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
                  <Button variant="link" className="btnShowDetail" onClick={() => handleClick(campDetail.id, campDetail.parkCode)}>Details</Button>
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
  const { searchTerm } = state.search;
  return {
    user,
    isLoggedIn,
    searchTerm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ search }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
