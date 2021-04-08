import { Redirect, Route } from "react-router-dom"

export const PublicRouter = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <div>
      <Route {...rest}
        component={(props) => (
          (!isAuthenticated)
            ? <Component {...props} />
            : <Redirect to="/profile/dashboard" />
        )}
      />
    </div>
  )
}