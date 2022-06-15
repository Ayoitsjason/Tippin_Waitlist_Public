import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "./AuthenticationService";

class AuthenticatedRoute extends Component {
  render() {
    if (isUserLoggedIn()) {
      return { ...this.props.children };
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default AuthenticatedRoute;
