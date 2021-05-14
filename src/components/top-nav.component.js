import React, { Component } from "react";
import { Link } from "react-router-dom";

import { history } from "../helpers/history";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { connect } from "react-redux";

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { user: currentUser } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            CampingApp
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(TopNav);
