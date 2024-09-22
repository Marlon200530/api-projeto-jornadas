const mongoose = require("mongoose");
// require("../mongoose.js"); //connectar  a base de dados




const ExamSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  identifier: { type: String, required: true },
  label: { type: String, required: true },
  subject: { type: String, required: true },
  year: { type: Number, required: true },
  school: { type: String, required: true },
  level: { type: String, required: true }, 
  period: { type: String, default: null },
  total_score: { type: Number, required: true },
  total_questions: { type: Number, required: true },
  time: { type: Number, required: true }, // campo 'time' para o tempo de duração do exame
  questions: [
    {
      score: { type: Number, required: true },
      questionId: {
        correction: {
          option: { type: String, required: true },
          steps: { type: [String], required: true },
          videoLink: { type: String },
        },
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        identifier: { type: String, required: true },
        topic: { type: String, default: "" },
        topicLabel: { type: String, default: "" },
        year: { type: Number, required: true },
        university: { type: String, required: true },
        subject: { type: String, required: true },
        period: { type: String, default: null },
        number: { type: Number, required: true },
        level: { type: String, required: true },
        description: { type: String, required: true },
        figureUrl: { type: String, default: "" },
        options: [
          {
            letter: { type: String, required: true },
            text: { type: String, required: true },
            figureUrl: { type: String, default: "" },
          },
        ],
        tip: { type: String },
        examLabel: { type: String },
      },
    },
  ],
});

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
