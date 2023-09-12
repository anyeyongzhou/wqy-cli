const { promisify } = require("util");
const path = require("path");
const download = promisify(require("download-git-repo"));
const open = require("open");

const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const { compile, writeToFile, createDirSync } = require("../utils/utils");

const createProjectAction = async project => {
  //1.clone项目
  await download(vueRepo, project, { clone: true });
  //2.执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${project}` });
  //3.运行npm run server
  commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
  //4.打开浏览器
  open("http://localhost:8080");
};

//创建一个组件的命令
const addCpnAction = async (name, dest) => {
  //1.有对应的ejs模版
  //2.编译ejs模版得到result
  const result = await compile("component.vue.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  //3.将result写入到.vue文件中,放到对应的文件夹中
  if (createDirSync(dest)) {
    const targetPath = path.resolve(dest, `${name}.vue`);
    writeToFile(targetPath, result);
  }
};

//添加page和路由
const addPageAction = async (name, dest) => {
  //1.编辑ejs模版
  const data = {
    name,
    lowerName: name.toLowerCase(),
  };
  const pageResult = await compile("component.vue.ejs", data);
  const routerResult = await compile("vue-router.js.ejs", data);
  //2.将result写入到.vue文件中
  if (createDirSync(dest)) {
    const targetPagePath = path.resolve(dest, `${name}.vue`);
    const targetRouterPath = path.resolve(dest, "router.js");
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRouterPath, routerResult);
  }
};

//创建数据仓库store
const addStoreAction = async (name, dest) => {
  const storeResult = await compile("vue-store.js.ejs", {});
  const typeResult = await compile("vue-types.js.ejs", {});

  if (createDirSync(dest)) {
    const targetPagePath = path.resolve(dest, `${name}.js`);
    const targetRouterPath = path.resolve(dest, "types.js");
    writeToFile(targetPagePath, storeResult);
    writeToFile(targetRouterPath, typeResult);
  }
};

module.exports = {
  createProjectAction,
  addCpnAction,
  addPageAction,
  addStoreAction,
};
