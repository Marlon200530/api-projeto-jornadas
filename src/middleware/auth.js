const express = require("express");
const jwt = require('jsonwebtoken');
const User = require('../db/model/user.js');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim();

        const decoded = jwt.verify(token, 'marlonNhantumbo'); //verifica o codigo com base no segredo;
       
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token}); //procura o user pelo id e o token
      
        if(!user) throw new Error();
       

        req.user = user; //evita que o usuario tenha que fazer o login nas proximas requisicoes
        // console.log(user);
        req.token = token;

        next();
    } catch (error) {
        res.status(401).send({error: "Por favor autentique-se"});
    }
}

module.exports = auth;