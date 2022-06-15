import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Alert } from "react-bootstrap";
import * as Yup from "yup";
import { OwnerResetPassword } from "../api/WaitlistDataService";

function ResetPasswordComponent({ navigate }) {
  const [errorMessages, setErrorMessages] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();

  const onSubmit = async (values, resetForm) => {
    let error = confirmPassword(values.password, values.password2);
    if (error.length) {
      setErrorMessages(error);
      setTimeout(() => {
        setErrorMessages("");
      }, 3000);
    }

    const data = await OwnerResetPassword(values);
    if (!data.success) {
      setErrorMessages(data.message);
      setTimeout(() => {
        setErrorMessages("");
      }, 3000);
    } else {
      setSuccessMessage(data.data);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    resetForm({ values: "" });
  };

  function confirmPassword(password, password2) {
    let error = "";
    if (password !== password2) {
      error = "Passwords do not match!";
    }
    return error;
  }

  const ResetPasswordSchema = Yup.object().shape({
    token: Yup.string().max(64, "Invalid Token!").required(),
    password: Yup.string()
      .min(6, "Too Short! Min Length 6 characters")
      .max(30, "Too Long! Max Length 30 characters")
      .required("Required"),
    password2: Yup.string()
      .min(6, "Too Short! Min Length 6 characters")
      .max(30, "Too Long! Max Length 30 characters")
      .required("Required"),
  });

  return (
    <div className="App">
      <div className="container">
        <h1 className="my-5">Reset Password</h1>
        {errorMessages ? (
          <Alert key="danger" variant="danger">
            {errorMessages}
          </Alert>
        ) : null}
        {successMessage ? (
          <Alert key="success" variant="success">
            {successMessage}
          </Alert>
        ) : null}
        <Formik
          initialValues={{ token: params.token, password: "", password2: "" }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
          validationSchema={ResetPasswordSchema}
          enableReinitialize={true}
        >
          {({ errors, touched }) => (
            <Form>
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
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;
