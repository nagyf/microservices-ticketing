import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserProps {
    readonly email: string;
    readonly password: string;
}

interface UserDocument extends mongoose.Document {
    readonly email: string;
    readonly password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(props: UserProps): UserDocument;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.build = (props: UserProps) => {
    return new User(props);
};

userSchema.pre('save', async function (done) {
    const user = this as UserDocument;

    if (user.isModified('password')) {
        const hash = await Password.toHash(user.get('password'));
        user.set('password', hash);
    }

    done();
});

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
