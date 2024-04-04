import axios from 'axios';

export const signUpRequest = async (name, email, password, phnNo) => {
  const url =
    'https://pba1-292270-ruby.b292270.dev.eastus.az.svc.builder.cafe/account/accounts';
  const data = {
    data: {
      type: 'email_account',
      attributes: {
        full_name: name,
        email: email,
        password: password,
        full_phone_number: phnNo,
      },
    },
  };
  const res = await axios.post(url, data);
  return res;
};

export const loginRequest = async (email, password) => {
    const url =
      'https://pba1-292270-ruby.b292270.dev.eastus.az.svc.builder.cafe/login/login';
    const data = {
      data: {
        type: 'email_account',
        attributes: {
          email: email,
          password: password,
        },
      },
    };
    const res = await axios.post(url, data);
    console.log(res.data);
    return res;
  };
