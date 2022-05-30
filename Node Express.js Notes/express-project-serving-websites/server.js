const express = require('express');

const path = require('path');

const friendsRouter = require('./routers/friends.router.js');

const messagesRouter = require('./routers/messages.router.js');

// use: npm install nodemon --save-dev to save to devDependencies section in package.json, means only needed when developing, not needed to run in production
// add: "watch": "nodemon server.js", to the script section in package.json to run nodemon
// run using: npm run watch

// if our file is named server.js, we can use npm start without specifying it in the package.json file

// console.log will appear in the terminal

// set up our application
const application = express();

const PORT = 3000;

// Middleware
application.use((req, res, next) => {
  const startTime = Date.now();

  // must always include the next function, otherwise there'll be an error
  next();

  // actions go here after the next function has executed and we have our response

  // get time taken to make request
  const delta = Date.now() - startTime;
  // GET /friends/0 1ms
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

// express static file middleware, views folder
// http://localhost:3000/site/index.html
// site has to be applied to files in the html such as css files and images -> index.hbs to see
application.use('/site', express.static(path.join(__dirname, 'views'))); //use path.join to get the absolute path

// JSON parsing middleware, req.body wont exist without this
application.use(express.json());

// load handlebars (hbs) and find our templates
application.set('view engine', 'hbs');
application.set('views', path.join(__dirname, 'views'));

application.get('/', (req, res) => {
  // tell express that we're rendering the handlbars file called index, we naem the file we're going into, not the layout file
  res.render('index', {
    title: 'Skiing in France',
    caption: "Let's Go Skiing!",
  });
});

// we use routers like any other middleware, "mounting" the router on the application
// define common endpoint here as well i.e. /friends, this allows us to reduce the complexity of our paths in teh router files
application.use('/friends', friendsRouter);

application.use('/messages', messagesRouter);

application.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
