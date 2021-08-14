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

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;

                // Password should not be published anywhere
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

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
