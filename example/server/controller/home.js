module.exports = (app) => ({
  index: () => {
    app.ctx.body = app.$service.home.getUserList();
  },
  detail: () => {
    app.ctx.body = "ctrl detail";
  },
});
