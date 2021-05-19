import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarMinimizer,
  CSidebarNavItem,
  CLink,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import logos from "./campx-logo.png";
import mobileLogos from "./campx-logo-mobile.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icon from "@fortawesome/free-solid-svg-icons";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.changeState.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="campx-logo"
          src={logos}
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="campx-logo-mobile"
          src={mobileLogos}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CSidebarNavItem>
          <CLink
            className='c-sidebar-nav-link'
            to='/dashboard'
            exact={true}
            activeClassName="c-active"
          >
            <FontAwesomeIcon pull="left" icon={Icon.faTachometerAlt} className={'c-sidebar-nav-icon'} />
            Dashboard
          </CLink>
        </CSidebarNavItem>
        <CSidebarNavItem>
          <CLink
            className='c-sidebar-nav-link'
            to='/profile'
            exact={true}
            activeClassName="c-active"
          >
            <FontAwesomeIcon pull="left" icon={Icon.faUserAlt} className={'c-sidebar-nav-icon'} />
            Profile
          </CLink>
        </CSidebarNavItem>
        <CSidebarNavItem>
          <CLink
            className='c-sidebar-nav-link'
            to='/about'
            exact={true}
            activeClassName="c-active"
          >
            <FontAwesomeIcon pull="left" icon={Icon.faInfoCircle} className={'c-sidebar-nav-icon'} />
            About Us
          </CLink>
        </CSidebarNavItem>
        <CSidebarNavItem className={"sidebar-footer"}>
          <CLink
            className='c-sidebar-nav-link'
            to='/logout'
            exact={true}
            activeClassName="c-active"
          >
            <FontAwesomeIcon pull="left" icon={Icon.faSignOutAlt} className={'c-sidebar-nav-icon'} />
            Logout
          </CLink>
        </CSidebarNavItem>
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
