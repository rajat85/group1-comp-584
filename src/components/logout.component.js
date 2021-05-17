import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import { logout } from "../actions/auth";

const Logout = ({ dispatch }) => {

  useEffect(() => {
    dispatch(logout()); // clear message when changing location
    return () => {};
  }, [dispatch]);

  return <Redirect to="/login" />;
};

const mapStateToProps = function (state) {
};

export default connect(mapStateToProps)(Logout);