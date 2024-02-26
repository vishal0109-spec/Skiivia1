export const isValidLength = (input, setPassError) => {
  if (!input) {
    setPassError('Password Required');
    return false;
  } else if (input.length < 8) {
    setPassError('Incorrect Password');
    return false;
  } else if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
    setPassError('Provide Strong Password');
    return false;
  } else if (!/[^A-Za-z0-9]/.test(input)) {
    setPassError('Provide Strong Password');
    return false;
  } else {
    setPassError('');
    return true;
  }
};

export const validateEmail = (input, setError) => {
  const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  if (!input) {
    setError('Email required');
    return false;
  } else if (!emailPattern.test(input)) {
    setError('Invalid Email');
    return false;
  } else {
    setError('');
    return true;
  }
};
