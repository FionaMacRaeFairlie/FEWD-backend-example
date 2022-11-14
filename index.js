const express = require("express");
const app = express();
const path = require("path");
const public = path.join(__dirname, "public");
app.use(express.static(public));

app.get("/", function (req, res) {
  res.send("Hello! Welcome to my application.");
});

app.get("/guestbook", function (req, res) {
  res.send("<h1>Guestbook Messages</h1>");
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(public, "about.html"));
});

app.get("/data", function (req, res) {
  res.json([{ name: "s" }]);
});

app.get("/xxx", function (req, res) {
  res.redirect("/");
});


app.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});

app.use(function (req, res) {
  res.status(404);
  res.send("Oops! We didn't find what you are looking for.");
});

app.listen(3001, () => {
  console.log("Server started on port 3001. Ctrl^c to quit.");
});
