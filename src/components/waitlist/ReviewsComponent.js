import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext, OwnerContext } from "../../context/WaitlistContext";
import { getAllReviews } from "../api/WaitlistDataService";
import SideNavigationComponent from "../layout/SideNavigationComponent";
import ReviewComponent from "./ReviewComponent";

function ReviewsComponent({ updateAuth }) {
  const isLoggedIn = useContext(AuthContext);
  const owner = useContext(OwnerContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (owner) {
      (async function () {
        let allReviews = await getAllReviews();
        setReviews(allReviews);
      })();
    }
  }, [owner]);

  const populateReviews = (review) => {
    return <ReviewComponent key={review.reviewId} review={review} />;
  };

  return (
    <div className="App">
      <Row className="main-application__row m-0">
        {isLoggedIn ? (
          <SideNavigationComponent updateAuth={updateAuth} />
        ) : null}
        <Col xs={isLoggedIn ? "9" : "12"} className="mb-5">
          <h1 className="mt-5">Hello, {owner ? owner.name : null}!</h1>
          <h2 className="mt-5">{owner ? owner.business : null}</h2>
          <h3 className="my-5">Reviews</h3>
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => populateReviews(review))
          ) : (
            <p>No Reviews...</p>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ReviewsComponent;
