module.exports = async app => {
    const questionController = require("../controllers/questions.controller");
    let router = require("express").Router();

    // Create a new Question
    router.post("/", questionController.createQuestion);
    router.get("/", questionController.getAllQuestions);
    router.get("/:id", questionController.getQuestionById);
    router.put("/:id", questionController.updateQuestion);
    router.delete("/:id", questionController.deleteQuestion);
    await app.use("/api/question", router);
}