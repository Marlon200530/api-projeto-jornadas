const mongoose = require('mongoose');

const ExamHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    score: { type: Number, required: true },
    resultado: {type: String, require: true },
    questionsAnswered: [
      {
        questionId: { type: String, required: true },
        selectedOption: { type: String, required: true },
        correct: { type: Boolean, required: true }
      }
    ],
    dateTaken: { type: Date, default: Date.now }
  });
  
  const ExamHistory = mongoose.model('ExamHistory', ExamHistorySchema);
  
  module.exports = ExamHistory;
  