import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

process.env.JWT_KEY = 'test_key';
process.env.NODE_ENV = 'test';

let mongodb: any;

beforeAll(async () => {
    mongodb = await MongoMemoryServer.create();
    const mongoUri = mongodb.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongodb.stop();
    await mongoose.connection.close();
});
