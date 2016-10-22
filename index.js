const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set up static files directory
app.use('/public', express.static(path.join(__dirname, 'client/public')));

// Always get
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/index.html'));
});

app.get('/favicon.ico', (request, response) => {
  response.sendStatus(200)
    .end();
});


app.get('*', (request, response) => {
  response.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});

