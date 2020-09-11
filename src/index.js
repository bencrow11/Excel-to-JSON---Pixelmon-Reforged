const readXlsxFile = require("read-excel-file/node");
const fs = require("fs");
const path = require("path");
const logging = require("./logging.js");

// Prepare the config object
let config = {
  items: [],
};

// Make a read me file
if (!fs.existsSync("./readme.txt")) {
  const readme = `Format:
ID  - NAME  - ITEM DATA - NBT DATA  - BUY PRICE - SELL PRICE

Note: please ensure all blank spaces are replaced with a "0".
  `;
  fs.writeFileSync("./readme.txt", readme);
}

// Looks for excel file
fs.readdir(`./`, (err, files) => {
  let excelFiles = [];

  files.forEach((el) => {
    if (path.extname(el) == ".xlsx") {
      excelFiles.push(el);
    }
  });

  // reads the excel file
  if (excelFiles[0]) {
    readXlsxFile(`./${excelFiles[0]}`).then((rows) => {
      // Adds each row to the object
      rows.forEach((row) => {
        let obj = {
          id: row[0],
          name: row[1],
        };
        if (row[0] === null || row[1] === null || row[4] === null) {
        } else {
          if (row[2] !== 0) obj.itemData = row[2];
          if (row[3] !== 0) obj.nbtData = row[3];
          if (row[5] !== 0) obj.sell = row[5];
          if (row[4] !== 0) obj.buy = row[4];
          config.items.push(obj);
        }
      });

      // writing json to file
      let fileName = excelFiles[0];
      let extension = path.extname(fileName);
      let file = path.basename(fileName, extension);
      let data = JSON.stringify(config, null, 2);
      fs.writeFileSync(`./${file}.json`, data);
    });
  } else {
    logging(
      "No Excel file found, please put the xlsx file into the same directory."
    );
  }
});
