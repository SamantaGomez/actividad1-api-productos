
const express = require('express');

const app = express();
const PORT = 3000;


app.use(express.json());

// Productos almacenados en memoria
let products = [
  {
    id: 1,
    name: 'Camiseta básica',
    price: 15.5,
    stock: 40,
    category: 'ropa'
  },
  {
    id: 2,
    name: 'Taza de cerámica',
    price: 6.9,
    stock: 120,
    category: 'hogar'
  }
];

// GET: Listar productos
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// POST: Crear un producto
app.post('/products', (req, res) => {
  const { name, price, stock, category } = req.body || {};

  // Validar campos obligatorios
  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    price === undefined ||
    price === null ||
    price === ''
  ) {
    return res.status(400).json({
      error: 'El nombre y el precio son obligatorios'
    });
  }

  // Validar que el precio sea mayor que cero
  if (typeof price !== 'number' ||
      !Number.isFinite(price) ||
      price <= 0) {
    return res.status(400).json({
      error: 'El precio debe ser un número mayor que 0'
    });
  }

  // Crear el producto con un ID automático
  const newProduct = {
    id: Math.max(0, ...products.map(product => product.id)) + 1,
    name: name.trim(),
    price,
    stock,
    category
  };

  // Guardar el producto
  products.push(newProduct);

  // Responder con el producto creado
  res.status(201).json(newProduct);
});

// Iniciar servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

// Exportar para pruebas con Jest
module.exports = app;
