const fs = require("fs");

fs.readFile(
  "D:/web dev/Web DEv 100x/0-1/Assignment/week-2/01-async-js/easy/data.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  }
);
