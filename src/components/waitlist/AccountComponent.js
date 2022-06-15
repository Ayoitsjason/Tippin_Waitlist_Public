import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Col, Row, Alert, Button, Container } from "react-bootstrap";
import { AuthContext, OwnerContext } from "../../context/WaitlistContext";
import SideNavigationComponent from "../layout/SideNavigationComponent";
import { GetSocialLinks, updateSocialLinks } from "../api/WaitlistDataService";

function AccountComponent({ updateAuth }) {
  const isLoggedIn = useContext(AuthContext);
  const owner = useContext(OwnerContext);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [googleURL, setGoogleURL] = useState("");
  const [yelpURL, setYelpURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const [displayErrorMessage, setDisplayErrorMessage] = useState("");

  useEffect(() => {
    if (owner) {
      setName(owner.name);
      setBusiness(owner.business);
    }
  }, [owner]);

  useEffect(() => {
    if (owner) {
      const getSocialLinks = async () => {
        const links = await GetSocialLinks();
        if (links) {
          setGoogleURL(links[0].google);
          setFacebookURL(links[1].yelp);
          setYelpURL(links[2].facebook);
        }
      };
      getSocialLinks().catch((err) => {
        setDisplayErrorMessage(err);
        setTimeout(() => {
          setDisplayErrorMessage("");
        }, 3000);
      });
    }
  }, [owner, displayMessage]);

  const onClickUpdate = async (props) => {
    let res = await updateSocialLinks(props);
    if (res === "Invalid Url") {
      setDisplayErrorMessage(res);
      setTimeout(() => {
        setDisplayErrorMessage("");
      }, 3000);
    } else {
      setDisplayMessage(res);
      setTimeout(() => {
        setDisplayMessage("");
      }, 3000);
    }
  };

  const displaySocialLinks = () => {
    return (
      <div className="container">
        <h3>Your Links</h3>
        <Container
          className="p-3"
          style={{ border: "1px solid black", borderRadius: "5px" }}
        >
          <Row className="my-1 justify-content-center align-items-center">
            <Col sm={3}>
              <h4 className="m-0">Google: </h4>
            </Col>
            <Col sm={9}>
              <p className="m-0 social-links__text">{googleURL}</p>
            </Col>
          </Row>
          <Row className="my-1 justify-content-center align-items-center">
            <Col sm={3}>
              <h4 className="m-0">Yelp: </h4>
            </Col>
            <Col sm={9}>
              <p className="m-0 social-links__text">{yelpURL}</p>
            </Col>
          </Row>
          <Row className="my-1 justify-content-center align-items-center">
            <Col sm={3}>
              <h4 className="m-0">Facebook: </h4>
            </Col>
            <Col sm={9}>
              <p className="m-0 social-links__text">{facebookURL}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  const SocialsSchema = Yup.object().shape({
    google: Yup.string().max(150, "Too Long! Max length 150 characters"),
    yelp: Yup.string().max(150, "Too Long! Max length 150 characters"),
    facebook: Yup.string().max(150, "Too Long! Max length 150 characters"),
  });

  return (
    <div className="App">
      <Row className="main-application__row m-0">
        {isLoggedIn ? (
          <SideNavigationComponent updateAuth={updateAuth} />
        ) : null}
        <Col xs={isLoggedIn ? "9" : "12"} className="mb-5">
          <h1 className="mt-5">Hello, {name}!</h1>
          <h2 className="my-5">{business}</h2>
          {displayMessage && (
            <Alert key="success" variant="success">
              {displayMessage}
            </Alert>
          )}
          {displayErrorMessage && (
            <Alert key="danger" variant="danger">
              {displayErrorMessage}
            </Alert>
          )}
          {displaySocialLinks()}
          <div className="container">
            <h3 className="my-5">Update Your Business Review Links</h3>
            <Formik
              initialValues={{
                google: googleURL,
                yelp: yelpURL,
                facebook: facebookURL,
              }}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onClickUpdate}
              validationSchema={SocialsSchema}
              enableReinitialize={true}
            >
              {({ touched, errors }) => (
                <Form>
                  <fieldset className="form-group">
                    <label>Google (optional)</label>
                    <Field className="form-control" type="text" name="google" />
                    {errors.google && touched.google ? (
                      <Alert key="warning" variant="warning">
                        {errors.google}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Yelp (optional)</label>
                    <Field className="form-control" type="text" name="yelp" />
                    {errors.yelp && touched.yelp ? (
                      <Alert key="warning" variant="warning">
                        {errors.yelp}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Facebook (optional)</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="facebook"
                    />
                    {errors.facebook && touched.facebook ? (
                      <Alert key="warning" variant="warning">
                        {errors.facebook}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <Button className="btn btn-primary" type="submit">
                    Update
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

export default AccountComponent;
