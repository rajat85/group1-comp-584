import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CContainer, CFade } from '@coreui/react';

import "bootstrap/dist/css/bootstrap.min.css";
import '@coreui/coreui/dist/css/coreui.css';
import "./App.css";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';

const Login = React.lazy(() => import('./components/login.component'));
const Register = React.lazy(() => import('./components/register.component'));
const Home = React.lazy(() => import('./components/home.component'));
const Profile = React.lazy(() => import('./components/profile.component'));
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
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
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <main className="c-main">
        <CContainer fluid>
          <Router history={history}>
            <Suspense fallback={loading}>
              <Switch>
                <Route exact path={["/", "/home"]} name="Home Page" render={props => (
                  <CFade>
                    <Home {...props} />
                  </CFade>
                )} />
                <Route exact path="/profile" name="Profile Page" render={props => (
                  <CFade>
                    <Profile {...props} />
                  </CFade>
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
              </Switch>
            </Suspense>
          </Router>
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

export default connect(mapStateToProps)(App);
