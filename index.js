const express = require("express");
const app = express();
const path = require("path");
const public = path.join(__dirname, "public");
const bodyParser = require("body-parser");

//**********code if using an SQLite3 database **************************************
// const sqlite3 = require("sqlite3").verbose();
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
//*********************************************************************************
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));

//**********code if using an SQLite3 database **************************************
// let db = new sqlite3.Database(
//   "./database/comments.db",
//   sqlite3.OPEN_READWRITE,
//   (err) => {
//     if (err) {
//       console.error(err.message);
//     } else console.log("Connected to the comments database.");
//   }
// );

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);
// app.use(helmet());
// db.run("CREATE TABLE IF NOT EXISTS newcomment(name TEXT, comment TEXT)");
//*********************************************************************************

const nedb = require("nedb");
const db = new nedb({ filename: "comments.db", autoload: true });

app.use(express.static(public));

app.get("/", function (req, res) {
  res.send("Hello! Welcome to my application.");
});

app.get("/guestbook", function (req, res) {
  //*********** basic html message output********************************************************
  //   res.send("<h1>Guestbook Messages</h1>");
  //*********** more html message output***********************************************************
  //   res.send(
  //     "<h1>Guestbook Messages</h1><p>This is a page which, once implemented, will allow users to fill out a form to give feedback</p>"
  //   );
  //*********** output from nedb database***********************************************************
  getData();
  async function getData() {
    db.find({}, function (err, docs) {
      if (err) {
        console.log("error");
      } else {
        console.log("documents retrieved: ", docs);
        res.json(docs);
      }
    });
  }
  //*********************************************************************************
  //**********code if using an SQLite3 database **************************************
  //   db.serialize(() => {
  //     db.all("SELECT * FROM newcomment", function (err, rows) {
  //       if (err) {
  //         res.send("Error encountered while displaying");
  //         return console.error(err.message);
  //       } else {
  //         console.log(rows);
  //         res.json({ data: rows });
  //       }
  //     });
  //   });
  //*********************************************************************************
});

app.get("/addcomment", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/addcomment.html"));
});

app.post("/add", function (req, res) {
    db.insert(
      { name: req.body.name, comment: req.body.comment },
      function (err, newDoc) {
        if (err) {
          console.log("error", err);
        } else {
          console.log("document inserted", newDoc); //
        }
        res.send("New comment has been added into the database");
      }
    );

  //**********code if using an SQLite3 database **************************************
//   db.serialize(() => {
//     db.run(
//       "INSERT INTO newcomment(name,comment) VALUES(?,?)",
//       [req.body.name, req.body.comment],
//       function (err) {
//         if (err) {
//           return console.log(err.message);
//         }
//         res.send("New comment has been added into the database");
//       }
//     );
//   });
  //*********************************************************************************
});

app.get("/about", function (req, res) {
  res.sendFile(path.join(public, "about.html"));
});

app.get("/data", function (req, res) {
  res.json([
    {
      id: "1",
      name: "carrot cake",
      description: "home made here",
      price: "2.50",
      category: "cake",
      available: "no",
    },
    {
      id: "2",
      name: "sandwiches",
      description: "with a variety of fillings",
      price: "2.50",
      category: "snack",
      available: "no",
    },
  ]);
});

app.get("/homepage", function (req, res) {
  res.sendFile(path.join(public, "home.html"));
});

app.get("/unfinished", function (req, res) {
  res.redirect("/");
});

app.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error.");
});

app.use(function (req, res) {
  res.status(404);
  res.send("Oops! We didn't find what you are looking for.");
});

app.listen(3001, () => {
  console.log("Server started on port 3001. Ctrl^c to quit.");
});
