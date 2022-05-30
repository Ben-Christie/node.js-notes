const express = require('express');

// use: npm install nodemon --save-dev to save to devDependencies section in package.json, means only needed when developing, not needed to run in production
// add: "watch": "nodemon server.js", to the script section in package.json to run nodemon
// run using: npm run watch

// if our file is named server.js, we can use npm start without specifying it in the package.json file

// set up our application
const application = express();

const PORT = 3000;

const friends = [
  {
    id: 1,
    name: 'Ben Christie',
  },
  {
    id: 2,
    name: 'Mohamed Salah',
  },
];

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
