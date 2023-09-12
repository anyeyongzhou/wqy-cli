#! /usr/bin/env node
const { program } = require("commander");
const { helpOptions } = require("./lib/core/help");
const { createCommands } = require("./lib/core/create");

//查看版本号
program.version(
  require("./package.json").version,
  "-v, --version",
  "output the current version"
);

//帮助和可选信息
helpOptions();

//创建其它指令
createCommands();

//解析进程中的参数
program.parse(process.argv);
