// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Parse JSON request body
app.use(bodyParser.json());

// Create event
app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    // Emit event
    axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status
      }
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on port 4003');
});