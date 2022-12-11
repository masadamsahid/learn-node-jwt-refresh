const express = require('express');
const app = express();


app.use(express.urlencoded());

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

app.get('/posts', (req, res, next) => {
  res.json(posts);
});

app.listen(3000, () => {
  console.log(`Server is up on port $${3000}`);
});


