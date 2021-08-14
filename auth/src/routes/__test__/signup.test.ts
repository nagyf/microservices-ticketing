import request from 'supertest';
import app from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(201);
});

it('returns a 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'wrongEmail',
            password: 'ThisIsAValidPassword',
        })
        .expect(400);
});

it('returns a 400 on missing email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            password: 'ThisIsAValidPassword',
        })
        .expect(400);
});

it('returns a 400 on invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '',
        })
        .expect(400);
});

it('returns a 400 on missing password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
        })
        .expect(400);
});

it('returns a 400 if user already exists', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(201);

    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(400);
});

it('returns a cookie on successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});
