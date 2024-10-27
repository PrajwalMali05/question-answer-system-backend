const db = require("../models");
const Topic = db.topic;  // Assuming Topic schema is defined

// Create a new topic
exports.createTopic = async (req, res) => {
    try {
        console.log(req.body);

        const { name, description } = req.body;

        // Check if the topic already exists
        const existingTopic = await Topic.findOne({ name });
        if (existingTopic) {
            return res.status(400).json({ error: 'Topic already exists' });
        }

        // Create and save the topic
        const topic = new Topic({ name, description });
        await topic.save();
        res.status(201).json(topic);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: 'Server error', message: error });
    }
};

exports.getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json(topics);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);
        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }
        res.json(topic);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.updateTopic = async (req, res) => {
    try {
        const { name, description } = req.body;

        const topic = await Topic.findByIdAndUpdate(
            req.params.id,
            { name, description, updated_at: Date.now() },
            { new: true }
        );

        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        res.json(topic);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
exports.deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(req.params.id);

        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        res.json({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
