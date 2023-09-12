/**
 * 执行终端命令相关的代码
 */

const { spawn } = require("child_process");

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    childProcess.on("close", () => {
      resolve();
    });

    childProcess.on("error", function (code, signal) {
      console.log(code);
      console.log(signal);
      reject();
    });
  });
};

module.exports = {
  commandSpawn,
};
