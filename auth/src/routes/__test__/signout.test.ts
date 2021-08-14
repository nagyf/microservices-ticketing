import request from 'supertest';
import app from '../../app';
import { signinHelper } from '../../test/signin-helper';

it('returns 200 for signing out without token', async () => {
    const response = await request(app)
        .post('/api/users/signout')
        .send()
        .expect(200);
});

it('returns 200 for signing out with token', async () => {
    const cookie = await signinHelper();
        
    await request(app)
        .post('/api/users/signout')
        .set('Cookie', cookie)
        .send()
        .expect(200);
});
