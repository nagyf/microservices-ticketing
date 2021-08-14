import request from 'supertest';
import app from '../../app';

it('returns 403 for unregistered email', async () => {
    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(403);
        
    expect(response.get('Set-Cookie')).not.toBeDefined();
});

it('returns a 200 on successful signin', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('returns a 403 on invalid email', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'invalid@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(403);

    expect(response.get('Set-Cookie')).not.toBeDefined();
});

it('returns a 403 on invalid password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'ThisIsAValidPassword',
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'invalid password',
        })
        .expect(403);

    expect(response.get('Set-Cookie')).not.toBeDefined();
});