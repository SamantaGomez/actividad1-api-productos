
const request = require('supertest');
const app = require('./server');

describe('Store API - Products', () => {

  // Test 1: Listar productos
  test('GET /products should return status 200 and an array', async () => {
    const response = await request(app)
      .get('/products');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
  });

  // Test 2: Crear un producto válido
  test('POST /products should create a product', async () => {
    const newProduct = {
      name: 'Zapatos deportivos',
      price: 45.99,
      stock: 20,
      category: 'calzado'
    };

    const response = await request(app)
      .post('/products')
      .send(newProduct);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.price).toBe(newProduct.price);
  });

  // Test 3: Validar campos obligatorios
  test('POST /products should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        stock: 10,
        category: 'ropa'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'El nombre y el precio son obligatorios'
    });
  });

  // Test 4: Validar precio inválido
  test('POST /products should return 400 for invalid price', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Producto de prueba',
        price: -10,
        stock: 5,
        category: 'hogar'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      error: 'El precio debe ser un número mayor que 0'
    });
  });

});
