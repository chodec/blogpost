const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

let tweets = []

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function (req, res) {
  res.render('home', {tweets: tweets})
})

app.get('/about', function (req, res) {
  res.render('about', {startingContent: aboutContent})
})

app.get('/contact', function (req, res) {
  res.render('contact', {startingContent: contactContent})
})

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.post('/compose', function (req, res){
  const tweet = {title: req.body.postTitle, body: req.body.postBody}
  tweets.push(tweet)
  res.redirect('/')
})

app.get("/tweets/:tweet", function(req, res){
  let requestMatch = _.lowerCase(req.params.tweet)
  
  tweets.forEach(function (tweet) {
    let storedMatch = _.lowerCase(tweet.title)

    if(storedMatch === requestMatch){
      console.log(`Tweet ${requestMatch} has been found`);
      res.render("tweets", {title: tweet.title, body: tweet.body})
    }
  })
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
