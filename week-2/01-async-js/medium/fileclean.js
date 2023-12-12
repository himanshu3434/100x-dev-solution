const fs = require("fs");

function promisefied() {
  let f = new Promise((resolve) => {
    fs.readFile(
      "D:/web dev/Web DEv 100x/0-1/Assignment/week-2/01-async-js/medium/data.txt",
      "utf8",
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
        let ans = data.replace(/\s+/g, " ").trim();

        // console.log(top);
        fs.writeFile(
          "D:/web dev/Web DEv 100x/0-1/Assignment/week-2/01-async-js/medium/data.txt",
          ans,
          "utf8",
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("File written successfully.");
          }
        );
      }
    );
    resolve();
  });
  return f;
}

let a = promisefied();

a.then(() => {
  console.log("here");
  fs.readFile(
    "D:/web dev/Web DEv 100x/0-1/Assignment/week-2/01-async-js/medium/data.txt",
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    }
  );
});
