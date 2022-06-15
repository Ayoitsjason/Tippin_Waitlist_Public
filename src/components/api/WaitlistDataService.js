import axios from "axios";

// Auth
export const RegisterOwner = async (props) => {
  const body = JSON.stringify(props);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/register`,
      body,
      config
    );
    return { success: true, message: res.data.message };
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const LoginOwner = async (props) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(props);

  try {
    let res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/login`,
      body,
      config
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const ConfirmOwner = async (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ confirmationToken: token });

  try {
    let res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/confirmation`,
      body,
      config
    );
    return { success: true, message: res.data };
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const OwnerForgotPassword = async (props) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(props);

  try {
    let res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/forgotpassword`,
      body,
      config
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

export const OwnerResetPassword = async (props) => {
  const { token, password } = props;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ token, password });

  try {
    let res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/resetpassword`,
      body,
      config
    );
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, message: err.response.data.message };
  }
};

// Owner account
export const updateSocialLinks = async (props) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(props);

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/updatesocials`,
      body,
      config
    );
    return res.data;
  } catch (err) {
    return err.response.data.message;
  }
};

export const GetSocialLinks = async (business) => {
  let businessName = "";
  if (business) {
    businessName = business.substring(1, business.length);
  }

  const body = {
    params: {
      business: businessName,
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/sociallinks`,
      body
    );
    return res.data.socials;
  } catch (err) {
    console.error(err);
  }
};

// Leave Review
export const LeaveReview = async ({
  reviewId,
  business,
  satisfaction,
  name,
  technician,
  comment,
  date,
}) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const review = {
    reviewId,
    business: business.slice(1, business.length),
    satisfaction,
    name,
    technician,
    comment,
    date,
  };

  const body = JSON.stringify(review);

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/leavereview`,
      body,
      config
    );
    return res.data.review;
  } catch (err) {
    console.error(err);
  }
};

// Waitlist
export const GetWaitlist = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/waitlist`
    );
    return res.data.customers;
  } catch (err) {
    console.error(err);
  }
};

export const AddGuests = async (props) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(props);

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/addguests`,
      body,
      config
    );

    return res.data.customer;
  } catch (err) {
    console.error(err);
  }
};

export const UpdateGuestsServed = async (props) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(props);

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/serveguests`,
      body,
      config
    );

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const DeleteGuests = async (guestsId) => {
  const target = { guestsId };

  const data = target;

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/deleteguests`,
      { data }
    );
    return res.data.customer;
  } catch (err) {
    console.error(err);
  }
};

export const getAllReviews = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/owner/reviews`
    );

    return res.data.allReviews;
  } catch (err) {
    console.error(err);
  }
};
