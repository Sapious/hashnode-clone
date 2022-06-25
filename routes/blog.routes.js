const {
	getBlogs,
	getBlog,
	deleteBlog,
	createBlog,
	updateBlog,
} = require("../controllers/blog.controllers");
const blogModels = require("../models/blog.models");

const router = require("express").Router();

router.param("blog", async (req, res, next, id) => {
	try {
		const blog = await blogModels.findById(id);

		if (!blog) return res.status(404).json("blog not found");
		req.blog = blog;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.get("/", getBlogs);
router.get("/:blog", getBlog);
router.post("/", createBlog);
router.put("/:blog", updateBlog);
router.delete("/:blog", deleteBlog);
module.exports = router;
