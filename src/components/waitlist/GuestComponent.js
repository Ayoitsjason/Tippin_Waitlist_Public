import React from "react";
import { Button } from "react-bootstrap";

const GuestComponent = ({
  customer,
  onClickDelete,
  priority,
  onClickUpdateServed,
}) => {
  return (
    <div className="row border border-light p-3 m-2 rounded waitlist__customers">
      <div className="col-1">
        <p className="font-weight-bold">{priority}</p>
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
      <div className="col">
        <div className="action-container">
          <Button
            className="btn-main rounded-circle m-1"
            onClick={() => onClickUpdateServed(customer.guestsId)}
          >
            &#10004;
          </Button>
          <Button
            className="btn-danger material-icons__trashcan m-1"
            onClick={() => onClickDelete(customer.guestsId)}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default GuestComponent;
