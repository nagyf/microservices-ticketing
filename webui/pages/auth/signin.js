import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRequest } from '../../hooks/use-request';

export const signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [submitSignin, errors] = useRequest({
        url: '/api/users/signin',
        method: 'post',
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await submitSignin({ email, password });
    };

    useEffect(() => {
        setFormValid(email.trim() !== '' && password.trim() != '');
    }, [email, password]);

    return (
        <div>
            <h1>Signin</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email address:</label>
                    <input
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {errors}

                <button className="btn btn-primary" disabled={!formValid}>
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default signup;
