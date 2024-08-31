const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Servir os arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
