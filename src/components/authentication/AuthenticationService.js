export const LOCAL_STORAGE_ATTRIBUTE_TOKEN = "token";
export const LOCAL_STORAGE_ATTRIBUTE_TOKEN_EXPIRATION = "expiration";
export const LOCAL_STORAGE_ATTRIBUTE_NAME = "name";
export const LOCAL_STORAGE_ATTRIBUTE_BUSINESS = "business";

export const registerSuccessfulLogin = (owner, token, expiration) => {
  const { name, business } = owner;
  localStorage.setItem(LOCAL_STORAGE_ATTRIBUTE_TOKEN, token);
  localStorage.setItem(LOCAL_STORAGE_ATTRIBUTE_NAME, name);
  localStorage.setItem(LOCAL_STORAGE_ATTRIBUTE_BUSINESS, business);
  localStorage.setItem(LOCAL_STORAGE_ATTRIBUTE_TOKEN_EXPIRATION, expiration);
};

export const isUserLoggedIn = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_ATTRIBUTE_TOKEN);
  const expiration = localStorage.getItem(
    LOCAL_STORAGE_ATTRIBUTE_TOKEN_EXPIRATION
  );
  if (token === null || new Date(expiration) < new Date()) {
    logout();
    return false;
  }
  return true;
};

export const isValidToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_ATTRIBUTE_TOKEN);
  const expiration = localStorage.getItem(
    LOCAL_STORAGE_ATTRIBUTE_TOKEN_EXPIRATION
  );

  if (token === null || new Date(expiration) < new Date()) {
    return null;
  }
  return { token, expiration: new Date(expiration) };
};

export const isUserLoggedInGetAttributes = () => {
  const name = localStorage.getItem(LOCAL_STORAGE_ATTRIBUTE_NAME);
  const business = localStorage.getItem(LOCAL_STORAGE_ATTRIBUTE_BUSINESS);

  const owner = {
    name,
    business,
  };

  if (business === null) {
    return "";
  }
  return owner;
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_ATTRIBUTE_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_ATTRIBUTE_NAME);
  localStorage.removeItem(LOCAL_STORAGE_ATTRIBUTE_BUSINESS);
  localStorage.removeItem(LOCAL_STORAGE_ATTRIBUTE_TOKEN_EXPIRATION);
};
