const express = require("express");
const app = express();
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const likesRouter = require("./routes/postslikes");

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/users",usersRouter);
app.use("/postslikes",likesRouter);

// 🔥 Man-in-the-Middle Attack Simulation (MitM) 
app.use("/posts/addPost", (req, res, next) => {
    //console.log("🔎 Intercepted:", req.method, req.url, req.body);
    const post = req.body.data;
    const signature = req.body;

    if (req.method === "POST") {
        // 🔥 Altering the content before forwarding it to the server 
        post.title = "Oups !";
        post.body = "Oups !";
    }
    next();
});

app.use("/posts",postsRouter);

const db = require("./models");
db.sequelize.sync().then(() => {
    app.listen(3001,() => {
    console.log("Server started !!");
})
})

