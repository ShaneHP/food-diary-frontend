import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import FlatButton from '../shared/Button';
import { globalStyles } from '../styles/global';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import * as yup from 'yup';
import axios from 'axios';
import qs from 'qs';

const baseURL = 'http://10.0.2.2:3000/entry';

const entrySchema = yup.object({
    date: yup.string().required('Date is required'),
    time: yup.string().required('Time is required'),
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

const EntryForm = ({ setModalOpen }) => {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const onSubmit = (values, actions) => {
        actions.resetForm();

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(values),
            baseURL,
        };

        axios(options)
            .then((res) => {
                console.log(res);
                setModalOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <View style={globalStyles.container}>
            <Formik
                style={globalStyles.content}
                validationSchema={entrySchema}
                initialValues={{
                    date: date.toDateString(),
                    time: time.toLocaleTimeString().substr(0, 5),
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
                onSubmit={onSubmit}
            >
                {(formikProps) => (
                    <FormFields
                        formikProps={formikProps}
                        date={date}
                        setDate={setDate}
                        time={time}
                        setTime={setTime}
                    />
                )}
            </Formik>
        </View>
    );
};

const FormFields = ({ formikProps, date, setDate, time, setTime }) => {
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [mealTypeOpen, setMealTypeOpen] = useState(false);
    const [mealType, setMealType] = useState(null);
    const [mealTypeItems, setMealTypeItems] = useState([
        { label: 'Dinner', value: 'Dinner' },
        { label: 'Lunch', value: 'Lunch' },
        { label: 'Breakfast', value: 'Breakfast' },
        { label: 'Snack', value: 'Snack' },
    ]);
    const [hungryOpen, setHungryOpen] = useState(false);
    const [hungry, setHungry] = useState(null);
    const [hungryItems, setHungryItems] = useState([
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'no' },
    ]);

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        formikProps.setFieldValue('date', currentDate.toDateString());
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTime(false);
        setTime(currentTime);
        formikProps.setFieldValue(
            'time',
            currentTime.toLocaleTimeString().substr(0, 5)
        );
    };

    const onMealTypeChange = (selectedMealType) => {
        setMealType(selectedMealType);
        formikProps.setFieldValue('mealType', selectedMealType);
    };

    const onHungryChange = (selectedHungry) => {
        setHungry(selectedHungry);
        formikProps.setFieldValue('hungry', selectedHungry);
    };

    return (
        <ScrollView style={globalStyles.content}>
            <TouchableOpacity onPress={() => setShow(true)}>
                <TextInput
                    style={[globalStyles.input, styles.datePicker]}
                    value={date.toDateString()}
                    editable={false}
                />
            </TouchableOpacity>
            {show && <DateTimePicker value={date} onChange={onDateChange} />}
            <TouchableOpacity onPress={() => setShowTime(true)}>
                <TextInput
                    style={[globalStyles.input, styles.datePicker]}
                    value={time.toLocaleTimeString().substr(0, 5)}
                    editable={false}
                />
            </TouchableOpacity>
            {showTime && (
                <DateTimePicker
                    value={time}
                    onChange={onTimeChange}
                    mode="time"
                    is24Hour={true}
                />
            )}
            <DropDownPicker
                open={mealTypeOpen}
                value={mealType}
                items={mealTypeItems}
                setOpen={setMealTypeOpen}
                setValue={setMealType}
                setItems={setMealTypeItems}
                onOpen={() => setHungryOpen(false)}
                onChangeValue={onMealTypeChange}
                listMode="SCROLLVIEW"
                placeholder="Meal Type"
                placeholderStyle={{
                    color: 'grey',
                    fontSize: 18,
                }}
                dropDownContainerStyle={{
                    borderColor: '#ddd',
                }}
                selectedItemContainerStyle={{
                    backgroundColor: '#ddd',
                }}
                selectedItemLabelStyle={{
                    fontWeight: 'bold',
                }}
                listItemLabelStyle={{
                    fontSize: 18,
                }}
                labelStyle={{
                    fontSize: 18,
                }}
                style={globalStyles.input}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.mealType && formikProps.errors.mealType}
            </Text>
            <TextInput
                name="foodItems.name"
                style={globalStyles.input}
                placeholder="Food Item"
                onChangeText={formikProps.handleChange('foodItems.name')}
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
                onChangeText={formikProps.handleChange('location')}
                value={formikProps.values.location}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.location && formikProps.errors.location}
            </Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Mood"
                onChangeText={formikProps.handleChange('mood')}
                value={formikProps.values.mood}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.mood && formikProps.errors.mood}
            </Text>
            <TextInput
                style={globalStyles.input}
                placeholder="What else were you doing while eating?"
                onChangeText={formikProps.handleChange('activity')}
                value={formikProps.values.activity}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.activity && formikProps.errors.activity}
            </Text>
            {/* <TextInput
                style={globalStyles.input}
                placeholder="Were you hungry?"
                onChangeText={formikProps.handleChange('hungry')}
                value={formikProps.values.hungry}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.hungry && formikProps.errors.hungry}
            </Text> */}
            <DropDownPicker
                open={hungryOpen}
                value={hungry}
                items={hungryItems}
                setOpen={setHungryOpen}
                setValue={setHungry}
                setItems={setHungryItems}
                onOpen={() => setMealTypeOpen(false)}
                onChangeValue={onHungryChange}
                listMode="SCROLLVIEW"
                placeholder="Were you hungry?"
                placeholderStyle={{
                    color: 'grey',
                    fontSize: 18,
                }}
                dropDownContainerStyle={{
                    borderColor: '#ddd',
                }}
                selectedItemContainerStyle={{
                    backgroundColor: '#ddd',
                }}
                selectedItemLabelStyle={{
                    fontWeight: 'bold',
                }}
                listItemLabelStyle={{
                    fontSize: 18,
                }}
                labelStyle={{
                    fontSize: 18,
                }}
                style={globalStyles.input}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.hungry && formikProps.errors.hungry}
            </Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Who were you with?"
                onChangeText={formikProps.handleChange('whoWith')}
                value={formikProps.values.whoWith}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.whoWith && formikProps.errors.whoWith}
            </Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Weight in grams"
                onChangeText={formikProps.handleChange('foodItems.weight')}
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
                value={formikProps.values.foodItems.cookingMethod}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.foodItems &&
                    formikProps.touched.foodItems.cookingMethod &&
                    formikProps.errors.foodItems &&
                    formikProps.errors.foodItems.cookingMethod}
            </Text>

            <FlatButton text="Submit" onPress={formikProps.handleSubmit} />
        </ScrollView>
    );
};

export default EntryForm;

const styles = StyleSheet.create({
    datePicker: {
        marginBottom: 30,
    },
});
