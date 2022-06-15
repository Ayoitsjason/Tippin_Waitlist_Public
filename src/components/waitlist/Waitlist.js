import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import SideNavigationComponent from "../layout/SideNavigationComponent.js";
import {
  GetWaitlist,
  DeleteGuests,
  UpdateGuestsServed,
} from "../api/WaitlistDataService.js";
import "./Waitlist.css";
import GuestComponent from "./GuestComponent.js";
import { AuthContext, OwnerContext } from "../../context/WaitlistContext.js";

function Waitlist({ updateAuth, navigate }) {
  const loggedIn = useContext(AuthContext);
  const owner = useContext(OwnerContext);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (owner) {
      GetWaitlist()
        .then((res) => {
          let newList = res.filter((el) => !el.served);
          setCustomers(newList);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [owner]);

  const refreshCustomers = () => {
    GetWaitlist()
      .then((res) => {
        let newList = res.filter((el) => !el.served);
        setCustomers(newList);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Delete a populated Customer
  const onClickDelete = (guestsId) => {
    DeleteGuests(guestsId)
      .then((customer) => {
        refreshCustomers();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Delete a populated Customer
  const onClickUpdateServed = (guestsId) => {
    UpdateGuestsServed({
      guestsId: guestsId,
      served: true,
    })
      .then((customer) => {
        refreshCustomers();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Populates Customers
  const populateCustomers = (customer, i) => {
    return (
      <GuestComponent
        priority={i}
        key={customer.guestsId}
        customer={customer}
        onClickDelete={onClickDelete}
        onClickUpdateServed={onClickUpdateServed}
      />
    );
  };

  // Add Guest Button
  const addGuestsClick = () => {
    navigate(`/addguest`);
  };

  // Leave a review Button
  const addLeaveReviewClick = () => {
    navigate(`/leavereview/:royals`);
  };

  return (
    <div className="App">
      <Row className="main-application__row m-0">
        {loggedIn ? <SideNavigationComponent updateAuth={updateAuth} /> : null}

        <Col xs={loggedIn ? "9" : "12"} className="mb-5">
          <div className="container-xl">
            <h1 className="my-5">Waitlist</h1>
            <div className="container px-3">
              <Button
                className="btn-main mb-4 mx-2"
                onClick={() => addGuestsClick()}
              >
                + Add Guest
              </Button>
              <Button
                className="btn-main mb-4 mx-2"
                onClick={() => addLeaveReviewClick()}
              >
                + Leave Review
              </Button>
              {customers && customers.length > 0
                ? customers.map((customer, i) =>
                    populateCustomers(customer, i + 1)
                  )
                : null}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Waitlist;
