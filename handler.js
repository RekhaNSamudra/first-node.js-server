const { sumRequestHandler } = require("./sum");

const requestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
       <head>
          <title>Calculator</title>
       </head>
       <body>
         <h1>Welcome...Have a good day! </h1>
         <a href="/calculator">Go to Calculator</a>
       </body>
    </html>`);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
       <head>
          <title>Calculator</title>
       </head>
       <body>
         <h1>Here is the Calculator :) </h1>
         <form action='/calculated-result' method='POST'> 
           <input type="number" name="first" placeholder="enter 1st number"/>
           <input type="number" name="second" placeholder="enter 2nd number"/>
           <input type="submit" value="Sum"/>
         </form>
         <a href="/">Go Back To Home</a>
       </body>
      </html>
      `);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculated-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
     <head>
        <title>Calculator</title>
     </head>
     <body>
       <h1>404... Page not found! </h1>
       <a href="/">Go Back To Home</a>
     </body>
  </html>`);
  return res.end();
};

exports.requestHandler = requestHandler;
