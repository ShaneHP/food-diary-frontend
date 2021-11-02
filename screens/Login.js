import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
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

    const onSubmit = (values, actions) => {
        actions.resetForm();

        const { email, password } = values;
        login(email, password);
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
                            {formikProps.touched.email &&
                                formikProps.errors.email}
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
                            {formikProps.touched.password &&
                                formikProps.errors.password}
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
                }}
            >
                <Button
                    title="go to register page"
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                />
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({});