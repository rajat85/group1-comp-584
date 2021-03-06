import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CFade } from '@coreui/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.css';
import './App.css';

import { logout } from './actions/auth';
import { clearMessage } from './actions/message';
import { history } from './helpers/history';
const TheHeader = React.lazy(() => import('./components/the-header.component'));
const TheSidebar = React.lazy(() => import('./components/the-sidebar.component'));
const TheFooter = React.lazy(() => import('./components/the-footer.component'));
const Login = React.lazy(() => import('./components/login.component'));
const Register = React.lazy(() => import('./components/register.component'));
const Logout = React.lazy(() => import('./components/logout.component'));
const Profile = React.lazy(() => import('./components/profile.component'));
const Dashboard = React.lazy(() => import('./components/Dashboard/DashCard'));
const DetailPage = React.lazy(() => import('./components/DetailPage/DetailPage'));
const AboutUs = React.lazy(() => import('./components/AboutUs/AboutUs'));
const Contact = React.lazy(() => import('./components/Contact/Contact'));

const loading = (
  <div className="d-flex justify-content-center">
    <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
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
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <Router history={history}>
        <Suspense fallback={loading}>
          <Switch>
            <Route exact path={["/", "/dashboard"]} name="Home Page" render={props => (
              <div className="c-app c-default-layout">
                <TheSidebar />
                <div className="c-wrapper">
                  <TheHeader />
                  <div className="c-body">
                    <CFade>
                      <Dashboard {...props} />
                    </CFade>
                  </div>
                  <TheFooter />
                </div>
              </div>
            )} />

            <Route exact path="/profile" name="Profile Page" render={props => (
              <div className="c-app c-default-layout">
                <TheSidebar />
                <div className="c-wrapper">
                  <TheHeader />
                  <div className="c-body">
                    <CFade>
                      <Profile {...props} />
                    </CFade>
                  </div>
                  <TheFooter />
                </div>
              </div>
            )} />

            <Route exact path="/login" name="Login Page" render={props => (
              <CFade>
                <Login {...props} />
              </CFade>
            )} />
            <Route exact path="/register" name="Register Page" render={props => (
              <CFade>
                <Register {...props} />
              </CFade>
            )} />
            <Route exact path="/logout" name="Register Page" render={props => (
              <CFade>
                <Logout {...props} />
              </CFade>
            )} />
            {/* <Route exact path="/dashboard" name="dashboard Page" render={props => (
              <div className="c-app c-default-layout">
                <div className="c-wrapper">
                  <TheHeader />
                  <div className="c-body">
                    <CFade>
                      <Dashboard {...props} />
                    </CFade>
                  </div>
                  <TheFooter />
                </div>
              </div>
            )} /> */}
            <Route exact path="/detail/:id" name="Detail Page" render={props => (
              <div className="c-app c-default-layout">
                <TheSidebar />
                <div className="c-wrapper">
                  <TheHeader />
                  <div className="c-body">
                    <CFade>
                      <DetailPage {...props} />
                    </CFade>
                  </div>
                  <TheFooter />
                </div>
              </div>
            )} />


            <Route exact path="/about" name="AboutUs" render={props => (
              <div className="c-app c-default-layout">
                <TheSidebar />
                <div className="c-wrapper">
                  <TheHeader />
                  <div className="c-body">
                    <CFade>
                      <AboutUs {...props} />
                    </CFade>
                  </div>
                  <TheFooter />
                </div>
              </div>
            )} />

            <Route exact path="/contact" name="Contact" render={props => (
              <div className="c-app c-default-layout">
                <TheSidebar />
                <div className="c-wrapper">
                  <TheHeader />
                  <div className="c-body">
                    <CFade>
                      <Contact {...props} />
                    </CFade>
                  </div>
                  <TheFooter />
                </div>
              </div>
            )} />

            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/logout" name="Logout Page" render={props => <Logout {...props} />} />
          </Switch>
        </Suspense>
      </Router>
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

export default connect(mapStateToProps)(App);
