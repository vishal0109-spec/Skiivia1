import { Dispatch } from 'redux';
import { LOGOUT } from '../Type';
import * as Storage from '../../Services/AsyncStorageConfig';

export const logOutAction = () => {
  return async (dispatch: Dispatch) => {
    await Storage.removeData('userInfo');
    dispatch({
      type: LOGOUT,
    });
  };
};
