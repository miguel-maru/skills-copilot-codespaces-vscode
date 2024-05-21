// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const comments = require('./comments.json');

// Set up the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Set up the body parser
app.use(bodyParser.json());

// Set up the static directory
app.use(express.static('public'));

// Set up the route
app.get('/comments', (req, res) => {
  res.json(comments);
});

app.post('/comments', (req, res) => {
  comments.push(req.body);
  fs.writeFile(
    path.join(__dirname, 'comments.json'),
    JSON.stringify(comments, null, 2),
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
        return;
      }
      res.status(201).send('Comment added');
    }
  );
});

// Path: public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Comments</title>
</head>
<body>
  <h1>Comments</h1>
  <form id="comment-form">
    <input type="text" id="name" placeholder="Name" required>
    <textarea id="comment" placeholder="Comment" required></textarea>
    <button type="submit">Submit</button>
  </form>
  <ul id="comments-list"></ul>
  <script src="app.js"></script>
</body>
</html>

// Path: public/app.js
const form = document.getElementById('comment-form');
const name = document.getElementById('name');
const comment = document.getElementById('comment');
const commentsList = document.getElementById('comments-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      comment: comment.value
    })
  });
  if (response.ok) {
    name.value = '';
    comment.value = '';
    getComments();