const util = require("util");
const fs = require("fs");
const path = require("path");
const readFileAsync = util.promisify(fs.readFile);

export const readContentFile = async (filePath) => {
  // Eureka, you are using good code practices here!
  const content = await readFileAsync(path.join(__dirname, filePath), {
    encoding: "utf8",
  });
  return content;
};
