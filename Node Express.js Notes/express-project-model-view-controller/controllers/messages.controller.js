// Using the MVC (Model, View, Controller) model, our route handlers act as our controllers as they allow us to manipulate and change data

// built in path module
// this will let us work with our paths, handling all the different ways that any OS works with paths on that machine
const path = require('path');

// good to give name to function for debugging
function getMessages(req, res) {
  // res.send('<ul><li>Hello Ben!</li></ul>');

  // Send files

  // __dirname gives us the root of the current folder we're in, .. tells us to go up one level so we can access teh public folder which contains the file

  res.sendFile(path.join(__dirname, '..', 'public', 'skimountain.jpg'));
}

function postMessage(req, res) {
  console.log('Updating messages...');
}

// application.get('/messages', (req, res) => {
//   res.send('<ul><li>Hello Ben!</li></ul>');
// });

// application.post('/messages', (req, res) => {
//   console.log('Updating messages...');
// });

// export from module
module.exports = {
  getMessages: getMessages,
  postMessage: postMessage,
};
