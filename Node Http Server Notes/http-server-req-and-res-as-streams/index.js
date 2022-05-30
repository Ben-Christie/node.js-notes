// Node WebServer

// node includes this core http module
const http = require('http');

const PORT = 3000;

// create server
// req = request, res = response
// this is an event emitter
const server = http.createServer();

const friends = [
  // id for our friend will be used as a parameter for our endpoint i.e. localhost:3000/friends/0 = Isaac Newton
  {
    id: 0,
    name: 'Isaac Newton',
  },
  {
    id: 1,
    name: 'Albert Einstein',
  },
  {
    id: 2,
    name: 'Nikola Tesla',
  },
];

server.on('request', (req, res) => {
  // parse the request by splitting the endpoint
  const items = req.url.split('/'); // Example: /friends/1 => ['', 'friends', '1'] where the empty string at 0 is everything before the first /

  if (req.method === 'POST' && items[1] === 'friends') {
    // listen for events using the on function
    // handle the data event 'data'
    req.on('data', (data) => {
      // convert data to string, initially received as a buffer
      const friend = data.toString();

      console.log('Request:', friend);

      // push to array, convert to JSON object
      friends.push(JSON.parse(friend));
    });
    // send back req to browser as res in console
    // readable.pipe(writable)
    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === 'friends') {
    // see if our url matches the endpoint i.e. this will only happen if the url is localhost:3000/friends
    res.writeHead(200, {
      // here we set the content type we want to pass
      'Content-Type': 'application/json',
    });

    // check if length is 3 as this means we passed a parameter into the endpoint
    if (items.length === 3) {
      // add plus sign to a string to convert it to a number or use Number(items[2])
      const friendIndex = +items[2];
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      // pass the whole array of items
      res.end(JSON.stringify(friends));
    }

    res.end(
      // have to pass to end function as a string
      JSON.stringify()
    );
  } else if (req.method === 'GET' && items[1] === 'messages') {
    // don't need to set status code as defaults to 200

    res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello Isaac!</li>');
    res.write('<li>What are your thoughts on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');

    res.end();
  } else {
    res.statusCode = 404;
    res.end(); // always call end
  }
});

// set our server to listen for requests
// we need to pass in the port number that our server is going to be listening on
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});

// to see response go to localhost:3000

// test passing the request back to the browser
/*
  fetch('http://localhost:3000/friends', {
  method: 'POST',
  body: JSON.stringify({ id: 4, name: 'Grace Hopper' }),
  })
  .then((response) => response.json())
  .then((friend) => console.log(friend));
*/
