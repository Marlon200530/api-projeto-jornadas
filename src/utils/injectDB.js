const fs = require('fs');
const path = require('path');  // Corrigido: adicionei a importação do módulo 'path'
require('../db/mongoose.js');
const Exam = require('../db/model/exam.js');

const folderPath = path.join(__dirname, '../examsJSON');  // Resolva o caminho da pasta de forma adequada

const injectExamsToDB = async () => {
    try {
        const files = fs.readdirSync(folderPath);  // Lê todos os arquivos da pasta

        // Filtra apenas arquivos com extensão .json
        const jsonFiles = files.filter(file => path.extname(file) === '.json');

        for (const file of jsonFiles) {
            const filePath = path.join(folderPath, file);
            const data = fs.readFileSync(filePath, 'utf8');  // Lê o conteúdo do arquivo

            const examData = JSON.parse(data);  // Converte o conteúdo para um objeto JavaScript
            
            // Salva no MongoDB
            const exam = new Exam(examData);
    
            await exam.save();  // Aguarda o salvamento no banco de dados

            console.log(exam);
            console.log(`Exame ${file} inserido no banco de dados.`);
        }

        console.log('Todos os exames foram inseridos na base de dados!');
    } catch (error) {
        console.log('Erro ao injetar exames:', error);
    } finally {
        // Fechar conexão com o MongoDB se necessário
    }
};

// Chama a função para injetar os exames
injectExamsToDB();
