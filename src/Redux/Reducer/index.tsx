import {combineReducers} from 'redux';
//user-define Import files
import loginReducer from './loginReducer';

const appReducer = combineReducers({
  loginReducer,
});
export default appReducer;