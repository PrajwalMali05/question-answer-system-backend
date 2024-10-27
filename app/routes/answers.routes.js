module.exports = async app => {
    const answerController = require("../controllers/answers.controller");
    let router = require("express").Router();

    // Create a new Answer
    router.post("/", answerController.createAnswer);
    router.get("/", answerController.getAllAnswers);
    router.put("/:id", answerController.updateAnswer);
    router.delete("/:id", answerController.deleteAnswer);
    router.get("/question/:question_id", answerController.getAnswerByQuestionId);
    await app.use("/api/answer", router);
}