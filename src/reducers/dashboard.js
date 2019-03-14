import { CHANGE_THEME } from '../actions/dashboard';

export const DashboardThemes = {
  DARK: "dark",
  LIGHT: "light"
};

Object.freeze(DashboardThemes);

const defaultState = {
  dashboardTheme: DashboardThemes.LIGHT
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
