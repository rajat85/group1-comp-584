import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../services/user.service";

import { history } from "../helpers/history";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { connect } from "react-redux";

import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardText,
  CFade
} from '@coreui/react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      content: "",
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <main className="c-main">
        <CContainer fluid>
          <CFade>
            {/*<CCard>*/}
            {/*  <CCardHeader>*/}
            {/*    Famous parks*/}
            {/*  </CCardHeader>*/}
            {/*  <CCardBody>*/}
            <CRow>
              <CCol xs="12" md="12" xl="12">
                <header className="jumbotron">
                  <h3>{this.state.content}</h3>
                </header>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <h1>Find the best camping near you.</h1>
                <h4>Book unique camping experiences on over <strong>300,000</strong></h4>
                <h4>campgrounds, ranches, vineyards, public parks and more.</h4>
              </CCol>
            </CRow>

            <CRow>
              <CCol className="test" md={12}>
                <h3>Best camping</h3>
              </CCol>
            </CRow>

            <CRow>
              <CCol className="test" md={3}>
                <div className="card-group">
                  <CCard style={{ width: '18rem' }}>
                    <img className="card-img-top" src="https://cdn.glitch.com/488fb2dd-efac-4ee0-a6b7-60bedadb1c60%2Fwill-porada-DH5183gvKUg-unsplash.jpg?v=1612900479111" alt="Card image cap"/>
                    <CCardBody>
                      <title>Docking Bay 94</title>
                      <h6 className="card-subtitle mb-2 text-muted">California The Overland Portal</h6>
                      <CCardText>We're offering an off-driveway dry campsite for RVs, Skoolies, and trailers, all of which should be self-sufficient (BYO Toilet!). The Docking Bay accommodates 1 vehicle up to 30ft*. (Tow vehicle + camper) The Docking Bay includes a fire pit, picnic table, and a nature view within a residential.</CCardText>
                      <CCardText><small className="text-muted">$20/night</small></CCardText>
                    </CCardBody>
                  </CCard>
                </div>
              </CCol>
            </CRow>
            {/*  </CCardBody>*/}
            {/*</CCard>*/}
          </CFade>
        </CContainer>
      </main>
    );
  }
}

function mapStateToProps(state) {
  const { user, isLoggedIn } = state.auth;
  return {
    user,
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(Home);
