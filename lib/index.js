const Koa = require("koa");

class EggPlus {
  constructor(options) {
    this.$app = new Koa(options);
  }

  start(...args) {
    this.$app.listen(...args);
  }
}

module.exports = EggPlus;
