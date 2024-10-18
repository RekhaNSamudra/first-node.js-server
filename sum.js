// Handler function for sum request
const sumRequestHandler = (req, res) => {
  // Log the request URL for debugging
  console.log("in sum", req.url);
  
  const body = [];
  
  // Listen for incoming data chunks and push them into the 'body' array
  req.on("data", (chunk) => body.push(chunk));
  
  // Once all data is received, process it
  req.on("end", () => {
    // Combine all data chunks and convert them to a string
    const bodyStr = Buffer.concat(body).toString();
    
    // Parse the body string into URLSearchParams to extract form data
    const params = new URLSearchParams(bodyStr);
    
    // Convert the parsed parameters into an object
    const bodyObj = Object.fromEntries(params);

    // Calculate the sum of the 'first' and 'second' parameters from the form
    const result = Number(bodyObj.first) + Number(bodyObj.second);
    
    // Log the result to the console for debugging
    console.log(result);

    // Set the response header to indicate an HTML response
    res.setHeader("Content-Type", "text/html");
    
    // Write the HTML response, displaying the sum result
    res.write(`
    <html>
     <head>
        <title>Calculator</title>
     </head>
     <body>
       <h1>Your Sum is ${result}</h1>
       <a href="/calculator">Back To Calculator</a>
     </body>
    </html>`);
    
    // End the response to send the data back to the client
    return res.end();
  });
};

// Export the sumRequestHandler function to use it in other modules
exports.sumRequestHandler = sumRequestHandler;
