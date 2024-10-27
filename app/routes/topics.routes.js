module.exports = async app => {
    const topicsController = require("../controllers/topics.controller");
    let router = require("express").Router();

    // Create a new topic
    router.post("/", topicsController.createTopic);
    router.get("/", topicsController.getAllTopics);
    router.get("/:id", topicsController.getTopicById);
    router.put("/:id", topicsController.updateTopic);
    router.delete("/:id", topicsController.deleteTopic);
    await app.use("/api/topic", router);
}