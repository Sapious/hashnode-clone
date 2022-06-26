const {
	createStory,
	getStory,
	getStories,
	updateStory,
	deleteStory,
	publishStory,
} = require("../controllers/story.controllers");
const storyModel = require("../models/story.models");
const router = require("express").Router();

router.param("story", async (req, res, next, id) => {
	try {
		const story = await storyModel.findById(id);

		if (!story) {
			return res.status(404).json("story not found");
		}

		req.story = story;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
});

router.post("/", createStory);
router.get("/", getStories);
router.get("/:story", getStory);
router.put("/:story", updateStory);
router.delete("/:story", deleteStory);

module.exports = router;
