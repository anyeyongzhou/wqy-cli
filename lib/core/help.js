const { program } = require("commander");

const helpOptions = () => {
  //增加options
  program.option(
    "-d --dest <dest>",
    "a destination folder,例如：-d /src/components"
  );
  program.option("-f --framework <framework>", "your framework");

  //监听指令的指向
  program.on("--help", function () {
    console.log("");
    console.log("Other:");
    console.log(" other options~");
  });
};

module.exports = {
  helpOptions,
};
