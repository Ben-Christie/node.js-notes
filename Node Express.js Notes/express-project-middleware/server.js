const express = require('express');

// use: npm install nodemon --save-dev to save to devDependencies section in package.json, means only needed when developing, not needed to run in production
// add: "watch": "nodemon server.js", to the script section in package.json to run nodemon
// run using: npm run watch

// if our file is named server.js, we can use npm start without specifying it in the package.json file

// How to write middleware
/*
  The callback function has the opportunity to use the request, take some data from it and take some action before it reaches our route handlers, can be used for things like validation, authentication, log request, etc.

  The next parameter is a function given by express to call the next middleware e.g. the first middleware could be for logging the request and the second could be used for validation. We move to the next middleware when teh next function is executed

  The next function is responsible for the order of execution of our middleware

  application.use(function(req, res, next) {
  
  });
*/

// console.log will appear in the terminal

// set up our application
const application = express();

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: 'Ben Christie',
  },
  {
    id: 1,
    name: 'Mohamed Salah',
  },
];

// Middleware
application.use((req, res, next) => {
  const startTime = Date.now();

  // must always include the next function, otherwise there'll be an error
  next();

  // actions go here after the next function has executed and we have our response
  // get time taken to make request
  const delta = Date.now() - startTime;
  // GET /friends/0 1ms
  console.log(`${req.method} ${req.url} ${delta}ms`);
});

// route handlers, each pairs a http method with the name of the route, no ugly string manipulation
application.get('/friends', (req, res) => {
  // be more explicit that we're sending json
  res.json(friends);
});

// if user put in /friends/22 even if 22 is undefined we won't get a 404 as it matches our handler so we have to define it ourselves
application.get('/friends/:friendId', (req, res) => {
  // convert to number
  const friendId = Number(req.params.friendId);

  const friend = friends[friendId]; // will be undefined if not found, undefined is the same as false

  // validate
  if (friend) {
    res.json(friend);
  } else {
    // if not found, set status to 404, chain json, could do the same in the above and set status to 200 for success
    res.status(404).json({
      error: 'Friend not found',
    });
  }
});

application.get('/messages', (req, res) => {
  res.send('<ul><li>Hello Ben!</li></ul>');
});

application.post('/messages', (req, res) => {
  console.log('Updating messages...');
});

application.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
