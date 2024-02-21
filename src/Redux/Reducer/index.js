import {combineReducers} from 'redux';
//user-define Import files
import {loginReducer} from '../Reducer/loginReducer';
const appReducer = combineReducers({
  loginReducer,
});
export default appReducer;