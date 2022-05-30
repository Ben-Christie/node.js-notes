const express = require('express');

const messagesController = require('../controllers/messages.controller.js');

// Create a new router
// A router is like a mini application, it contains its own set of middleware and routes. We use a router to break down our application and make it more modular
const messagesRouter = express.Router();

// route handlers, each pairs a http method with the name of the route, no ugly string manipulation

// In following with the MVC model, we've moved all our route handler functions to the relevant controller files, this also makes our code cleaner

messagesRouter.get('/', messagesController.getMessages);

messagesRouter.post('/', messagesController.postMessage);

module.exports = messagesRouter;
