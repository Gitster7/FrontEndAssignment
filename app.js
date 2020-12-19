const express = require("express");
const bodyParser = require("body-parser");
const mongo = require('mongodb');
const ejs = require("ejs");
const app = express();

// MongoDB Database
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

//set ejs as templating engine
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//date
var options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
};
var today = new Date();

var date = today.toLocaleDateString("en-CA", options);


//Array to save form enteries
let Entries = [
  {
    id: 1,
    taskName: "Task 1",
    jiraId: "XXX",
    xdlink: "XD",
    team: "Team level 1",
    assignee: "Gaurav",
    status: "In QC",
    dueDate: "2020-10-13"
  },
  {
    id: 2,
    taskName: "Task 2",
    jiraId: "XXX",
    xdlink: "XD",
    team: "Team level 2",
    assignee: "Tanzil",
    status: "UAT",
    dueDate: "2020-10-15"
  },
  {
    id: 3,
    taskName: "Task 3",
    jiraId: "XXX",
    xdlink: "XD",
    team: "Team level 3",
    assignee: "Tanzil",
    status: "In Progress",
    dueDate: "2020-10-16"
  },
  {
    id: 4,
    taskName: " Task 4",
    jiraId: "XXX",
    xdlink: "XD",
    team: "Teamlevel4",
    assignee: "Minaj",
    status: "In Progress",
    dueDate: "2020-10-31"
  },
  {
    id: 5,
    taskName: "Task 5",
    jiraId: "XXX",
    xdlink: "XD",
    team: "Team level 5",
    assignee: "Tanzil",
    status: "In Progress",
    dueDate: "2020-10-13"
  },
  {
    id: 6,
    taskName: "Task 6",
    jiraId: "XXX",
    xdlink: "XD",
    team: "Team level 6",
    assignee: "BK",
    status: "In QC",
    dueDate: "2020-10-14"
  },
  {
    id: 7,
    taskName: "Task 7",
    jiraId: "XXX",
    xdlink: "XD",
    team: "Team level 7",
    assignee: "Sudha",
    status: "In QC",
    dueDate: "2020-10-20"
  },
];

let EntriesCompleted = [
    {
      taskName: "Task 1",
      jiraId: "XXX",
      xdlink: "XD",
      team: "Team level 1",
      assignee: "Gaurav",
      status: "Completed",
      dueDate: "2020-10-13"
    },
    {
      taskName: "Task 2",
      jiraId: "XXX",
      xdlink: "XD",
      team: "Team level 2",
      assignee: "Tanzil",
      status: "Completed",
      dueDate: "2020-10-13"
    },
    {
      taskName: "Task 3",
      jiraId: "XXX",
      xdlink: "XD",
      team: "Team level 3",
      assignee: "Tanzil",
      status: "Completed",
      dueDate: "2020-10-13"
    },
    {
      taskName: "Task 4",
      jiraId: "XXX",
      xdlink: "XD",
      team: "Team level 4",
      assignee: "Minaj",
      status: "Completed",
      dueDate: "2020-10-13"
    },
];


//                                  GET REQUESTS
app.get("/", function(req, res) {
  res.render("index", {
    date: date,
    Entries: Entries,
    EntriesCompleted: EntriesCompleted
  });
});

//                                  POST REQUESTS
app.post("/", function(req, res) {

  console.log(req.body);

  // Entry Object
  const Entry = {
    id: "",
    taskName: req.body.taskName,
    jiraId: req.body.jiraId,
    xdlink: req.body.xdlink,
    team: req.body.team,
    assignee: req.body.assignee,
    status: req.body.status,
    dueDate: req.body.dueDate
  };

  if(Entry.status == "Completed"){
    EntriesCompleted.push(Entry);
  }
  else{
    Entries.push(Entry);
  }
  res.redirect("/");

  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("taskdb");
  //   dbo.collection("tasks").insertOne(Entry, function(err, res) {
  //     if (err) throw err;
  //     console.log("1 document inserted");
  //     db.close();
  //   });
  // });
});


let port = process.env.port;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("server started");
});
