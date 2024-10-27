const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    question_text: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
