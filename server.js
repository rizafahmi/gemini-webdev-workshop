import http from "http";

(async function () {
  const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === "/health") {
      res.writeHead(200).end("OK");
    } else {
      console.error(`${url} not found`);
      res.writeHead(404).end("Not Found");
    }
  });

  const port = process.env.PORT || 6789;
  console.log(`Server running on port ${port}`);
  server.listen(port);
})();
