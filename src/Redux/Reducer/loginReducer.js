import {LOGIN, LOGIN_FAILURE,LOGOUT} from '../Type';

export const Initial_State = {
  hideProgress:false,
  loginData:null,
};

export const loginReducer = (state = Initial_State, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        hideProgress: true,
        loginData: action?.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        hideProgress: action?.payload,
      };
      case LOGOUT:
      return {
        ...state,
        loginData: null,
      };
    default:
      return state;
  }
};
