import React, { useState, useContext } from 'react';
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
import { BASE_URL } from '@env';
import { AuthContext } from '../providers/AuthProvider';
import ProgressBar from '../shared/ProgressBar';
import { MaterialIcons } from '@expo/vector-icons';

const trafficRanges = {
    fat: {
        green: 3,
        amber: 17.5,
    },
    saturates: {
        green: 1.5,
        amber: 5,
    },
    sugar: {
        green: 5,
        amber: 22.5,
    },
    salt: {
        green: 0.3,
        amber: 1.5,
    },
};

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
        weight: yup.string().required('Weight is required'),
        nutritionalValues: yup.object({
            fat: yup.object({
                weight: yup.string().required('Fat is required'),
            }),
            saturates: yup.object({
                weight: yup.string().required('Saturates is required'),
            }),
            sugar: yup.object({
                weight: yup.string().required('Sugar is required'),
            }),
            salt: yup.object({
                weight: yup.string().required('Salt is required'),
            }),
        }),
    }),
});

const EntryForm2 = ({ setModalOpen, initialValues, isUpdate = false }) => {
    const { user } = useContext(AuthContext);

    const [date, setDate] = useState(
        initialValues ? new Date(initialValues.date) : new Date()
    );
    const [time, setTime] = useState(
        initialValues
            ? new Date(`${initialValues.date}, ${initialValues.time}`)
            : new Date()
    );
    const [mealType, setMealType] = useState(
        initialValues ? initialValues.mealType : null
    );
    const [hungry, setHungry] = useState(
        initialValues ? initialValues.hungry : null
    );
    const [fatTraffic, setFatTraffic] = useState({
        value: 'Green',
        color: '#54D049',
    });
    const [saturatesTraffic, setSaturatesTraffic] = useState({
        value: 'Green',
        color: '#54D049',
    });
    const [sugarTraffic, setSugarTraffic] = useState({
        value: 'Green',
        color: '#54D049',
    });
    const [saltTraffic, setSaltTraffic] = useState({
        value: 'Green',
        color: '#54D049',
    });
    const [step, setStep] = useState(1);

    const onSubmit = (values, actions) => {
        actions.resetForm();

        if (isUpdate) {
            console.log('updating');
            updateEntry(values);
        } else {
            addEntry(values);
        }
    };

    const addEntry = (values) => {
        values.userId = user._id;

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${user.jwt}`,
            },
            data: qs.stringify(values),
            url: `${BASE_URL}/entry`,
        };

        axios(options)
            .then((res) => {
                console.log('entry successfully added');
                setModalOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateEntry = (values) => {
        const options = {
            method: 'PATCH',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${user.jwt}`,
            },
            data: qs.stringify(values),
            url: `${BASE_URL}/entry/${values._id}`,
        };

        axios(options)
            .then((res) => {
                console.log('entry successfully updated');
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
                initialValues={
                    initialValues || {
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
                            nutritionalValues: {
                                fat: {
                                    weight: '',
                                    trafficLight: '',
                                },
                                saturates: {
                                    weight: '',
                                    trafficLight: '',
                                },
                                sugar: {
                                    weight: '',
                                    trafficLight: '',
                                },
                                salt: {
                                    weight: '',
                                    trafficLight: '',
                                },
                            },
                        },
                    }
                }
                onSubmit={onSubmit}
            >
                {(formikProps) => {
                    switch (step) {
                        case 1:
                            return (
                                <FormStep1
                                    formikProps={formikProps}
                                    fatTraffic={fatTraffic}
                                    setFatTraffic={setFatTraffic}
                                    saturatesTraffic={saturatesTraffic}
                                    setSaturatesTraffic={setSaturatesTraffic}
                                    sugarTraffic={sugarTraffic}
                                    setSugarTraffic={setSugarTraffic}
                                    saltTraffic={saltTraffic}
                                    setSaltTraffic={setSaltTraffic}
                                    initialValues={initialValues}
                                    setStep={setStep}
                                />
                            );
                        case 2:
                            return (
                                <FormStep2
                                    formikProps={formikProps}
                                    date={date}
                                    setDate={setDate}
                                    time={time}
                                    setTime={setTime}
                                    mealType={mealType}
                                    setMealType={setMealType}
                                    hungry={hungry}
                                    setHungry={setHungry}
                                    initialValues={initialValues}
                                    setStep={setStep}
                                />
                            );
                    }
                }}
            </Formik>
        </View>
    );
};

const FormStep1 = ({
    formikProps,
    fatTraffic,
    setFatTraffic,
    saturatesTraffic,
    setSaturatesTraffic,
    sugarTraffic,
    setSugarTraffic,
    saltTraffic,
    setSaltTraffic,
    initialValues = {},
    setStep,
}) => {
    const updateTrafficValue = (input, nutrient, setTraffic) => {
        if (input <= trafficRanges[nutrient].green) {
            setTraffic({ value: 'Green', color: '#54D049' });
        } else if (input <= trafficRanges[nutrient].amber) {
            setTraffic({ value: 'Amber', color: '#FF7E06' });
        } else {
            setTraffic({ value: 'Red', color: '#E61E10' });
        }
    };

    return (
        <ScrollView style={globalStyles.content}>
            <ProgressBar
                bgcolor="#2EC23D"
                completed={50}
                step="1"
                totalSteps="2"
            />
            <View style={styles.title}>
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                    Food Information
                </Text>
            </View>
            <Text style={{ fontSize: 18, color: '#5C5C5C' }}>Food Item</Text>
            <TextInput
                name="foodItems.name"
                style={globalStyles.input}
                onChangeText={formikProps.handleChange('foodItems.name')}
                value={formikProps.values.foodItems.name}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.foodItems &&
                    formikProps.touched.foodItems.name &&
                    formikProps.errors.foodItems &&
                    formikProps.errors.foodItems.name}
            </Text>
            <Text style={{ fontSize: 18, color: '#5C5C5C' }}>Weight (g)</Text>
            <TextInput
                style={globalStyles.input}
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

            <View style={styles.smallTitle}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Nutritional Values
                </Text>
            </View>

            <View style={styles.nutritionContainer}>
                <View style={styles.nutritionValue}>
                    <Text style={styles.inputLabel}>Fat (g)</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        onChangeText={(input) => {
                            formikProps.handleChange(
                                'foodItems.nutritionalValues.fat.weight'
                            );
                            updateTrafficValue(input, 'fat', setFatTraffic);
                        }}
                        value={
                            formikProps.values.foodItems.nutritionalValues.fat
                                .weight
                        }
                        keyboardType="numeric"
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.touched.foodItems.nutritionalValues &&
                            formikProps.touched.foodItems.nutritionalValues
                                .fat &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .fat &&
                            formikProps.errors.foodItems.nutritionalValues.fat
                                .weight}
                    </Text>
                </View>

                <View>
                    <Text style={styles.inputLabel}>Traffic Light Value</Text>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={fatTraffic.color}
                            size={28}
                        />
                        <Text
                            style={styles.trafficText}
                        >{` ${fatTraffic.value}`}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.nutritionContainer}>
                <View style={styles.nutritionValue}>
                    <Text style={styles.inputLabel}>Saturates (g)</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        onChangeText={(input) => {
                            updateTrafficValue(
                                input,
                                'saturates',
                                setSaturatesTraffic
                            );
                            formikProps.handleChange(
                                'foodItems.nutritionalValues.saturates.weight'
                            );
                        }}
                        value={
                            formikProps.values.foodItems.nutritionalValues
                                .saturates.weight
                        }
                        keyboardType="numeric"
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.touched.foodItems.nutritionalValues &&
                            formikProps.touched.foodItems.nutritionalValues
                                .saturates &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .saturates &&
                            formikProps.errors.foodItems.nutritionalValues
                                .saturates.weight}
                    </Text>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Traffic Light Value</Text>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={saturatesTraffic.color}
                            size={28}
                        />
                        <Text
                            style={styles.trafficText}
                        >{` ${saturatesTraffic.value}`}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.nutritionContainer}>
                <View style={styles.nutritionValue}>
                    <Text style={styles.inputLabel}>Sugar (g)</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        onChangeText={(input) => {
                            updateTrafficValue(input, 'sugar', setSugarTraffic);
                            formikProps.handleChange(
                                'foodItems.nutritionalValues.sugar.weight'
                            );
                        }}
                        value={
                            formikProps.values.foodItems.nutritionalValues.sugar
                                .weight
                        }
                        keyboardType="numeric"
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.touched.foodItems.nutritionalValues &&
                            formikProps.touched.foodItems.nutritionalValues
                                .sugar &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .sugar &&
                            formikProps.errors.foodItems.nutritionalValues.sugar
                                .weight}
                    </Text>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Traffic Light Value</Text>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={sugarTraffic.color}
                            size={28}
                        />
                        <Text
                            style={styles.trafficText}
                        >{` ${sugarTraffic.value}`}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.nutritionContainer}>
                <View style={styles.nutritionValue}>
                    <Text style={styles.inputLabel}>Salt (g)</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        onChangeText={(input) => {
                            updateTrafficValue(input, 'salt', setSaltTraffic);
                            formikProps.handleChange(
                                'foodItems.nutritionalValues.salt.weight'
                            );
                        }}
                        value={
                            formikProps.values.foodItems.nutritionalValues.salt
                                .weight
                        }
                        keyboardType="numeric"
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.touched.foodItems.nutritionalValues &&
                            formikProps.touched.foodItems.nutritionalValues
                                .salt &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .salt &&
                            formikProps.errors.foodItems.nutritionalValues.salt
                                .weight}
                    </Text>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Traffic Light Value</Text>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={saltTraffic.color}
                            size={28}
                        />
                        <Text
                            style={styles.trafficText}
                        >{` ${saltTraffic.value}`}</Text>
                    </View>
                </View>
            </View>

            <FlatButton
                text="Submit"
                onPress={formikProps.handleSubmit}
                backgroundColor="blue"
            />
            <FlatButton
                text="next"
                onPress={() => setStep(2)}
                backgroundColor="blue"
            />
        </ScrollView>
    );
};

const FormStep2 = ({
    formikProps,
    date,
    setDate,
    time,
    setTime,
    mealType,
    setMealType,
    hungry,
    setHungry,
    initialValues = {},
    setStep,
}) => {
    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [mealTypeOpen, setMealTypeOpen] = useState(false);
    const [mealTypeItems, setMealTypeItems] = useState([
        { label: 'Dinner', value: 'Dinner' },
        { label: 'Lunch', value: 'Lunch' },
        { label: 'Breakfast', value: 'Breakfast' },
        { label: 'Snack', value: 'Snack' },
    ]);
    const [hungryOpen, setHungryOpen] = useState(false);
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
            <ProgressBar
                bgcolor="#2EC23D"
                completed={100}
                step="2"
                totalSteps="2"
            />
            <View style={styles.title}>
                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                    Additional Information
                </Text>
            </View>
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
            <FlatButton
                text="previous"
                onPress={() => setStep(1)}
                backgroundColor="blue"
            />
        </ScrollView>
    );
};

export default EntryForm2;

const styles = StyleSheet.create({
    datePicker: {
        marginBottom: 30,
    },
    title: {
        marginVertical: 30,
    },
    smallTitle: {
        marginBottom: 30,
    },
    inputLabel: {
        fontSize: 18,
        color: '#5C5C5C',
    },
    nutritionInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        width: '100%',
        color: 'black',
        backgroundColor: 'white',
        marginTop: 5,
    },
    nutritionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nutritionValue: {
        width: '40%',
    },
    trafficLightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
    },
    trafficText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
