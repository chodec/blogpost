const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tweetsDB');

const tweetSchema = {
  title: String,
  content: String
}

const Tweet = mongoose.model("Tweet", tweetSchema);

const tweet1 = new Tweet({
  title: "First tweet",
  content: "This is the first tweet ever"
})

const tweet2 = new Tweet({
  title: "How to add tweet?",
  content: "Just go over localhost:3000/compose"
})

// tweet1.save().then(() => console.log("tweet"))
// tweet2.save().then(() => console.log("tweet2"))

let tweets = []
let obj = {}
let tweet = {}

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

async function getTweets() {
  tweets = []
  const docs = await Tweet.find()
  for(let e of docs){
    obj = {id: e._id, title: e.title, content: e.content}
     tweets.push(obj)
  }
}

async function getTweet(id) {
  tweet = {}
  let docs = await Tweet.findOne({_id: id})
  tweet = docs
}

async function insertTweet(title, content) {
  tweet = {}
  tweet = new Tweet({
    title: title,
    content: content
  })
  tweet.save(`${tweet.tile} stored to DB`)
}

app.get('/', async function (req, res) {
  await getTweets()
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

app.post('/compose', async function (req, res){
  //const tweet = {title: req.body.postTitle, body: req.body.postBody}
  insertTweet(req.body.postTitle, req.body.postBody)
  //tweets.push(tweet)
  res.redirect('/')
})

app.get("/tweets/:postId", async function(req, res){
  let requestMatch = req.params.postId
  await getTweet(requestMatch)

  res.render("tweets", {title: tweet.title, content: tweet.content})
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
