const express = require('express');

// use: npm install nodemon --save-dev to save to devDependencies section in package.json, means only needed when developing, not needed to run in production
// add: "watch": "nodemon server.js", to the script section in package.json to run nodemon
// run using: npm run watch

// if our file is named server.js, we can use npm start without specifying it in the package.json file

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

// JSON parsing, req.body wont exist without this
application.use(express.json());

application.post('/friends', (req, res) => {
  // make sure name exists
  if (!req.body.name) {
    // use return to stop the rest of the code from executing
    return res.status(400).json({
      error: 'Missing friend name',
    });
  }

  const newFriend = {
    id: friends.length,
    name: req.body.name,
  };

  friends.push(newFriend);

  // return json in response
  res.json(newFriend);
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
