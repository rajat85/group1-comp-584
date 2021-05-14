import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import UserService from "../services/user.service";

import { history } from "../helpers/history";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { connect } from "react-redux";

import { CContainer, CRow, CCol } from '@coreui/react';

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
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    if (!this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <div className="container mt-3">
          <div className="container">
            <header className="jumbotron">
              <h3>{this.state.content}</h3>
              <div className="docs-example-row">
                <CContainer>
                  <CRow>
                    <CCol sm="auto">One of three columns</CCol>
                    <CCol sm="auto">One of three columns</CCol>
                    <CCol sm="auto">One of three columns</CCol>
                  </CRow>
                </CContainer>
              </div>

            </header>
          </div>
        </div>
      </div>
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
