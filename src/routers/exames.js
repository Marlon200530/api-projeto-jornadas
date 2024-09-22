const express = require("express");
const Exam = require("../db/model/exam.js");
const ExamHistory = require("../db/model/exameRealizado.js");
const router = new express.Router();
const auth = require("../middleware/auth.js");

router.get("/users/exames/:identifier", auth, async (req, res) => {
  try {
    const identifier = req.params.identifier;
    const exam = await Exam.findOne({ identifier });

    if (!exam) {
      return res.status(404).send({ error: "Nao encontrado" });
    }

    res.status(200).send(exam);
  } catch (error) {
    return res.status(500).send({ error: "Algo ocorreu mal" });
  }
});

router.post("/users/exames/:identifier/submit", auth, async (req, res) => {
  try {
    const respostas = req.body.answers;
    const exam = await Exam.findOne({ identifier: req.params.identifier });

    if (!exam) return res.status(404).send('Nao encotrado');

    let score = 0;
    let resultado = '';
    let questionsAnswered = [];

    exam.questions.forEach((question) => {
      const userAnswer = respostas.find((a) => {
        return a.questionId == question.questionId._id;
      });

      const isCorrect =
        userAnswer &&
        userAnswer.selectedOption == question.questionId.correction.option;

      if (userAnswer) {
        if (isCorrect) {
          score += question.score;
        }

        questionsAnswered.push({
          questionId: question.questionId._id,
          selectedOption: userAnswer.selectedOption,
          correct: isCorrect,
        });
        console.log(userAnswer.selectedOption);
      }
    });

    resultado = score >= 10 ? 'Aprovado!' : 'Reprovado!';

    const examHistory = new ExamHistory({
        user: req.user._id,
        exam: exam._id,
        score,
        questionsAnswered,
    })

    await examHistory.save();


    res.send({message: 'Exame submetido com sucesso!', nota: score, qestoesRespondidas: questionsAnswered, resultado});
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

router.get('/allExams', async (_, res) => {
    try {
        const exam = await Exam.find();
        if (!exam) return res.status(404).send('Nao encotrado');

        res.status(200).send(exam);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
