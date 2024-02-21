import { LOGIN } from '../Type';
import * as  Storage from '../../Services/AsyncStorageConfig';


export function loginAction () {
  return async(dispatch) =>{
   await Storage.saveData('userInfo','true');
   dispatch({
    type:LOGIN,
    payload:true,
   });
  };
}


