const fs = require("fs");

module.exports = function (msg) {
  const currentDate = new Date();
  fs.appendFile(
    "./errors.txt",
    `
${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}-${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()} - ${msg}
    `,
    (err) => {
      if (err) throw err;
    }
  );
};
