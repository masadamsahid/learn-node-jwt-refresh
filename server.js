const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

require('dotenv').config();

app.use(express.json());

const posts = [
  {
    username: 'Adam',
    title: 'Post 1'
  },
  {
    username: 'Sahid',
    title: 'Post 2'
  },
  {
    username: 'Maulana',
    title: 'Post 3'
  },
  {
    username: 'Masadam',
    title: 'Post 4'
  },
];

app.get('/posts', authenticateToken, (req, res, next) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

app.post('/login', (req, res) => {
  // Authenticate user
  
  const username = req.body.username;
  const user = { name: username };
  
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});


function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log(`Server is up on port $${3000}`);
});


