import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Alert } from "react-bootstrap";
import * as Yup from "yup";
import { LoginOwner } from "../api/WaitlistDataService";
import { registerSuccessfulLogin } from "../authentication/AuthenticationService";

function Login({ navigate, updateAuth }) {
  const [errorMessages, setErrorMessages] = useState("");

  const onSubmit = async (values, resetForm) => {
    const data = await LoginOwner(values);
    if (data.success) {
      const { owner, token } = data.data;
      const tokenExpirationDate = new Date(
        new Date().getTime() + 1000 * 60 * 720
      );
      registerSuccessfulLogin(owner, token, tokenExpirationDate.toISOString());
      updateAuth();
      navigate("/");
    } else {
      resetForm({ values: "" });
      setErrorMessages(data.message);
      setTimeout(() => {
        setErrorMessages("");
      }, 3000);
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string()
      .max(30, "Too Long! Max length 30 charasters")
      .required("Required"),
  });

  return (
    <div className="App">
      <div className="container">
        <h1 className="my-5">Login</h1>
        {errorMessages ? (
          <Alert key="danger" variant="danger">
            {errorMessages}
          </Alert>
        ) : null}
        <Formik
          initialValues={{ email: "", password: "" }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
          validationSchema={LoginSchema}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form>
              <fieldset className="form-group">
                <label>Email</label>
                <Field className="form-control" type="email" name="email" />
                {errors.email && touched.email ? (
                  <Alert key="warning" variant="warning">
                    {errors.email}
                  </Alert>
                ) : null}
              </fieldset>
              <fieldset className="form-group">
                <label>Password</label>
                <Field
                  className="form-control"
                  type="password"
                  name="password"
                />
                {errors.password && touched.password ? (
                  <Alert key="warning" variant="warning">
                    {errors.password}
                  </Alert>
                ) : null}
              </fieldset>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              <Nav.Link className="my-3" as={Link} to="/forgotpassword">
                Forgot Password
              </Nav.Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
