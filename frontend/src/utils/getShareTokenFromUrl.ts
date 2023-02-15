export const getShareTokenFromUrl = () => {
  return window.location.pathname.replace("/share/chart/", "");
};
