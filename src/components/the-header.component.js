import React, { useEffect } from 'react'
import { connect } from 'react-redux'
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
  const { user: currentUser, sidebarShow, dispatch } = props;

  const logOut =  function () {
    dispatch(logout());
  };

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
    return () => {};
  }, [dispatch]);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive';
    dispatch({ type: 'set', sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive';
    dispatch({ type: 'set', sidebarShow: val });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
      {currentUser && (
        <CHeaderNav className="px-3">
          <CHeaderNavItem className="px-3">
            <div className="d-inline">Welcome</div>
            <CHeaderNavLink className="d-inline" to={"/profile"}>{currentUser.username}</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink onClick={logOut} to="/logout">Logout</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
      )}
    </CHeader>
  )
};

const mapStateToProps = function (state) {
  const { user } = state.auth;
  const { sidebarShow } = state.changeState;
  return {
    user,
    sidebarShow,
  };
};

export default connect(mapStateToProps)(TheHeader);