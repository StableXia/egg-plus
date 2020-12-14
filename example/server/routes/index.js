module.exports = (app) => ({
  "get /": () => {
    console.log(app);
    app.ctx.body = "index";
  },
  "get /detail": () => {
    app.ctx.body = "detail";
  },
});
