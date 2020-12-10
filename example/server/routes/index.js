module.exports = (app) => ({
  "get /": app.$ctrl.home.index,
  "get /detail": () => {
    return app.$ctrl.home.detail;
  },
});
