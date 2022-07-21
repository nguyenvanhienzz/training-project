import InputForm from 'components/inputForm';
import { Field, Form, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Label } from 'reactstrap';
import userApi from 'services/auth.service';
import { NewAccountSchema } from 'ultil/validate.util';
import './AccountForm.scss';
interface Props {
    value: any;
    setvalues: any;
}
const AccountForm = (props: Props) => {
    const { id }: any = useParams();

    const navigate = useNavigate();
    const { value, setvalues } = props;
    console.log(value);
    const onSubmit = async (values: any) => {
        const user = await userApi.Createuser(values);
        if (user.errors === false) {
            navigate('/pages/user/manage-user');
        }
    };
    return (
        <div className="account-form">
            <p>Email & password</p>
            <Formik
                enableReinitialize={true}
                initialValues={value}
                validationSchema={NewAccountSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
            >
                <Form>
                    <div className="flex-bott">
                        <Field name="firstName">
                            {({ field, meta }: any) => (
                                <div className="flex-label">
                                    <Label>First Name *</Label>
                                    <InputForm meta={meta}>
                                        <Input
                                            {...field}
                                            label="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder="Enter your firstname"
                                        />
                                    </InputForm>
                                </div>
                            )}
                        </Field>
                        <Field name="lastName">
                            {({ field, meta }: any) => (
                                <div className="flex-label">
                                    <Label>Last Name *</Label>
                                    <InputForm meta={meta}>
                                        <Input
                                            {...field}
                                            label="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Enter your lastname"
                                        />
                                    </InputForm>
                                </div>
                            )}
                        </Field>
                        <Field name="email">
                            {({ field, meta }: any) => (
                                <div className="flex-label">
                                    <Label>Email *</Label>

                                    <InputForm meta={meta}>
                                        <Input
                                            {...field}
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                    </InputForm>
                                </div>
                            )}
                        </Field>
                        <Field name="password">
                            {({ field, meta }: any) => (
                                <div className="flex-label">
                                    <Label>Password *</Label>

                                    <InputForm meta={meta}>
                                        <Input
                                            {...field}
                                            label="Password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                    </InputForm>
                                </div>
                            )}
                        </Field>
                        <Field name="confirm_password">
                            {({ field, meta }: any) => (
                                <div className="flex-label">
                                    <Label>Confirm password *</Label>

                                    <InputForm meta={meta}>
                                        <Input
                                            {...field}
                                            label="confirmpassword"
                                            name="confirm_password"
                                            type="password"
                                            placeholder="Enter your confirmpassword"
                                        />
                                    </InputForm>
                                </div>
                            )}
                        </Field>

                        <div className="flex-label">
                            <Label>Type</Label>
                            {!id ? (
                                <select
                                    name="paymentRailsType"
                                    onChange={(e: any) => setvalues({ ...value, paymentRailsType: e.target.value })}
                                >
                                    <option value="individual">individual</option>
                                    <option value="business">business</option>
                                </select>
                            ) : (
                                <span style={{ color: '#fff', marginLeft: '20px' }}>{value.paymentRailsType}</span>
                            )}
                        </div>
                    </div>
                    <div className="btn-account">
                        {id ? (
                            <button type="submit">Update Accout</button>
                        ) : (
                            <button type="submit">Create Account</button>
                        )}
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AccountForm;
