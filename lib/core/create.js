const { program } = require("commander");
const {
  createProjectAction,
  addCpnAction,
  addPageAction,
  addStoreAction,
} = require("./actions");

const createCommands = () => {
  program
    .command("create <project> [others...]")
    .description("clone repository into a folder")
    .action(createProjectAction);

  program
    .command("addcpn <name> [others...]")
    .description(
      "add vue component,例如:wqy addcpn HelloWorld -d src/components"
    )
    .action(name => {
      addCpnAction(name, program.opts().dest || "src/components");
    });

  program
    .command("addpage <page> [others...]")
    .description(
      "add vue page and router config,例如:wqy addpage Home [-d src/pages]"
    )
    .action(page => {
      addPageAction(page, program.opts().dest || `src/pages/${page}`);
    });

  program
    .command("addstore <store> [others...]")
    .description(
      "add vue's vuex store ,例如:wqy addstore congif [-d src/store]"
    )
    .action(store => {
      addStoreAction(
        store,
        program.opts().dest || `src/store/modules/${store}`
      );
    });
};

module.exports = {
  createCommands,
};
