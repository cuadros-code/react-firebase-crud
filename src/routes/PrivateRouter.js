import { Redirect, Route } from "react-router-dom"

export const PrivateRouter = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <div>
      <Route {...rest}
        component={(props) => (
          (isAuthenticated)
            ? <Component {...props} />
            : <Redirect to="/auth/login" />
        )}
      />
    </div>
  )
}