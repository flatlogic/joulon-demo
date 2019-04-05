export const CHANGE_THEME = 'CHANGE_THEME';
export const NOTIFY_FONTS_DOWNLOADED = 'NOTIFY_FONTS_DOWNLOADED';

export function changeTheme(payload) {
  return {
    type: CHANGE_THEME,
    payload,
  };
}

export function notifyFontsDownloaded() {
  return {
    type: NOTIFY_FONTS_DOWNLOADED,
  };
}


