import { LOGIN, LOGIN_FAILURE, LOGOUT } from '../Type';

type ActionType = typeof LOGIN | typeof LOGIN_FAILURE | typeof LOGOUT;
interface LoginData {
  username: string;
  token: string;
}

interface State {
  hideProgress: boolean;
  loginData: LoginData | null;
}

interface LoginAction {
  type: ActionType;
  payload?: LoginData | boolean; 
}

const Initial_State: State = {
  hideProgress: false,
  loginData: null,
};

const loginReducer = (state: State = Initial_State, action: LoginAction): State =>  {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        hideProgress: true,
        loginData: action?.payload as LoginData,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        hideProgress: action?.payload as boolean,
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

export default loginReducer;