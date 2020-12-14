const Koa = require("koa");
const { initRouter } = require("./loader");

class EggPlus {
  constructor(options) {
    this.$app = new Koa(options);

    this.$router = initRouter(this);

    this.$app.use(this.$router.routes());
  }

  start(...args) {
    this.$app.listen(...args);
  }
}

module.exports = EggPlus;
