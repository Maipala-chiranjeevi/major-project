const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const auth = require('./auth');
const video = require('./video');
const youtube = require('./youtube');
const db = require('./db');

dotenv.config();

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3001;

app.post('/register', auth.register);
app.post('/login', auth.login);
app.post('/select-exam', auth.authenticateToken, auth.selectExam);
app.post('/transcript', auth.authenticateToken, video.getTranscript);
app.get('/recommend', auth.authenticateToken, youtube.recommendVideos);

app.get('/', (req, res) => {
  res.send('Hello from the EduForge Backend!');
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
