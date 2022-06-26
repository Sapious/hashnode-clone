const {
	createComment,
	getComment,
	getComments,
	deleteComment,
	updateComment,
} = require("../controllers/comment.controllers");
const commentModel = require("../models/comment.models");
const router = require("express").Router();

router.param("comment", async (req, res, next, id) => {
	try {
		const comment = await commentModel.findById(id);

		if (!comment) {
			return res.status(404).json("comment not found");
		}
		req.comment = comment;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.post("/", createComment);
router.get("/", getComments);
router.get("/:comment", getComment);
router.put("/:comment", updateComment);
router.delete("/:comment", deleteComment);

module.exports = router;
