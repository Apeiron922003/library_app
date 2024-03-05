import React from "react";
const list = [
  {
    id: 1,
    user: "Andrew Jones",
    title: "Remote Management",
    image: "https://picsum.photos/120/80",
    abstract:
      "In this blog post, I will share some remarks regarding communication between our former New York Office and the newly setup London Office",
    time: "3/23/2011 3:12:26 PM",
    comments: 2,
  },
  {
    id: 2,
    user: "Andrew Jones",
    title: "Expanding to Europe",
    image: "https://picsum.photos/120/80",
    abstract:
      "In this blog post, I will try to share some of my impressions of the recent expansion of our operations to the Old Continent.",
    time: "3/21/2011 5:57:47 PM",
    comments: 2,
  },
];
const BlogList = () => {
  return (
    <div style={{ backgroundColor: "#EEEEEE" }}>
      {list.map((blog, index) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px 50px",
            gap: "30px",
          }}
          key={index}
        >
          <img src={blog.image} alt="" style={{ border: "1px solid black" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <a
              href="/"
              style={{ fontSize: "20px", fontWeight: "500", color: "#6699FF" }}
            >
              {blog.title}
            </a>
            <p>{blog.abstract}</p>
            <div style={{ display: "flex" }}>
              <p>
                <span style={{ fontWeight: "700", color: "black" }}>
                  {blog.user}
                </span>{" "}
                | <span>{blog.time}</span> |{" "}
                <a href="/" style={{ color: "gray" }}>
                  <span>{blog.comments}</span> comments
                </a>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
