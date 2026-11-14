
const express = require('express');

const app = express();

app.use(express.json());

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
  });
}

module.exports = app;
