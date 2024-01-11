/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const { log } = require("console");
// app.all("*", (req, res) => {
//   if (req.path === "/files") res.redirect("/files");
//   else if (req.path === "/files/") res.redirect("/files/:filename");
//   else res.status(404).send("Route not found");
// });
let files = [];

app.get("/files", (req, res) => {
  fs.readdir("files", (err, files) => {
    if (err) {
      return res.status(500).send("internal server error");
    }
    res.json(files);
  });
});

app.get("/file/:filename", (req, res) => {
  const file = req.params.filename;
  const filepath = path.join(__dirname, "./files/", file);
  fs.readFile(filepath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("File not found");
    }
    res.send(data);
  });
});

app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});
//app.listen(3000, () => log("Server Started"));
module.exports = app;

// app.get("/files/:filename", (req, res) => {
//   const file = req.params.filename;

//   const target_file = files.find((element) => element === file);
//   if (target_file) {
//     fs.readFile("./files/" + file, "utf-8", (err, data) => {
//       res.status(200).send(data);
//     });
//   } else res.status(404).send("File Not Found");
// });
