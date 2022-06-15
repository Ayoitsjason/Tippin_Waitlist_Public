import React from "react";

const ReviewComponent = (props) => {
  const { satisfaction, name, technician, comment } = props.review;

  return (
    <div className="row border border-light p-3 m-2 rounded waitlist__customers">
      <div className="col">
        <p className="font-weight-bold text-capitalize">{name}</p>
      </div>
      <div className="col">
        <p>Rating: {satisfaction}</p>
      </div>
      <div className="col">
        <p>Technician: {technician}</p>
      </div>
      <div className="col">
        <p>Comment: {comment}</p>
      </div>
    </div>
  );
};

export default ReviewComponent;
