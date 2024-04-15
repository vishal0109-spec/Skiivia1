export const isValidLength = (input: string, setPassError: (error: string) => void): boolean => {
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

export const validateEmail = (input: string, setError: (error: string) => void): boolean => {
  const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  if (!input.trim()) {
    setError('Email required');
    return false;
  } else if (!emailPattern.test(input.trim())) {
    setError('Invalid Email');
    return false;
  } else {
    setError('');
    return true;
  }
};

export const validateRegister = (
  firstName: string,
  lastName: string,
  selectedSalutation: string | null,
  email: string,
  password: string,
  confrmPassword: string,
  phnNo: string,
  isChecked: boolean,
  dayValue: string,
  mnthValue: string,
  yearValue: string,
  setError: (error: string) => void,
  setPassError: (error: string) => void,
  setConfrmPasswordError: (error: string) => void,
): { [key: string]: string } => {
  let errorMsg: { [key: string]: string } = {};
  const nameRegex = /^[a-zA-Z]+$/;
  const phoneRegex = /^(?:[1-9][0-9]{9}|0[0-9]{10})$/;

  if (!firstName.trim()) {
    errorMsg.firstName = 'First Name is required!';
  } else if (!nameRegex.test(firstName.trim())) {
    errorMsg.firstName = 'Invalid First name!';
  } else if (firstName.length < 3) {
    errorMsg.firstName = 'Invalid First Name!';
  }

  if (!lastName.trim()) {
    errorMsg.lastName = 'Last Name is required!';
  } else if (!nameRegex.test(lastName.trim())) {
    errorMsg.lastName = 'Invalid Last Name!';
  } else if (lastName.length < 3) {
    errorMsg.lastName = 'Invalid Last Name!';
  }

  if (!selectedSalutation) {
    errorMsg.selectedSalutation = 'Salutation is required!';
  }

  if (!email) {
    setError('Email is required!');
  }

  if (!password) {
    setPassError('Password is required!');
  }

  if (!confrmPassword) {
    setConfrmPasswordError('Confirm your Password');
  } else if (confrmPassword !== password) {
    setConfrmPasswordError('Passwords do not match!');
  }

  if (!phnNo) {
    errorMsg.phnNo = 'Phone number is required!';
  } else if (!phoneRegex.test(phnNo)) {
    errorMsg.phnNo = 'Phone number should be 10 digits!';
  }

  if (!isChecked) {
    errorMsg.isChecked = 'Consent Required!';
  }

  if (!dayValue || !mnthValue || !yearValue) {
    errorMsg.dob = 'DOB is required!';
  } else {
    const [day, month, year] = [
      parseInt(dayValue),
      parseInt(mnthValue),
      parseInt(yearValue),
    ];

    if (month < 1 || month > 12) {
      errorMsg.dob = 'Invalid month!';
    } else {
      const lastDayOfMonth = new Date(year, month, 0).getDate();
      if (day < 1 || day > lastDayOfMonth) {
        errorMsg.dob = 'Invalid day!';
      } else {
        const dobDate = new Date(year, month - 1, day);
        if (
          dobDate.getFullYear() !== year ||
          dobDate.getMonth() + 1 !== month ||
          dobDate.getDate() !== day
        ) {
          errorMsg.dob = 'Invalid date!';
        }
      }
    }
  }

  return errorMsg;
};
