const mongoose = require('mongoose');
require('dotenv').config(); // Carrega as variáveis do .env

const url = process.env.MONGO_URL;

console.log(url); // Mostra a URL carregada

async function main() {
    try {
        if (!url) throw new Error('URL de conexão não definida');
        
        // Conectar sem as opções deprecated
        await mongoose.connect(url);
        
        console.log('Conectado com sucesso ao MongoDB');
    } catch (error) {
        console.error('Erro ao Conectar a Base de Dados:', error.message);
    }
}

main();
