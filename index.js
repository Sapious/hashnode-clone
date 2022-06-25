//import section
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//DB connection
mongoose.connect("mongodb://localhost:27017/hashnode-clone");
mongoose.connection.on("connected", () => {
	console.log("DB connected");
});
mongoose.connection.on("error", (err) => {
	console.log("mongodb failed with", err);
});
//import routes
const authRoutes = require("./routes/auth.routes");
const blogRoutes = require("./routes/blog.routes");
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes middleware
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);
//server listening
const port = 8000;

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
