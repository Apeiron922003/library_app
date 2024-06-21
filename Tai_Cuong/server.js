const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/add", (req, res) => {
  const body = req.body;
  const response = {};
  if (body.x && body.y) {
    const { x, y } = body;
    console.log();
    if (Number.isNaN(+x) || Number.isNaN(+y)) {
      Object.assign(response, {
        status: 400,
        error: "Các giá trị phải là số!",
      });
    } else {
      Object.assign(response, {
        status: 201,
        data: {
          result: +x + +y,
        },
      });
    }
  } else {
    Object.assign(response, {
      status: 400,
      error: "Không được để trống các giá trị!",
    });
  }
  res.status(response.status).json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
