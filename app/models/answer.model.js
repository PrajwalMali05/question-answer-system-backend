const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    answer_text: {
        type: String,
        required: true
    },
    code_snippet: {
        type: String  // Can store code snippets as strings or Markdown
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

const Answer = mongoose.model('Answer', AnswerSchema);
module.exports = Answer;
