import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Moment from "react-moment";
import { AuthContext, OwnerContext } from "../../context/WaitlistContext";
import { GetWaitlist } from "../api/WaitlistDataService";
import SideNavigationComponent from "../layout/SideNavigationComponent";

function WaitlistHistory({ updateAuth }) {
  const isLoggedIn = useContext(AuthContext);
  const owner = useContext(OwnerContext);
  const [waitlistHistory, setWaitlistHistory] = useState([]);

  useEffect(() => {
    if (owner) {
      (async function () {
        let waitlistHistory = await GetWaitlist(owner.business);
        setWaitlistHistory(waitlistHistory);
      })();
    }
  }, [owner]);

  const populatePreviousGuests = (customer) => {
    return (
      <div
        key={customer.guestsId}
        className="row border border-light p-3 m-2 rounded waitlist__customers"
      >
        <div className="col">
          <p className="font-weight-bold">
            <Moment>{customer.date}</Moment>
          </p>
        </div>
        <div className="col">
          <p className="font-weight-bold text-capitalize">
            {customer.firstName} {customer.lastName}
          </p>
        </div>
        <div className="col">
          <p>Party Size: {customer.partySize}</p>
        </div>
        <div className="col">
          <p>Number: {customer.number}</p>
        </div>
      </div>
    );
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
          <h3 className="my-5">Waitlist History</h3>
          {waitlistHistory && waitlistHistory.length > 0 ? (
            waitlistHistory.map((customer) =>
              customer.served ? populatePreviousGuests(customer) : null
            )
          ) : (
            <p>No History...</p>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default WaitlistHistory;
