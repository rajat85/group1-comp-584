import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
const Profile = React.lazy(() => import('./profile.component'));
const Home = React.lazy(() => import('./home.component'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            <Route exact path="/profile" name="Profile Page" render={props => (
              <CFade>
                <Profile {...props} />
              </CFade>
            )} />
            <Route exact path="/home" name="Home Page" render={props => (
              <CFade>
                <Home {...props} />
              </CFade>
            )} />
            <Redirect from="/" to="/home" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
