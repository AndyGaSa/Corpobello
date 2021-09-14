import axios from 'axios';
import actionTypes from './actionTypes';

export default function loadReserves() {
  return async (dispatch) => {
    const { data } = await axios.get('http://localhost:3000/api/reserveHandler');
    dispatch({
      type: actionTypes.LOAD_RESERVES,
      payload: data,
    });
  };
}
