import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthenticatedRoute from "./components/authentication/AuthenticatedRoute.js";
import Navigation from "./components/layout/Navigation.js";
import Waitlist from "./components/waitlist/Waitlist";
import Login from "./components/waitlist/Login";
import Signup from "./components/waitlist/Signup";
import Nopage from "./components/Nopage";
import AddGuestComponent from "./components/waitlist/AddGuestComponent";
import ReviewsComponent from "./components/waitlist/ReviewsComponent";
import LeaveReviewComponent from "./components/waitlist/LeaveReviewComponent";
import SplashComponent from "./components/splash/SplashComponent";
import {
  isUserLoggedIn,
  isUserLoggedInGetAttributes,
  isValidToken,
  logout,
} from "./components/authentication/AuthenticationService";
// Context
import { AuthContext, OwnerContext } from "./context/WaitlistContext";
import axios from "axios";
import WaitlistHistory from "./components/waitlist/WaitlistHistory";
import AccountComponent from "./components/waitlist/AccountComponent";
import ForgotPassword from "./components/waitlist/ForgotPasswordComponent";
import ResetPasswordComponent from "./components/waitlist/ResetPasswordComponent";
import ConfirmationComponent from "./components/waitlist/ConfirmationComponent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      owner: null,
      token: null,
    };
    this.logoutTimer = null;
    this.myInterceptor = null;
    this.updateAuth = this.updateAuth.bind(this);
  }

  componentDidMount() {
    this.setState({
      loggedIn: isUserLoggedIn(),
      owner: isUserLoggedInGetAttributes(),
      token: isValidToken(),
    });
    if (this.state.token && this.state.token.token) {
      const remainingTime = this.state.token.expiration.getTime() - new Date();
      this.logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(this.logoutTimer);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.token !== this.state.token) {
      if (this.state.token && this.state.token.token) {
        this.myInterceptor = axios.interceptors.request.use(
          (request) => {
            request.headers.authorization = `Bearer ${this.state.token.token}`;
            return request;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
        const remainingTime =
          this.state.token.expiration.getTime() - new Date();
        this.logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(this.logoutTimer);
        axios.interceptors.request.eject(this.myInterceptor);
        this.myInterceptor = null;
      }
    }
  }

  updateAuth() {
    this.setState({
      loggedIn: isUserLoggedIn(),
      owner: isUserLoggedInGetAttributes(),
      token: isValidToken(),
    });
  }

  render() {
    const WaitlistWithNavigation = withNavigation(Waitlist);
    const LoginWithNavigation = withNavigation(Login);
    const ForgotPasswordWithNavigation = withNavigation(ForgotPassword);
    const ResetPasswordWithNavigation = withNavigation(ResetPasswordComponent);
    const SignupWithNavigation = withNavigation(Signup);
    const AddGuestComponentWithNavigation = withNavigation(AddGuestComponent);
    const LeaveReviewComponentWithNavigation =
      withNavigation(LeaveReviewComponent);

    // Context states
    const { loggedIn, owner } = this.state;

    return (
      <AuthContext.Provider value={loggedIn}>
        <OwnerContext.Provider value={owner}>
          <BrowserRouter>
            <Navigation />
            <Routes>
              {!this.state.loggedIn ? (
                <Route path="/" element={<SplashComponent />} />
              ) : (
                <Route
                  path="/"
                  element={
                    <WaitlistWithNavigation updateAuth={this.updateAuth} />
                  }
                />
              )}
              <Route
                path="/login"
                element={<LoginWithNavigation updateAuth={this.updateAuth} />}
              />
              <Route
                path="/forgotpassword"
                element={<ForgotPasswordWithNavigation />}
              />
              <Route
                path="/resetpassword/:token"
                element={<ResetPasswordWithNavigation />}
              />
              <Route
                path="/ownerconfirmation/:token"
                element={<ConfirmationComponent />}
              />
              <Route path="/signup" element={<SignupWithNavigation />} />
              <Route
                path="/addguest"
                element={
                  <AuthenticatedRoute>
                    <AddGuestComponentWithNavigation
                      updateAuth={this.updateAuth}
                    />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/leavereview/:business"
                element={
                  <AuthenticatedRoute>
                    <LeaveReviewComponentWithNavigation
                      updateAuth={this.updateAuth}
                    />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  <AuthenticatedRoute>
                    <ReviewsComponent updateAuth={this.updateAuth} />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/waitlist-history"
                element={
                  <AuthenticatedRoute>
                    <WaitlistHistory updateAuth={this.updateAuth} />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <AuthenticatedRoute>
                    <AccountComponent updateAuth={this.updateAuth} />
                  </AuthenticatedRoute>
                }
              />
              <Route path="*" element={<Nopage />} />
            </Routes>
          </BrowserRouter>
        </OwnerContext.Provider>
      </AuthContext.Provider>
    );
  }
}

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

export default App;
