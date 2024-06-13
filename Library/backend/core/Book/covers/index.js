const { JSDOM } = require("jsdom");
let getUrl = (nameBook) => `https://www.amazon.com/s?k=${nameBook}`;
let getImageUrl = (data) => {
  const doc = new JSDOM(data);
  const src = doc.window.document.querySelector(`[data-image-index="1"]`).src;
  return src;
};
const fs = require("fs");
const path = require("path");

const list = fs.readFileSync(
  path.resolve(__dirname + "../../Book.json"),
  "utf8"
);
JSON.parse(list).forEach(({ title }) => {
  const url = getUrl(title);
  fetch(url)
    .then((res) => res.text())
    .then((data) => {
      const imageUrl = getImageUrl(data);
      fetch(imageUrl)
        .then((res) => res.arrayBuffer())
        .then((data) => {
          const file = path.resolve(__dirname, title + ".jpg");
          fs.writeFileSync(file, Buffer.from(data));
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
