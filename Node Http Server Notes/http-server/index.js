// Node WebServer

// node includes this core http module
const http = require('http');

const PORT = 3000;

// create server
// req = request, res = response
const server = http.createServer((req, res) => {
  // using the req we can look into the headers and the data that were passed in from the client
  // using the res we can create a response by writing some data and headers to send back to the client
  // both req and res are streams, req is readable stream (use on function), res is a writable stream

  // success response
  // in the object we pass we can write all our headers
  res.writeHead(200, {
    // here we set the content type we want to pass e.g., to pass plain text we would put 'Content-Type': 'text/plain',
    'Content-Type': 'application/json',
  });

  // set data to pass back to the browser
  // call the end function (called end because any data or headers is now complete and ready to be sent back), needs to be called on every request even if its empty
  res.end(
    // have to pass to end function as a string
    JSON.stringify({
      id: 1,
      name: 'Sir Isaac Newton',
    })
  );
});

// set our server to listen for requests
// we need to pass in the port number that our server is going to be listening on
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
}); // 127.0.0.1 local machine, can use localhost

// to see response go to localhost:3000
