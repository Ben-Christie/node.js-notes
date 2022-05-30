// Using the MVC (Model, View, Controller) model, our route handlers act as our controllers as they allow us to manipulate and change data

// this equates to our friends array
const model = require('../models/friends.model.js');

function postFriend(req, res) {
  // make sure name exists
  if (!req.body.name) {
    // use return to stop the rest of the code from executing
    return res.status(400).json({
      error: 'Missing friend name',
    });
  }

  const newFriend = {
    id: model.length,
    name: req.body.name,
  };

  model.push(newFriend);

  // return json in response
  res.json(newFriend);
}

function getFriends(req, res) {
  // be more explicit that we're sending json
  res.json(model);
}

function getIndividualFriend(req, res) {
  // convert to number
  const friendId = Number(req.params.friendId);

  const friend = model[friendId]; // will be undefined if not found, undefined is the same as false

  // validate
  if (friend) {
    res.json(friend);
  } else {
    // if not found, set status to 404, chain json, could do the same in the above and set status to 200 for success
    res.status(404).json({
      error: 'Friend not found',
    });
  }
}

module.exports = {
  postFriend,
  getFriends,
  getIndividualFriend,
};
