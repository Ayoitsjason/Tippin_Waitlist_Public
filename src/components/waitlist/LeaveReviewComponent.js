import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  ToggleButton,
  ButtonGroup,
  Alert,
} from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { v1 as uuidv1 } from "uuid";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYelp,
  faGoogle,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import SideNavigationComponent from "../layout/SideNavigationComponent";
import { LeaveReview, GetSocialLinks } from "../api/WaitlistDataService";
import { AuthContext } from "../../context/WaitlistContext";

function LeaveReviewComponent({ navigate, updateAuth }) {
  const isLoggedIn = useContext(AuthContext);
  const [radioValue, setRadioValue] = useState("3");
  const [business, setBusiness] = useState("");
  const [date, setDate] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [googleURL, setGoogleURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [yelpURL, setYelpURL] = useState("");
  const params = useParams();

  useEffect(() => {
    setBusiness(params.business);
    setDate(new Date().toISOString());
    setReviewId(uuidv1());

    if (business) {
      const getSocialLinks = async (business) => {
        const links = await GetSocialLinks(business);
        if (links) {
          setGoogleURL(links[0].google);
          setYelpURL(links[1].yelp);
          setFacebookURL(links[2].facebook);
        }
      };
      getSocialLinks(params.business).catch((err) => {
        console.error(err);
      });
    }
  }, [params.business, business]);

  const radios = [
    { value: "5" },
    { value: "4" },
    { value: "3" },
    { value: "2" },
    { value: "1" },
  ];

  const onSubmit = async (form) => {
    const review = await LeaveReview(form);
    if (review) {
      navigate("/");
    }
  };

  const showReviewSocialLinks = () => {
    return radioValue > 3 ? (
      <div className="container socials mb-5 p-3">
        <h3 className="mb-2">
          Please feel free to leave review on our socials (optional)
        </h3>
        <a href={googleURL} target="_blank" rel="noreferrer noopener">
          <FontAwesomeIcon
            className="mx-4 socials-icon"
            icon={faGoogle}
            size="4x"
          />
        </a>
        <a href={yelpURL} target="_blank" rel="noreferrer noopener">
          <FontAwesomeIcon
            className="mx-4 socials-icon"
            icon={faYelp}
            size="4x"
          />
        </a>
        <a href={facebookURL} target="_blank" rel="noreferrer noopener">
          <FontAwesomeIcon
            className="mx-4 socials-icon"
            icon={faFacebook}
            size="4x"
          />
        </a>
      </div>
    ) : null;
  };

  const ReviewSchema = Yup.object().shape({
    reviewId: Yup.string()
      .max(50, "Too Long! Max length 50 characters")
      .required("Required"),
    business: Yup.string()
      .max(30, "Too Long! Max length 30 characters")
      .required("Required"),
    satisfaction: Yup.string()
      .max(2, "Too Long! Max length 2 characters")
      .required("Required"),
    name: Yup.string().max(30, "Too Long! Max length 30 characters"),
    technician: Yup.string().max(30, "Too Long! Max length 30 character"),
    comment: Yup.string()
      .max(750, "Too Long! Max length 750 characters")
      .required("Required"),
    date: Yup.string().max(40).required(),
  });

  return (
    <div className="App">
      <Row className="main-application__row m-0">
        {isLoggedIn ? (
          <SideNavigationComponent updateAuth={updateAuth} />
        ) : null}
        <Col xs={isLoggedIn ? "9" : "12"} className="mb-5">
          <h1 className="my-5">Leave a Review!</h1>
          <div className="container">
            <Formik
              initialValues={{
                reviewId: reviewId,
                business: business,
                satisfaction: radioValue,
                name: "Anonymous",
                technician: "N/A",
                comment: "",
                date: date,
              }}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={onSubmit}
              validationSchema={ReviewSchema}
              enableReinitialize={true}
            >
              {({ touched, errors }) => (
                <Form>
                  <h4>How satisfied were you?</h4>
                  <ButtonGroup className="my-4">
                    {radios.map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        className={`review__componentsSelected review__components-svg${radio.value} rounded-circle`}
                        type="radio"
                        variant={"light"}
                        name="satisfaction"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => {
                          setRadioValue(e.currentTarget.value);
                        }}
                      ></ToggleButton>
                    ))}
                  </ButtonGroup>
                  {showReviewSocialLinks()}
                  <fieldset className="form-group">
                    <label>Name (optional)</label>
                    <Field className="form-control" type="text" name="name" />
                    {errors.name && touched.name ? (
                      <Alert key="warning" variant="warning">
                        {errors.name}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Technician (optional)</label>
                    <Field
                      className="form-control"
                      type="text"
                      name="technician"
                    />
                    {errors.technician && touched.technician ? (
                      <Alert key="warning" variant="warning">
                        {errors.technician}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Comment (Max 750 Characters)</label>
                    <Field
                      className="form-control"
                      style={{ height: "8rem" }}
                      component="textarea"
                      type="text"
                      name="comment"
                    />
                    {errors.comment && touched.comment ? (
                      <Alert key="warning" variant="warning">
                        {errors.comment}
                      </Alert>
                    ) : null}
                  </fieldset>
                  <Button className="btn btn-primary" type="submit">
                    Submit
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

export default LeaveReviewComponent;
