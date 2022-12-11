const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

require('dotenv').config();

app.use(express.json());

let refreshTokens = [];

app.delete('/logout', (req, res) => {
  
  // In real project change this to delete user the refresh token in DB
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  
  res.sendStatus(204);
});

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return  res.sendStatus(401);
  
  // change this by verifying to the user refresh token stored in DB
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({accessToken});
  });
});

app.post('/login', (req, res) => {
  // Authenticate user
  
  const username = req.body.username;
  const user = { name: username };
  
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  
  // In actual project change this to saving in your db
  // Eg: Create a field in users table to store this refresh token for each user
  refreshTokens.push(refreshToken);
  
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

app.listen(4000, () => {
  console.log(`Server is up on port ${4000}`);
});


