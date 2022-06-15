import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import { RegisterOwner } from "../api/WaitlistDataService";

function Signup(props) {
  const [displayMessage, setDisplayMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const onSubmit = async (values) => {
    let error = confirmPassword(values.password, values.password2);
    if (error.length < 1) {
      const data = await RegisterOwner(values);
      if (data.success) {
        setDisplayMessage(data.message);
        setTimeout(() => {
          props.navigate("/");
        }, 2500);
      } else if (!data.success) {
        setErrorMessages(data.message);
        setTimeout(() => {
          setErrorMessages("");
        }, 3000);
      }
    } else {
      setErrorMessages(error);
      setTimeout(() => {
        setErrorMessages("");
      }, 2500);
    }
  };

  const SignUpSchema = Yup.object().shape({
    firstname: Yup.string()
      .max(20, "Too Long! Max length 20 characters")
      .required("Required"),
    lastname: Yup.string()
      .max(20, "Too Long! Max length 20 charasters")
      .required("Required"),
    password: Yup.string()
      .min(6, "Too Short! Min Length 6 characters")
      .max(30, "Too Long! Max Length 30 characters")
      .required("Required"),
    password2: Yup.string()
      .min(6, "Too Short! Min Length 6 characters")
      .max(30, "Too Long! Max Length 30 characters")
      .required("Required"),
    email: Yup.string().email().required("Required"),
    businessName: Yup.string()
      .max(30, "Too long! Max Length 30 characters")
      .required("Required"),
  });

  function confirmPassword(password, password2) {
    let error = "";
    if (password !== password2) {
      error = "Passwords do not match!";
    }
    return error;
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="my-5">Sign Up</h1>
        {displayMessage ? (
          <Alert key="success" variant="success">
            {displayMessage}
          </Alert>
        ) : null}
        {errorMessages ? (
          <Alert key="danger" variant="danger">
            {errorMessages}
          </Alert>
        ) : null}
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            password: "",
            password2: "",
            email: "",
            businessName: "",
          }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
          validationSchema={SignUpSchema}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form>
              <fieldset className="form-group">
                <label>First Name</label>
                <Field className="form-control" type="text" name="firstname" />
                {errors.firstname && touched.firstname ? (
                  <Alert key="warning" variant="warning">
                    {errors.firstname}
                  </Alert>
                ) : null}
              </fieldset>
              <fieldset className="form-group">
                <label>Last Name</label>
                <Field className="form-control" type="text" name="lastname" />
                {errors.lastname && touched.lastname ? (
                  <Alert key="warning" variant="warning">
                    {errors.lastname}
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
              <fieldset className="form-group">
                <label>Confirm Password</label>
                <Field
                  className="form-control"
                  type="password"
                  name="password2"
                />
                {errors.password2 && touched.password2 ? (
                  <Alert key="warning" variant="warning">
                    {errors.password2}
                  </Alert>
                ) : null}
              </fieldset>
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
                <label>Business Name</label>
                <Field
                  className="form-control"
                  type="text"
                  name="businessName"
                />
                {errors.businessName && touched.businessName ? (
                  <Alert key="warning" variant="warning">
                    {errors.businessName}
                  </Alert>
                ) : null}
              </fieldset>
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
