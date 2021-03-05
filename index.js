const request = require("request");
var http = require('http');
var data;


// Kuunnellaan porttia 3000
const PORT = process.env.PORT || 3000;


http
.createServer(function(request, response) {
      response.writeHead(200, { "Content-Type": "text/html" }); 

      response.write("<table border='1'>");
      response.write("<tr><td>" + data.title + "</td></tr>");
      response.write("<tr><td>" + data.explanation + "</td></tr>");
      response.write("Morjensta!\n"); // 
      response.write("</table>"); //end the response 

      response.end();
     })  
.listen(process.env.PORT || 5000);

// requiring fs
var fs = require('fs');
var data = fs.readFileSync('./data.json');
console.log(data);

// Otetaan express-moduuli käyttöön
var express = require("express");

// Otettaan body parser käyttöön
var bodyParser = require("body-parser");

// Luetaan tiedoston sisältö ohjelmaan
var app = express();

// Otetaan body parser käyttöön app-nimisessä express-sovelluksessa
app.use(bodyParser.urlencoded({ extended: true }));

// Tarjoillaan sisältöjä 12B-hakemiston alta halukkaille
app.use(express.static("public"))

app.post("/kirjaudu", function (req, res) {
  console.log(req.body.id);
  console.log(req.body.username);
  console.log(req.body.country);
  console.log(req.body.message);
  var id = req.body.id;
  var username = req.body.username;
  var country = req.body.country;
  var message = req.body.message;
  res.sendFile(__dirname + "/guestbook.html");
});


// Luetaan JSON muotoinen tiedosto
// var json = require("/public/data.json");

// Tulostetaan koko muuttujan sisältö;
// console.log(json);


// Luodaan reitit ja niiden toiminnallisuudet
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/static/index.html");
  });

/*   app.get("/guestbook", (req, res) => {
   let data = require(json, "./data.json");
   let results = "<table border='1' style='width: 100%'>" +
      '<tr><th>Id</th><th>Name</th><th>Country</th><th>Date</th><th>Message</th></tr>';
    for (let i = 0; i < data.length; i++) {
    results +=
        '<tr>' +
        '<td>' + data[i].id + '</td>' +
        '<td>' + data[i].username + '</td>' +
        '<td>' + data[i].country + '</td>' +
        '<td>' + data[i].date + '</td>'
        '<td>' + data[i].message + '</td>' +
        '</tr>';
    }
    results += "</table>";
  
    res.send(results);
  }); */

  app.get("/ajaxmessage", (req, res) => {
    res.sendFile(__dirname + "/ajaxmessage.html");
  });
  
  app.post("/ajaxmessage", (req, res) => {
    addToGuestbook(req);
  });
  
  app.get("/newmessage", (req, res) => {
    res.sendFile(__dirname + "/addmessage.html");
  });

app.post("/newmessage.html", function(req, res) {
  addToGuestbook(req);
  res.redirect("/guestbook");
});

function addToGuestbook(req) {
  let data = require("./data.json");

  data.push({
    id: id.req.body,
    username: req.body.name,
    country: req.body.country,
    date: new Date(),
    message: req.body.message
  });

  let jsonStr = JSON.stringify(data);

  fs.writeFile("./data.json", jsonStr, (err) => {
    if (err) throw err;
  });
  console.log("viesti tallennettiin.");
} 

    // Oletusreitti joka tarjoillaan, mikäli muihin ei päädytty.
    app.get("*", function(req, res) {
      res.send("Cant find the requested page", 404);
    });
    
    // Web-palvelimen luonti Expressin avulla
    app.listen(3000, function() {
      console.log("Example app listening on port 3000!");
    });
  
