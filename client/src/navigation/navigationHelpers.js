export const navigationHelpers = {
  goTo: (navigate, route) => {
    navigate(route);
  },

  goBack: (navigate) => {
    navigate(-1);
  },

  replace: (navigate, route) => {
    navigate(route, { replace: true });
  },
};

