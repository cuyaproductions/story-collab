# story-collab
Collaborative storytelling app

## Firebase Docs
- [First Install NPM] npm install firebase --save
- [Include Firebase Node.js module in the application] var firebase = require("firebase)"
- [Initialize the Firebase SDK using your API key and authDomain]
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
};
firebase.initializeApp(config);
- [Start up a Local Web Server for Development] $ npm install -g firebase-tools
$ firebase serve
- [How to structure your data] https://firebase.google.com/docs/database/web/structure-data
