import { LOGOUT} from '../Type';
import * as  Storage from '../../Services/AsyncStorageConfig';


export function logOutAction () {
  return async(dispatch) =>{
   await Storage.removeData('userInfo');
   dispatch({
    type:LOGOUT,
   });
  };
}


