import React from "react"
import { Switch, Route } from "react-router-dom"
import Login from "./screens/Login/Login"
import Signup from "./screens/Signup/Signup"
import Home from "./screens/Home/Home"

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/home" component={Home} />
    </Switch>
  )
}

export default AppRoutes