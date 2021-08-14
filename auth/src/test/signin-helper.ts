import request from 'supertest';
import app from '../app';

export const signinHelper = async (
    email: string = 'test@test.com',
    password: string = 'Password123'
): Promise<string[]> => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            password,
        })
        .expect(201);

    return response.get('Set-Cookie');
};
