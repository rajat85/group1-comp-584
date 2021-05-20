import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import { history } from "../helpers/history";

const TheHeader = (props) => {
  const { user: currentUser, sidebarShow, dispatch } = props;
  const [ showModal, setShowModal ] = useState(false);

  const renderModal = () => {
    return (
        <CModal
          show={showModal}
          onClose={() => setShowModal(false)}
        >
          <CModalHeader closeButton>Logout</CModalHeader>
          <CModalBody>
            Do you really want to logout?
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => dispatch(logout())}>Log me out!</CButton>{' '}
            <CButton
              color="secondary"
              onClick={() => setShowModal(false)}
            >Cancel</CButton>
          </CModalFooter>
        </CModal>
    );
  };

  const logOut =  function (e) {
    e.preventDefault();
    setShowModal(true);
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
    <>
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
              <CHeaderNavLink className="d-inline" to={"/profile"}>{currentUser.username.toUpperCase()}!</CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem className="px-3">
              <CHeaderNavLink onClick={logOut} to="/logout">Logout</CHeaderNavLink>
            </CHeaderNavItem>
          </CHeaderNav>
        )}
      </CHeader>
      {renderModal()}
    </>
  );
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