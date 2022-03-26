const express = require("express");
const path = require("path");
const port = 8080;
const app = express();

app.use(express.static(path.resolve(__dirname, "src")));

app.get("/courses/:id", (req, res) => {
  if (req.params.id) {
    res.sendFile(path.resolve(__dirname, "src/html", "courseShow.html"));
  }
});

app.listen(port, () => {
  console.log(`frontend 서버가 http://localhost:${port}에서 열렸습니다 !`);
});
