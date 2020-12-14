const Koa = require("koa");
const { initRouter, initController, initService } = require("./loader");

class EggPlus {
  constructor(options) {
    this.$app = new Koa(options);

    this.$ctrl = initController(this);
    this.$router = initRouter(this);
    this.$service = initService();

    this.$app.use(this.$router.routes());
  }

  start(...args) {
    this.$app.listen(...args);
  }
}

module.exports = EggPlus;
