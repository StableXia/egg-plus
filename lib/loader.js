const fs = require("fs");
const path = require("path");
const KoaRouter = require("koa-router");

const root = path.resolve(__dirname, "../example/server");

/**
 * @description 扫描文件夹下的文件，并通过 callback 对文件进行相应处理，不做文件夹嵌套处理
 */
function load(dir, cb) {
  // 获取绝对路径
  const url = path.join(root, dir);
  // 读取当前文件夹下的所有文件
  const files = fs.readdirSync(url);

  files.forEach((v) => {
    const filename = v.replace(".js", "");
    const fileContent = require(`${url}/${filename}`);
    cb(filename, fileContent);
  });
}

function initRouter(app) {
  const router = new KoaRouter();

  load("routes", (filename, fileContent) => {
    const prefix = filename === "index" ? "" : `/${filename}`;
    const routes =
      typeof fileContent === "function" ? fileContent(app) : fileContent;

    // 路由注册
    Object.keys(routes).forEach((key) => {
      const [method, path] = key.split(" ");

      router[method](`${prefix}${path}`, async (ctx) => {
        app.ctx = ctx;
        await routes[key](app);
      });
    });
  });

  return router;
}

function initController(app) {
  const ctrl = {};

  load("controller", (filename, fileContent) => {
    ctrl[filename] =
      typeof fileContent === "function" ? fileContent(app) : fileContent;
  });

  return ctrl;
}

function initService() {
  const services = {};

  load("service", (filename, fileContent) => {
    services[filename] =
      typeof fileContent === "function" ? fileContent() : fileContent;
  });

  return services;
}

module.exports = {
  initRouter,
  initController,
  initService,
};
