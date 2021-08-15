import { useEffect } from 'react';
import { useRequest } from '../../hooks/use-request';
import Router from 'next/router';

const SignOut = () => {
    const [signout, errors] = useRequest({
        url: '/api/users/signout',
        method: 'post',
        onSuccess: () => Router.push('/'),
    });

    useEffect(async () => {
        await signout({});
    }, []);

    return <div>Signing you out...</div>;
};

export default SignOut;
