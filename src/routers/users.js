const express = require("express");
const User = require("../db/model/user.js");
const router = new express.Router();
const bcrypt = require('bcrypt');
const auth = require("../middleware/auth.js");
const ExamHistory = require("../db/model/exameRealizado.js");

router.post("/users/create-user", async (req, res) => {
  // adicionar coisas
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    console.log(req.body.password)
    const user = new User(req.body);
    await user.save();

    const userData = user.toObject();
    const token = await user.generateAuthToken();
    delete userData.password; 
    res.status(201).send({ userData, token});
  } catch (error) {
    console.error(error);  
    res.status(400).send(error.message);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    // console.log(user);
    if (!user) return res.status(404).send('Not found');
    const userData = user.toObject();
    delete userData.password;

    const token = await user.generateAuthToken();
    res.send({ userData, token });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get('/users/me', auth, async (req, res) => {
  try {
    // Remover a senha do objeto do usuário
    const user = req.user.toObject(); // Cria uma cópia simples do objeto
    delete user.tokens; // Remove a propriedade password
    delete user.password;
    delete user.examsTaken;
    
    // Buscar o histórico de exames do usuário
    const examHistory = await ExamHistory.find({ user: user._id });

    if (!examHistory) {
      return res.status(404).send({ message: 'Histórico de exames não encontrado' });
    }

    // Enviar os dados do usuário e o histórico de exames na resposta
    res.send({
      examHistory
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao buscar dados do usuário' });
  }
});


module.exports = router;  