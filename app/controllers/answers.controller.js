const db = require("../models");
const Topic = db.topic;  // Assuming Topic schema is defined
const Question = db.question;
const Answer = db.answer;

exports.createAnswer = async (req, res) => {
    try {
        const { question_id, answer_text, code_snippet } = req.body;

        // Check if the question exists
        const question = await Question.findById(question_id);
        if (!question) {
            return res.status(400).json({ error: 'Question does not exist' });
        }

        // Create and save the answer
        const answer = new Answer({ question_id, answer_text, code_snippet });
        await answer.save();

        res.status(201).json(answer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.getAllAnswers = async (req, res) => {
    try {
        const answers = await Answer.find().populate('question_id'); // Populate question details
        res.json(answers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getAnswerByQuestionId = async (req, res) => {
    try {
        const answers = await Answer.find({ question_id: req.params.question_id });
        res.json(answers);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.updateAnswer = async (req, res) => {
    try {
        const { answer_text, code_snippet } = req.body;

        const answer = await Answer.findByIdAndUpdate(
            req.params.id,
            { answer_text, code_snippet, updated_at: Date.now() },
            { new: true }
        );

        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        res.json(answer);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.deleteAnswer = async (req, res) => {
    try {
        const answer = await Answer.findByIdAndDelete(req.params.id);

        if (!answer) {
            return res.status(404).json({ error: 'Answer not found' });
        }

        res.json({ message: 'Answer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}