const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose')

const postRoutes = require('./routes/posts');
//const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

//app.use(authRoutes);

app.use('/posts', postRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  res.status(status).json({ message: message });
});

app.listen(8080, () => {
  mongoose.connect('mongodb://localhost:27017/enboard'
  ).then(()=>{
      console.log(`Example app listening on port 8080`)
      console.log('connecting MongoDB')
  }).catch((err)=>{
      console.log(`${err}`)
  })
})
