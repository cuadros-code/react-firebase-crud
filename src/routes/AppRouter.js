import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { useAuthState } from 'react-firebase-hooks/auth'
import CircularProgress from '@material-ui/core/CircularProgress';
import NavBar from "../components/NavBar";
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";

import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import { auth } from '../firebase-config'
import Footer from "../components/Footer";

export const AppRouter = () => {

  const [user, loading] = useAuthState(auth)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    user ? setIsAuth(true) : setIsAuth(false)
  }, [user])

  if (loading) {
    return <CircularProgress color="secondary" />
  }

  return (
    <Router>
      <NavBar />
      <Switch>

        {/* <Route path="/auth" component={Login} /> */}

        <PublicRouter
          isAuthenticated={isAuth}
          path="/auth"
          component={PublicRouterContainer}
        />

        <PrivateRouter
          isAuthenticated={isAuth}
          path="/profile"
          component={PrivateRouterContainer}
        />
      </Switch>

      <Redirect to="/profile/dashboard" />

    </Router>
  )
}


const PrivateRouterContainer = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/profile/dashboard" component={Dashboard} />
      </Switch>
    </div>
  )
}

const PublicRouterContainer = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Redirect to="/auth/login" />
      </Switch>
      <Footer />
    </div>
  )
}
