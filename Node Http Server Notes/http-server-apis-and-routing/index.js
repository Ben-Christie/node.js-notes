// Node WebServer

// node includes this core http module
const http = require('http');

const PORT = 3000;

// create server
// req = request, res = response
// this is an event emitter
const server = http.createServer((req, res) => {
  // see if our url matches the endpoint i.e. this will only happen if the url is localhost:3000/friends
  if (req.url === '/friends') {
    res.writeHead(200, {
      // here we set the content type we want to pass
      'Content-Type': 'application/json',
    });

    /*
      Another way of writing the above res.writeHead function is to do the following:
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
    */

    res.end(
      // have to pass to end function as a string
      JSON.stringify({
        id: 1,
        name: 'Sir Isaac Newton',
      })
    );
  } else if (req.url === '/messages') {
    // theres a better way of writing html, this is just a demo
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

    // tell the response we're finished writing
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
