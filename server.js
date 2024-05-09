import http from "http";
import fs from "fs";

function parse_options(options) {
  const topic = options[0].split("=")[1];
  const opt1 = options[1].split("=")[1];
  const opt2 = options[2].split("=")[1];
  return { topic, opt1, opt2 };
}

(async function () {
  const server = http.createServer((req, res) => {
    const { url } = req;
    if (url === "/health") {
      res.writeHead(200).end("OK");
    } else if (url === "/" || url === "/index.html") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fs.readFileSync("./public/index.html"));
    } else if (url.startsWith("/compare")) {
      const parsedUrl = new URL(`http://localhost/${url}`);
      const { search } = parsedUrl;
      const options = decodeURIComponent(search.substring(1)).split("&");
      const { topic, opt1, opt2 } = parse_options(options);

      console.log({ topic, opt1, opt2 });
      res.writeHead(200).end(JSON.stringify({ topic, opt1, opt2 }));
    } else {
      console.error(`${url} not found`);
      res.writeHead(404).end("Not Found");
    }
  });

  const port = process.env.PORT || 6789;
  console.log(`Server running on port ${port}`);
  server.listen(port);
})();
