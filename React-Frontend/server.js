import express from "express";
import compression from "compression";
import path from "path";

const app = express();

app.use(compression());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("start server"));
