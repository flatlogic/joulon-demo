import { CHANGE_THEME, NOTIFY_FONTS_DOWNLOADED } from '../actions/layout';

export const DashboardThemes = {
  TRANSPARENT: "transparent",
  SOLID: "solid"
};

Object.freeze(DashboardThemes);

const defaultState = {
  dashboardTheme: DashboardThemes.SOLID
};

export default function layoutReducer(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        dashboardTheme: action.payload
      };
    case NOTIFY_FONTS_DOWNLOADED:
      return {
        ...state,
        fontsDownloaded: true
      };
    default:
      return state;
  }
}
