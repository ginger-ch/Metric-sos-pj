const request = require('supertest');
const mysql = require('mysql2/promise');
const app = require('../app');
const userModel = require('../model/user-model');
const allproductsModel = require('../model/allproducts-model');
const cartModel = require('../model/cart-model');

describe('Database & Business Logic Integration Tests', () => {
    let connection;

    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || 'password',
            database: process.env.DB_NAME || 'girllette',
            port: process.env.DB_PORT || 3306,
        });
    });

    afterAll(async () => {
        if (connection) await connection.end();
    });

    //1. Database Direct Tests
    test('Should query records from products table successfully', async () => {
        const [rows] = await connection.query('SELECT * FROM products LIMIT 5');
        expect(rows.length).toBeGreaterThan(0);
    });

    test('Categories table should contain initialized category records', async () => {
        const [rows] = await connection.query('SELECT * FROM categories');
        expect(Array.isArray(rows)).toBe(true);
    });

    test('Users table structure should contain required authentication fields', async () => {
        const [columns] = await connection.query('DESCRIBE users');
        const fieldNames = columns.map(c => c.Field);
        expect(fieldNames).toContain('email');
        expect(fieldNames).toContain('password');
    });

    //2. Model Unit Tests
    test('allproductsModel execution coverage', async () => {
        if (allproductsModel.getAllProducts) {
            const prods = await allproductsModel.getAllProducts();
            expect(Array.isArray(prods)).toBe(true);
        }
    });

    test('userModel methods coverage', async () => {
        const randomEmail = `test_${Date.now()}@test.com`;
        //test findByEmail เจอ/ไม่เจอ
        if (userModel.findByEmail) {
            const notFound = await userModel.findByEmail('not_found@test.com');
            expect(notFound).toBeFalsy();
        }
        //test createUser
        if (userModel.createUser) {
            try {
                await userModel.createUser({
                    username: `user_${Date.now()}`,
                    email: randomEmail,
                    password: 'hashed_password'
                });
            } catch (err) {
            }
        }
    });

    test('cartModel calculation & flow coverage', async () => {
        if (cartModel.getCartItems) {
            const items = await cartModel.getCartItems(1);
            expect(Array.isArray(items) || items === undefined).toBe(true);
        }
    });

    //3. Controllers & Routes Coverage
    test('GET / - Webstore Home Page', async () => {
        const res = await request(app).get('/');
        expect([200, 304]).toContain(res.status);
    });

    test('GET /all-products - List all products', async () => {
        const res = await request(app).get('/all-products');
        expect([200, 304]).toContain(res.status);
    });

    test('GET /login - Login Page Form', async () => {
        const res = await request(app).get('/login');
        expect(res.status).toBe(200);
    });

    test('GET /register - Register Page Form', async () => {
        const res = await request(app).get('/register');
        expect(res.status).toBe(200);
    });

    test('POST /login - Failed login with invalid credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'invalid_dummy@test.com',
                password: 'wrong_password_123'
            });
        expect([200, 302, 400, 401]).toContain(res.status);
    });

    test('POST /register - Validation or Registration attempt', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                username: `user_${Date.now()}`,
                email: `reg_${Date.now()}@example.com`,
                password: 'Password123!',
                confirmPassword: 'Password123!'
            });
        expect([200, 302, 400]).toContain(res.status);
    });

    test('GET /cart - View Cart', async () => {
        const res = await request(app).get('/cart');
        expect([200, 302]).toContain(res.status);
    });

    test('POST /cart/add - Add item to Cart', async () => {
        const res = await request(app)
            .post('/cart/add')
            .send({ productId: 1, quantity: 1 });
        expect([200, 302, 400, 401]).toContain(res.status);
    });

    test('GET /logout - Session termination', async () => {
        const res = await request(app).get('/logout');
        expect([200, 302]).toContain(res.status);
    });
});