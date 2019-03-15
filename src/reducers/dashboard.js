import { CHANGE_THEME } from '../actions/dashboard';

export const DashboardThemes = {
  TRANSPARENT: "transparent",
  SOLID: "solid"
};

Object.freeze(DashboardThemes);

const defaultState = {
  dashboardTheme: DashboardThemes.SOLID
};

export default function dashboardReducer(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        dashboardTheme: action.payload
      };
    default:
      return state;
  }
}
