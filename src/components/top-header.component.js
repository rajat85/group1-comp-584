import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import { history } from "../helpers/history";

const TheHeader = (props) => {
  const dispatch = useDispatch();

  const logOut =  function () {
    dispatch(logout());
  };

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
    return () => {};
  }, [dispatch]);

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={() => {}}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={() => {}}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/home">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to={"/profile"}>Profile</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink onClick={logOut}>Logout</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
    </CHeader>
  )
};

const mapStateToProps = function (state) {
  const { user } = state.auth;
  return {
    user,
  };
};

export default connect(mapStateToProps)(TheHeader);
