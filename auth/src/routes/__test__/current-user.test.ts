import request from 'supertest';
import app from '../../app';
import { signinHelper } from '../../test/signin-helper';

it('returns 404 when signed out', async () => {
    const response = await request(app)
        .post('/api/users/currentuser')
        .send()
        .expect(404);

    expect(response.body.currentUser).not.toBeDefined();
});

it('returns 200 when signed in with the currentUser in the response', async () => {
    const email = 'test-email@test.com';
    const cookie = await signinHelper(email);

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser).toBeDefined();
    expect(response.body.currentUser.email).toEqual(email);
});
