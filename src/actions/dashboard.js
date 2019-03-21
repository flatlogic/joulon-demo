import axios from "axios";
export const FETCH_TABLE_DATA = 'FETCH_TABLE_DATA';
export const RECEIVE_TABLE_DATA = 'RECEIVE_TABLE_DATA';


export function fetchTableData(payload) {
  return (dispatch) => {
    axios.get("/dashboard").then(res => {
      dispatch(receiveTableData(res.data));
    });
    dispatch({type: FETCH_TABLE_DATA, payload});
  }
}

export function receiveTableData(payload) {
  return {
    type: RECEIVE_TABLE_DATA,
    payload,
  };
}
