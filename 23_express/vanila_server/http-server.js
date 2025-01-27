const http = require("http"); // http는 Node.js 내장 라이브러리

const HOST = "localhost";
const PORT = 5555;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1 style='color: blue;'>Hello World</h1>");
  } else if (url === "/about" && method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1 style='color: red;'>About Page</h1>");
  } else if (url === "/api" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ hello: "world" }));
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, HOST, () => {
  console.log("Server started to listen...");
});
