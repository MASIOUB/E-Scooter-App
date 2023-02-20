const loginUser = require('../controllers/loginController.js');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../middlewares/generateToken');

jest.mock('../models/userModel');
jest.mock('bcryptjs');



describe('loginUser', () => {
    it('should send a 200 status and user data if login is successful', async () => {
        const user = {
            email: 'test@example.com',
            password: 'hashedPassword',
        };
        User.findOne.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);

        const req = {
            body: {
                email: 'test@example.com',
                password: 'password',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            username: user.username,
            token: generateToken(user.id),
        });
    });

    it('should send a 400 status and error message if user is not found', async () => {
        User.findOne.mockResolvedValue(null);

        const req = {
            body: {
                email: 'test@example.com',
                password: 'password',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'user not found',
        });
    });

    it('should send a 400 status and error message if password is invalid', async () => {
        const user = {
            email: 'test@example.com',
            password: 'hashedPassword',
          };
        User.findOne.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(false);

        const req = {
            body: {
                email: 'test@example.com',
                password: 'password',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'invalid password',
        });
    });
});