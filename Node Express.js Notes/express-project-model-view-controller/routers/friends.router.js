const express = require('express');

const friendsController = require('../controllers/friends.controller.js');

// Create a new router
// A router is like a mini application, it contains its own set of middleware and routes. We use a router to break down our application and make it more modular
const friendsRouter = express.Router();

// route handlers, each pairs a http method with the name of the route, no ugly string manipulation

// In following with the MVC model, we've moved all our route handler functions to the relevant controller files, this also makes our code cleaner

// can add custom middleware just for this router, this will only be logged on friends endpoints
friendsRouter.use((req, res, next) => {
  // log the ip address of the machine
  console.log('IP Address:', req.ip);

  next();
});

friendsRouter.post('/', friendsController.postFriend);

friendsRouter.get('/', friendsController.getFriends);

// if user put in /friends/22 even if 22 is undefined we won't get a 404 as it matches our handler so we have to define it ourselves
friendsRouter.get('/:friendId', friendsController.getIndividualFriend);

module.exports = friendsRouter;
