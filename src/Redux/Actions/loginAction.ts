import { LOGIN } from '../Type';
import * as  Storage from '../../Services/AsyncStorageConfig';
import { Dispatch } from 'redux';

interface UserData {
  email: string;
  name: string | null;
  photo: string | null;
}

export function loginAction (userData: UserData ) {
  return async(dispatch: Dispatch) =>{
   await Storage.saveData('userInfo','true');
   dispatch({
    type:LOGIN,
    payload:true,
   });
  };
}

