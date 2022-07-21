import { useState } from 'react';
import './Login.scss';

import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from 'ultil/validate.util';
import InputForm from 'components/inputForm';
import userApi from 'services/auth.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { config } from 'config';
import { Input } from 'reactstrap';

const initFormValue = {
    email: '',
    password: '',
};
interface IErrorMessage {
    meta: any;
}
const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<any>('');
    const onSubmit = async (email: string, password: string) => {
        const user = await userApi.Postlogin({ email, password });
        setError(user.errors.email);
        if (user.errors === false) {
            localStorage.setItem('gearfocus-admin-AUTH', JSON.stringify(user));
            navigate(config.routes.products);
        }
    };

    return (
        <div className="form-login">
            <div>
                <h3>Login</h3>
                {error ? error : null}
                <Formik
                    initialValues={initFormValue}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                        onSubmit(values.email, values.password);
                    }}
                >
                    <Form>
                        <Field name="email">
                            {({ field, meta }: any) => (
                                <InputForm meta={meta}>
                                    <Input
                                        {...field}
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                    />
                                </InputForm>
                            )}
                        </Field>
                        <Field name="password">
                            {({ field, meta }: any) => (
                                <InputForm meta={meta}>
                                    <Input
                                        {...field}
                                        label="Password"
                                        name="password"
                                        type="password"
                                        placeholder="Enter your password"
                                    />
                                </InputForm>
                            )}
                        </Field>
                        <button type="submit">
                            <FontAwesomeIcon icon={faRightToBracket} className="icon-login" />
                            <span>Login</span>
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
