import axios from 'axios';
import actionTypes from './actionTypes';

export default function loadReserves() {
  return async (dispatch) => {
    const { data } = await axios.get('/api/reserveHandlerUser');
    dispatch({
      type: actionTypes.LOAD_RESERVES,
      payload: data,
    });
  };
}
