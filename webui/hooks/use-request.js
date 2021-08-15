import { useState } from 'react';
import axios from 'axios';

export const useRequest = ({ url, method, onSuccess, onError }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async (body) => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);

            if (onSuccess) {
                onSuccess(response.data);
            }

            return response.data;
        } catch (err) {
            const errorMessages = err.response.data.errors.map((err, idx) => {
                return <li key={idx}>{err.message}</li>;
            });

            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops...</h4>
                    <ul>{errorMessages}</ul>
                </div>
            );

            if (onError) {
                onError(err.response.data.errors);
            }
        }
    };

    return [doRequest, errors];
};
