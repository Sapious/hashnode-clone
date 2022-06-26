const {
	getBlogs,
	getBlog,
	deleteBlog,
	createBlog,
	updateBlog,
	getOwnedBlogs,
	addOwnerToBlog,
	removeOwnerFromBlog,
} = require("../controllers/blog.controllers");
const blogModels = require("../models/blog.models");
const verifyToken = require("../middleware/verifyToken");
const isBlogOwner = require("../middleware/isBlogOwner");
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
router.get("/me", verifyToken, getOwnedBlogs);
router.get("/:blog", getBlog);
router.post("/:blog/owners", verifyToken, isBlogOwner, addOwnerToBlog);
router.patch("/:blog/owners", verifyToken, isBlogOwner, removeOwnerFromBlog);
router.post("/", verifyToken, createBlog);
router.put("/:blog", verifyToken, isBlogOwner, updateBlog);
router.delete("/:blog", verifyToken, isBlogOwner, deleteBlog);
module.exports = router;
