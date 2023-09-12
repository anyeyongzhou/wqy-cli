const ejs = require("ejs");
const path = require("path");
const { promisify } = require("util");
const fs = require("fs");

const renderFilePromise = promisify(ejs.renderFile);

const compile = async (templateName, data) => {
  const templatePositon = `../templates/${templateName}`;
  const templatPath = path.resolve(__dirname, templatePositon);

  const result = await renderFilePromise(templatPath, { data }, {});
  return result;
};

const writeToFile = (pathName, content) => {
  return fs.promises.writeFile(pathName, content);
};

const createDirSync = pathDir => {
  if (fs.existsSync(pathDir)) {
    return true;
  } else {
    if (createDirSync(path.dirname(pathDir))) {
      fs.mkdirSync(pathDir, err => {
        if (err) throw err;
      });
      return true;
    }
  }
};

module.exports = {
  compile,
  writeToFile,
  createDirSync,
};
