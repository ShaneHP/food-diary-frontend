import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import FlatButton from '../shared/Button';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import * as yup from 'yup';

const entrySchema = yup.object({
    mealType: yup.string().required('Meal type is required'),
    location: yup.string().required('Location is required'),
    mood: yup.string().required('Mood is required'),
    activity: yup.string().required('Activity is required'),
    hungry: yup.string().required('Hungry is required'),
    whoWith: yup.string().required('Who with is required'),
    foodItems: yup.object({
        name: yup.string().required('Name is required'),
        weight: yup.string().required('Weight with is required'),
        cookingMethod: yup.string().required('Cooking method is required'),
    }),
});

const EntryForm = ({ addEntry }) => {
    return (
        <View style={globalStyles.container}>
            <Formik
                style={globalStyles.content}
                validationSchema={entrySchema}
                initialValues={{
                    mood: '',
                    activity: '',
                    hungry: '',
                    location: '',
                    whoWith: '',
                    mealType: '',
                    foodItems: {
                        name: '',
                        weight: '',
                        cookingMethod: '',
                    },
                }}
                onSubmit={(values, actions) => {
                    actions.resetForm();
                    addEntry(values);
                }}
            >
                {(formikProps) => {
                    return (
                        <ScrollView style={globalStyles.content}>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Meal Type"
                                onChangeText={formikProps.handleChange(
                                    'mealType'
                                )}
                                value={formikProps.values.mealType}
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.mealType &&
                                    formikProps.errors.mealType}
                            </Text>
                            <TextInput
                                name="foodItems.name"
                                style={globalStyles.input}
                                placeholder="Food Item"
                                onChangeText={formikProps.handleChange(
                                    'foodItems.name'
                                )}
                                value={formikProps.values.foodItems.name}
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.foodItems &&
                                    formikProps.touched.foodItems.name &&
                                    formikProps.errors.foodItems &&
                                    formikProps.errors.foodItems.name}
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Location"
                                onChangeText={formikProps.handleChange(
                                    'location'
                                )}
                                value={formikProps.values.location}
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.location &&
                                    formikProps.errors.location}
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Mood"
                                onChangeText={formikProps.handleChange('mood')}
                                value={formikProps.values.mood}
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.mood &&
                                    formikProps.errors.mood}
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="What else were you doing while eating?"
                                onChangeText={formikProps.handleChange(
                                    'activity'
                                )}
                                value={formikProps.values.activity}
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.activity &&
                                    formikProps.errors.activity}
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Were you hungry?"
                                onChangeText={formikProps.handleChange(
                                    'hungry'
                                )}
                                value={formikProps.values.hungry}
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.hungry &&
                                    formikProps.errors.hungry}
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Who were you with?"
                                onChangeText={formikProps.handleChange(
                                    'whoWith'
                                )}
                                value={formikProps.values.whoWith}
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.whoWith &&
                                    formikProps.errors.whoWith}
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Weight in grams"
                                onChangeText={formikProps.handleChange(
                                    'foodItems.weight'
                                )}
                                value={formikProps.values.foodItems.weight}
                                keyboardType="numeric"
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.foodItems &&
                                    formikProps.touched.foodItems.weight &&
                                    formikProps.errors.foodItems &&
                                    formikProps.errors.foodItems.weight}
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Method of cooking"
                                onChangeText={formikProps.handleChange(
                                    'foodItems.cookingMethod'
                                )}
                                value={
                                    formikProps.values.foodItems.cookingMethod
                                }
                            />
                            <Text style={globalStyles.errorText}>
                                {formikProps.touched.foodItems &&
                                    formikProps.touched.foodItems
                                        .cookingMethod &&
                                    formikProps.errors.foodItems &&
                                    formikProps.errors.foodItems.cookingMethod}
                            </Text>

                            <FlatButton
                                text="Submit"
                                onPress={formikProps.handleSubmit}
                            />
                        </ScrollView>
                    );
                }}
            </Formik>
        </View>
    );
};

export default EntryForm;

const styles = StyleSheet.create({});
