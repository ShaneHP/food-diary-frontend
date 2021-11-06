import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Pressable,
} from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const errorCheckEmail = (formikProps) => {
        if (formikProps.touched.email && formikProps.errors.email) {
            return formikProps.errors.email;
        } else {
            return errors.email;
        }
    };

    const errorCheckPassword = (formikProps) => {
        if (formikProps.touched.password && formikProps.errors.password) {
            return formikProps.errors.password;
        } else {
            return errors.password;
        }
    };

    const onSubmit = async (values, actions) => {
        const { email, password } = values;
        const res = await login(email, password);
        if (res) {
            setErrors(res.errors);
            return;
        }
        actions.resetForm();
    };

    return (
        <View
            style={{
                justifyContent: 'center',
                flex: 1,
                padding: 20,
            }}
        >
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 30,
                    marginBottom: 30,
                }}
            >
                Login
            </Text>
            <Formik
                validationSchema={loginSchema}
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={onSubmit}
            >
                {(formikProps) => (
                    <View>
                        <TextInput
                            style={globalStyles.input}
                            textContentType="emailAddress"
                            placeholder="Email"
                            onChangeText={formikProps.handleChange('email')}
                            value={formikProps.values.email}
                        />
                        <Text style={globalStyles.errorText}>
                            {errorCheckEmail(formikProps)}
                        </Text>
                        <TextInput
                            textContentType="password"
                            secureTextEntry={true}
                            style={globalStyles.input}
                            placeholder="Password"
                            onChangeText={formikProps.handleChange('password')}
                            value={formikProps.values.password}
                        />
                        <Text style={globalStyles.errorText}>
                            {errorCheckPassword(formikProps)}
                        </Text>

                        <Button
                            title="Login"
                            onPress={formikProps.handleSubmit}
                        />
                    </View>
                )}
            </Formik>
            <View
                style={{
                    paddingTop: 20,
                    alignItems: 'center',
                }}
            >
                <Text>
                    <Text>
                        Not a member?
                        <Text
                            style={{ color: 'blue' }}
                            onPress={() => {
                                navigation.navigate('Register');
                            }}
                        >
                            {' '}
                            Register
                        </Text>
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({});
