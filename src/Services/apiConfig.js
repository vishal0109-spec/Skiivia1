import axios from 'axios';
import { baseUrl } from './api';


// export const signUpRequest = async (name, email, password, phnNo) => {
//   const url =
//     'https://pba1-292270-ruby.b292270.dev.eastus.az.svc.builder.cafe/account/accounts';
//   const data = {
//     data: {
//       type: 'email_account',
//       attributes: {
//         full_name: name,
//         email: email,
//         password: password,
//         full_phone_number: phnNo,
//       },
//     },
//   };
//   const res = await axios.post(url, data);
//   return res;
// };

// export const loginRequest = async (email, password) => {
//     const url =
//       'https://pba1-292270-ruby.b292270.dev.eastus.az.svc.builder.cafe/login/login';
//     const data = {
//       data: {
//         type: 'email_account',
//         attributes: {
//           email: email,
//           password: password,
//         },
//       },
//     };
//     const res = await axios.post(url, data);
//     console.log(res.data);
//     return res;
//   };

export class ApiConfig {
  // get
  async getJSON(url) {
    try {
      const fetchURL = async () => {
        const response = await axios.get(baseUrl + url, {
          headers: {
            'Content-type': 'application/json',
          },
        });
        return response.data;
      };
      return await fetchURL();
    } catch (error) {
      throw error;
    }
  }

  // post
  async postJSON(url, params = {}) {
    try {
      var body = JSON.stringify(params);
      const fetchURL = async () => {
        
        const response = await axios.post(baseUrl + url, body, {
          headers: {
            'Content-type': 'application/json',
          },
        });
        
        return response.data;
      };
      return await fetchURL();
    } catch (error) {
      console.log('ERROR', url, params, error);
      throw error;
    }
  }
}
