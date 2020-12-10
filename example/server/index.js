const EggPlus = require("../../lib");

const app = new EggPlus();

app.start(3001, () => {
  console.log("start");
});
