import actionTypes from '../actions/actionTypes';

export default function reservesReducer(reserves = {}, action) {
  let reservesResult = reserves;
  switch (action?.type) {
    case actionTypes?.LOAD_RESERVES:
      reservesResult = action?.payload;
      break;

    case actionTypes.CREATE_RESERVES:
      break;

    default:
      break;
  }
  return reservesResult;
}
