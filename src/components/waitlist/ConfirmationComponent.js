import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { ConfirmOwner } from "../api/WaitlistDataService";

function ConfirmationComponent(props) {
  const [errorMessages, setErrorMessages] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.token) {
      const confirm = async () => {
        const data = await ConfirmOwner(params.token);
        console.log(data);
        if (!data.success) {
          setErrorMessages(data.message);
        } else {
          setSuccessMessage(data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      };
      confirm().catch((err) => {
        console.error(err);
      });
    }
  }, [params.token, navigate]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="my-5">User Confirmation</h1>
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
      </div>
    </div>
  );
}

export default ConfirmationComponent;
