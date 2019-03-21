import { FETCH_TABLE_DATA, RECEIVE_TABLE_DATA } from '../actions/dashboard';

const defaultState = {
  tableData: []
};

export default function dashboardReducer(state = defaultState, action) {
  switch (action.type) {
    case FETCH_TABLE_DATA:
      return state;
    case RECEIVE_TABLE_DATA:
      return {
        ...state, tableData: action.payload
      };
    default:
      return state;
  }
}
