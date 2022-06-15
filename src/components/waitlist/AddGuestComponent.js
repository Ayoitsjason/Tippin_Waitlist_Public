import React, { useContext, useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Col,
  Row,
  ButtonGroup,
  ToggleButton,
  Alert,
} from "react-bootstrap";
import SideNavigationComponent from "../layout/SideNavigationComponent";
import { AddGuests } from "../api/WaitlistDataService";
import { AuthContext, OwnerContext } from "../../context/WaitlistContext";

function AddGuestComponent({ updateAuth, navigate }) {
  const isLoggedIn = useContext(AuthContext);
  const owner = useContext(OwnerContext);
  const [radioValue, setRadioValue] = useState("1");
  const [date, setDate] = useState(null);
  const [guestsId, setGuestsId] = useState(null);

  useEffect(() => {
    setDate(new Date().toISOString());
    setGuestsId(uuidv1());
  }, []);

  const radios = [
    { name: "1", value: "1" },
    { name: "2", value: "2" },
    { name: "3", value: "3" },
    { name: "4", value: "4" },
    { name: "5", value: "5" },
    { name: "6", value: "6" },
    { name: "7+", value: "7" },
  ];

  const onSubmit = async (props) => {
    const customers = await AddGuests(props);

    if (customers) {
      navigate("/");
    }
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const GuestsSchema = Yup.object().shape({
    guestsId: Yup.string()
      .max(50, "Too Long! Max length 50 characters")
      .required("Required"),
    firstName: Yup.string()
      .max(30, "Too Long! Max length 30 characters")
      .required("Required"),
    lastName: Yup.string()
      .max(30, "Too Long! Max length 30 characters")
      .required("Required"),
    number: Yup.string()
      .min(10, "Too Short! Min length 10 numbers")
      .max(13, "Too Long! Max length 13 numbers")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    email: Yup.string().email().required("Required"),
    partySize: Yup.string()
      .max(2, "Too Long! Max length 2 characters")
      .required("Required"),
    served: Yup.boolean().required(),
    date: Yup.string().max(40).required(),
  });

  return (
    <div className="App">
      <Row className="main-application__row m-0">
        {isLoggedIn ? (
          <SideNavigationComponent updateAuth={updateAuth} />
        ) : null}
        <Col xs={isLoggedIn ? "9" : "12"} className="mb-5">
          <h1 className="my-5">{owner.business}</h1>
          <div className="container">
            <h2>Join Waitlist now!</h2>
            <br />
            <h3 className="mb-4">Your information</h3>
            <Formik
              initialValues={{
                guestsId: guestsId,
                firstName: "",
                lastName: "",
                number: "",
                email: "",
                partySize: radioValue,
                served: false,
                date: date,
              }}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onSubmit}
              validationSchema={GuestsSchema}
              enableReinitialize={true}
            >
              {({ errors, touched }) => (
                <Form>
                  <h4>Select your party size:</h4>
                  <ButtonGroup className="my-4">
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        className={`party-size__component rounded-circle`}
                        type="radio"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => {
                          setRadioValue(e.currentTarget.value);
                        }}
                      >
                        <span className="party-size__component-text">
                          {radio.name}
                        </span>
                      </ToggleButton>
                    ))}
                  </ButtonGroup>

                  <fieldset className="form-group">
                    <label>First Name</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="firstName"
                    />
                    {errors.firstName && touched.firstName ? (
                      <Alert key="warning" variant="warning">
                        {errors.firstName}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Last Name</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="lastName"
                    />
                    {errors.lastName && touched.lastName ? (
                      <Alert key="warning" variant="warning">
                        {errors.lastName}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Mobile number</label>
                    <Field className="form-control" type="text" name="number" />
                    {errors.number && touched.number ? (
                      <Alert key="warning" variant="warning">
                        {errors.number}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Email address</label>
                    <Field className="form-control" type="text" name="email" />
                    {errors.email && touched.email ? (
                      <Alert key="warning" variant="warning">
                        {errors.email}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <Button className="btn btn-primary" type="submit">
                    Confirm
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddGuestComponent;
