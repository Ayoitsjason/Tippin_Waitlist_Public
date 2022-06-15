import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Alert } from "react-bootstrap";
import * as Yup from "yup";
import { OwnerForgotPassword } from "../api/WaitlistDataService";

function ForgotPasswordComponent({ navigate }) {
  const [errorMessages, setErrorMessages] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (values, resetForm) => {
    const data = await OwnerForgotPassword(values);
    if (data.success) {
      setSuccessMessage(data.data);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setErrorMessages(data.message);
      setTimeout(() => {
        setErrorMessages("");
      }, 3000);
    }
    resetForm({ values: "" });
  };

  const ForgotPassSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
  });

  return (
    <div className="App">
      <div className="container">
        <h1 className="my-5">Forgot Password</h1>
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
          initialValues={{ email: "" }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => onSubmit(values, resetForm)}
          validationSchema={ForgotPassSchema}
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

export default ForgotPasswordComponent;
