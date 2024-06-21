const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

const users = [
  { id: 1, username: "me", password: "123" },
  { id: 2, username: "you", password: "456" },
  { id: 3, username: "anonymous", password: "jqk" },
];

const jwt = require("jsonwebtoken");
const SECRET_STRING =
  "f21550b037037d38b8a3e70e632d836f78ecd851447a855836bddd13046d9676";

app.use(cors());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const response = {};
  const token = req.get("Authorization")?.split(" ")[1];
  let profile;
  if (token) {
    try {
      const key = jwt.verify(token, SECRET_STRING);
      profile = users.find((user) => user.id == key.id);
    } catch (error) {
      Object.assign(response, {
        status: 401,
        message: "Bạn chưa đăng nhập!",
      });
    }
  } else {
    const { username, password } = req.body;
    profile = users.find(
      (user) => user.username == username && user.password == password
    );
  }

  if (!profile) {
    Object.assign(response, {
      status: 401,
      message: "Thông tin tài khoản hoặc mật khẩu không chính xác!",
    });
  } else {
    const token = jwt.sign({ id: user.id }, SECRET_STRING, {
      algorithm: "HS256",
      expiresIn: "2m",
    });
    Object.assign(response, {
      status: 200,
      token,
    });
  }
  res.status(response.status).json(response);
});
app.post("/logout", async (req, res) => {
  const response = {};
  const token = req.get("Authorization")?.split(" ")[1];
  if (!token) {
    Object.assign(response, {
      status: 401,
      message: "Thông tin tài khoản hoặc mật khẩu không chính xác!",
    });
  } else {
    const token = jwt.sign({ id: user.id }, SECRET_STRING, {
      algorithm: "HS256",
      expiresIn: "2m",
    });
    Object.assign(response, {
      status: 200,
      token,
    });
  }
  res.status(response.status).json(response);
});

app.get("/public", (req, res) => {
  res.status(200).json({ status: 200, message: "hello" });
});

app.get("/private", (req, res) => {
  const response = {};
  const token = req.get("Authorization")?.split(" ")[1];
  if (token) {
    try {
      const key = jwt.verify(token, SECRET_STRING);
      const profile = users.find((user) => user.id == key.id);
      Object.assign(response, {
        status: 200,
        username: profile.username,
      });
    } catch (error) {
      Object.assign(response, {
        status: 401,
        message: "Bạn chưa đăng nhập!",
      });
    }
  }
  res.status(response.status).json(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
