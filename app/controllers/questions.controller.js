const db = require("../models");
const Topic = db.topic;  // Assuming Topic schema is defined
const Question = db.question;

exports.createQuestion = async (req, res) => {
    try {
        const { topic_id, question_text } = req.body;

        // Check if the topic exists
        const topic = await Topic.findById(topic_id);
        if (!topic) {
            return res.status(400).json({ error: 'Topic does not exist' });
        }

        // Create and save the question
        const question = new Question({ topic_id, question_text });
        await question.save();

        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('topic_id'); // Populate topic details
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('topic_id');
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.json(question);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.updateQuestion = async (req, res) => {
    try {
        const { question_text } = req.body;

        const question = await Question.findByIdAndUpdate(
            req.params.id,
            { question_text, updated_at: Date.now() },
            { new: true }
        );

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json(question);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        res.json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}