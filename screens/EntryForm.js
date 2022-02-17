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

const trafficColors = {
    Green: {
        value: 'Green',
        color: '#54D049',
    },
    Amber: {
        value: 'Amber',
        color: '#FF7E06',
    },
    Red: {
        value: 'Red',
        color: '#E61E10',
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
    physicalFeeling: yup.string().required('Physical feeling is required'),
    whoWith: yup.string().required('Who with is required'),
    foodItems: yup.object({
        name: yup.string().required('Name is required'),
        weight: yup.string().required('Weight is required'),
        nutritionalValues: yup.object({
            fat: yup.object({
                weight: yup.string().required('Fat is required'),
                trafficLight: yup.object({
                    guess: yup.object({
                        value: yup
                            .string()
                            .required('Traffic light is required'),
                    }),
                }),
            }),
            saturates: yup.object({
                weight: yup.string().required('Saturates is required'),
                trafficLight: yup.object({
                    guess: yup.object({
                        value: yup
                            .string()
                            .required('Traffic light is required'),
                    }),
                }),
            }),
            sugar: yup.object({
                weight: yup.string().required('Sugar is required'),
                trafficLight: yup.object({
                    guess: yup.object({
                        value: yup
                            .string()
                            .required('Traffic light is required'),
                    }),
                }),
            }),
            salt: yup.object({
                weight: yup.string().required('Salt is required'),
                trafficLight: yup.object({
                    guess: yup.object({
                        value: yup
                            .string()
                            .required('Traffic light is required'),
                    }),
                }),
            }),
        }),
    }),
});

const EntryForm = ({ setModalOpen, initialValues, isUpdate = false }) => {
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
    const [physicalFeeling, setPhysicalFeeling] = useState(
        initialValues ? initialValues.physicalFeeling : null
    );
    const [fatTraffic, setFatTraffic] = useState(
        initialValues
            ? initialValues.foodItems.nutritionalValues.fat.trafficLight.guess
                  .value
            : ''
    );
    const [saturatesTraffic, setSaturatesTraffic] = useState(
        initialValues
            ? initialValues.foodItems.nutritionalValues.saturates.trafficLight
                  .guess.value
            : ''
    );
    const [sugarTraffic, setSugarTraffic] = useState(
        initialValues
            ? initialValues.foodItems.nutritionalValues.sugar.trafficLight.guess
                  .value
            : ''
    );
    const [saltTraffic, setSaltTraffic] = useState(
        initialValues
            ? initialValues.foodItems.nutritionalValues.salt.trafficLight.guess
                  .value
            : ''
    );
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
                    initialValues
                        ? {
                              ...initialValues,
                              foodItems: {
                                  name: initialValues.foodItems.name,
                                  weight: initialValues.foodItems.weight.toString(),
                                  nutritionalValues: {
                                      fat: {
                                          weight: initialValues.foodItems.nutritionalValues.fat.weight.toString(),
                                          trafficLight: {
                                              ...initialValues.foodItems
                                                  .nutritionalValues.fat
                                                  .trafficLight,
                                          },
                                      },
                                      saturates: {
                                          weight: initialValues.foodItems.nutritionalValues.saturates.weight.toString(),
                                          trafficLight: {
                                              ...initialValues.foodItems
                                                  .nutritionalValues.saturates
                                                  .trafficLight,
                                          },
                                      },
                                      sugar: {
                                          weight: initialValues.foodItems.nutritionalValues.sugar.weight.toString(),
                                          trafficLight: {
                                              ...initialValues.foodItems
                                                  .nutritionalValues.sugar
                                                  .trafficLight,
                                          },
                                      },
                                      salt: {
                                          weight: initialValues.foodItems.nutritionalValues.salt.weight.toString(),
                                          trafficLight: {
                                              ...initialValues.foodItems
                                                  .nutritionalValues.salt
                                                  .trafficLight,
                                          },
                                      },
                                  },
                              },
                          }
                        : {
                              date: date.toDateString(),
                              time: time.toLocaleTimeString().substr(0, 5),
                              mood: '',
                              activity: '',
                              hungry: '',
                              location: '',
                              whoWith: '',
                              mealType: '',
                              physicalFeeling: '',
                              foodItems: {
                                  name: '',
                                  weight: '',
                                  nutritionalValues: {
                                      fat: {
                                          weight: '',
                                          trafficLight: {
                                              guess: {
                                                  value: '',
                                                  color: '',
                                              },
                                              actual: {
                                                  value: '',
                                                  color: '',
                                              },
                                          },
                                      },
                                      saturates: {
                                          weight: '',
                                          trafficLight: {
                                              guess: {
                                                  value: '',
                                                  color: '',
                                              },
                                              actual: {
                                                  value: '',
                                                  color: '',
                                              },
                                          },
                                      },
                                      sugar: {
                                          weight: '',
                                          trafficLight: {
                                              guess: {
                                                  value: '',
                                                  color: '',
                                              },
                                              actual: {
                                                  value: '',
                                                  color: '',
                                              },
                                          },
                                      },
                                      salt: {
                                          weight: '',
                                          trafficLight: {
                                              guess: {
                                                  value: '',
                                                  color: '',
                                              },
                                              actual: {
                                                  value: '',
                                                  color: '',
                                              },
                                          },
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
                                    physicalFeeling={physicalFeeling}
                                    setPhysicalFeeling={setPhysicalFeeling}
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
    setStep,
}) => {
    const [fatTrafficOpen, setFatTrafficOpen] = useState(false);
    const [saturatesTrafficOpen, setSaturatesTrafficOpen] = useState(false);
    const [sugarTrafficOpen, setSugarTrafficOpen] = useState(false);
    const [saltTrafficOpen, setSaltTrafficOpen] = useState(false);

    const [trafficItems, setTrafficItems] = useState([
        {
            label: 'Green',
            value: 'Green',
            icon: () => (
                <MaterialIcons name="circle" color="#54D049" size={28} />
            ),
        },
        {
            label: 'Amber',
            value: 'Amber',
            icon: () => (
                <MaterialIcons name="circle" color="#FF7E06" size={28} />
            ),
        },
        {
            label: 'Red',
            value: 'Red',
            icon: () => (
                <MaterialIcons name="circle" color="#E61E10" size={28} />
            ),
        },
    ]);

    const onTrafficChange = (selected, nutrient, setTraffic) => {
        const path = `foodItems.nutritionalValues.${nutrient}.trafficLight.guess`;

        if (selected == 'Green') {
            formikProps.setFieldValue(path, trafficColors.Green);
        } else if (selected == 'Amber') {
            formikProps.setFieldValue(path, trafficColors.Amber);
        } else {
            formikProps.setFieldValue(path, trafficColors.Red);
        }

        setTraffic(selected);
    };

    const updateActualTrafficValue = (input, nutrient) => {
        const path = `foodItems.nutritionalValues.${nutrient}.trafficLight.actual`;

        if (input <= trafficRanges[nutrient].green) {
            formikProps.setFieldValue(path, trafficColors.Green);
        } else if (input <= trafficRanges[nutrient].amber) {
            formikProps.setFieldValue(path, trafficColors.Amber);
        } else {
            formikProps.setFieldValue(path, trafficColors.Red);
        }
    };

    const handleNext = async () => {
        await Promise.all([
            formikProps.setFieldTouched('foodItems.name', true, false),
            formikProps.setFieldTouched('foodItems.weight', true, false),
            formikProps.setFieldTouched(
                'foodItems.nutritionalValues.fat.weight',
                true,
                false
            ),
            formikProps.setFieldTouched(
                'foodItems.nutritionalValues.saturates.weight',
                true,
                false
            ),
            formikProps.setFieldTouched(
                'foodItems.nutritionalValues.sugar.weight',
                true,
                false
            ),
            formikProps.setFieldTouched(
                'foodItems.nutritionalValues.salt.weight',
                true,
                false
            ),
        ]);

        const result = await formikProps.validateForm();

        if (!result.foodItems) {
            setStep(2);
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
                    formikProps.errors.foodItems &&
                    formikProps.errors.foodItems.weight}
            </Text>

            <View style={styles.smallTitle}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Nutritional Values
                </Text>
            </View>

            <View style={styles.nutritionContainer}>
                <View style={{ width: '40%' }}>
                    <Text style={styles.inputLabel}>Fat (g)</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        onChangeText={(input) => {
                            formikProps.setFieldValue(
                                'foodItems.nutritionalValues.fat.weight',
                                input
                            );
                            updateActualTrafficValue(input, 'fat');
                        }}
                        value={
                            formikProps.values.foodItems.nutritionalValues.fat
                                .weight
                        }
                        keyboardType="numeric"
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .fat &&
                            formikProps.errors.foodItems.nutritionalValues.fat
                                .weight}
                    </Text>
                </View>

                <View
                    style={{
                        ...styles.nutritionValue,
                    }}
                >
                    <Text style={styles.inputLabel}>Traffic Light Value</Text>
                    <DropDownPicker
                        open={fatTrafficOpen}
                        value={fatTraffic}
                        items={trafficItems}
                        setOpen={setFatTrafficOpen}
                        setValue={setFatTraffic}
                        setItems={setTrafficItems}
                        zIndex={4000}
                        zIndexInverse={6000}
                        onOpen={() => {
                            setSaturatesTrafficOpen(false);
                            setSugarTrafficOpen(false);
                            setSaltTrafficOpen(false);
                        }}
                        onChangeValue={(selected) => {
                            onTrafficChange(selected, 'fat', setFatTraffic);
                        }}
                        listMode="SCROLLVIEW"
                        placeholder=""
                        dropDownContainerStyle={{
                            borderColor: '#5E5E5E',
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
                        style={styles.trafficInput}
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .fat &&
                            formikProps.errors.foodItems.nutritionalValues.fat
                                .trafficLight &&
                            formikProps.errors.foodItems.nutritionalValues.fat
                                .trafficLight.guess &&
                            formikProps.errors.foodItems.nutritionalValues.salt
                                .trafficLight.guess.value}
                    </Text>
                </View>
            </View>

            <View style={styles.nutritionContainer}>
                <View style={{ width: '40%' }}>
                    <Text style={styles.inputLabel}>Saturates (g)</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        onChangeText={(input) => {
                            formikProps.setFieldValue(
                                'foodItems.nutritionalValues.saturates.weight',
                                input
                            );
                            updateActualTrafficValue(input, 'saturates');
                        }}
                        value={
                            formikProps.values.foodItems.nutritionalValues
                                .saturates.weight
                        }
                        keyboardType="numeric"
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .saturates &&
                            formikProps.errors.foodItems.nutritionalValues
                                .saturates.weight}
                    </Text>
                </View>

                <View
                    style={{
                        ...styles.nutritionValue,
                    }}
                >
                    <Text style={styles.inputLabel}>Traffic Light Value</Text>
                    <DropDownPicker
                        open={saturatesTrafficOpen}
                        value={saturatesTraffic}
                        items={trafficItems}
                        setOpen={setSaturatesTrafficOpen}
                        setValue={setSaturatesTraffic}
                        setItems={setTrafficItems}
                        zIndex={3000}
                        zIndexInverse={7000}
                        onOpen={() => {
                            setFatTrafficOpen(false);
                            setSugarTrafficOpen(false);
                            setSaltTrafficOpen(false);
                        }}
                        onChangeValue={(selected) => {
                            onTrafficChange(
                                selected,
                                'saturates',
                                setSaturatesTraffic
                            );
                        }}
                        listMode="SCROLLVIEW"
                        placeholder=""
                        dropDownContainerStyle={{
                            borderColor: '#5E5E5E',
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
                        style={styles.trafficInput}
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .saturates &&
                            formikProps.errors.foodItems.nutritionalValues
                                .saturates.trafficLight &&
                            formikProps.errors.foodItems.nutritionalValues
                                .saturates.trafficLight.guess &&
                            formikProps.errors.foodItems.nutritionalValues.salt
                                .trafficLight.guess.value}
                    </Text>
                </View>
            </View>

            <View style={styles.nutritionContainer}>
                <View style={{ width: '40%' }}>
                    <Text style={styles.inputLabel}>Sugar (g)</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        onChangeText={(input) => {
                            formikProps.setFieldValue(
                                'foodItems.nutritionalValues.sugar.weight',
                                input
                            );
                            updateActualTrafficValue(input, 'sugar');
                        }}
                        value={
                            formikProps.values.foodItems.nutritionalValues.sugar
                                .weight
                        }
                        keyboardType="numeric"
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .sugar &&
                            formikProps.errors.foodItems.nutritionalValues.sugar
                                .weight}
                    </Text>
                </View>

                <View
                    style={{
                        ...styles.nutritionValue,
                        ...styles.trafficContainer,
                    }}
                >
                    <Text style={styles.inputLabel}>Traffic Light Value</Text>
                    <DropDownPicker
                        open={sugarTrafficOpen}
                        value={sugarTraffic}
                        items={trafficItems}
                        setOpen={setSugarTrafficOpen}
                        setValue={setSugarTraffic}
                        setItems={setTrafficItems}
                        zIndex={2000}
                        zIndexInverse={8000}
                        onOpen={() => {
                            setFatTrafficOpen(false);
                            setSaturatesTrafficOpen(false);
                            setSaltTrafficOpen(false);
                        }}
                        onChangeValue={(selected) => {
                            onTrafficChange(selected, 'sugar', setSugarTraffic);
                        }}
                        listMode="SCROLLVIEW"
                        placeholder=""
                        dropDownContainerStyle={{
                            borderColor: '#5E5E5E',
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
                        style={styles.trafficInput}
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .sugar &&
                            formikProps.errors.foodItems.nutritionalValues.sugar
                                .trafficLight &&
                            formikProps.errors.foodItems.nutritionalValues.sugar
                                .trafficLight.guess &&
                            formikProps.errors.foodItems.nutritionalValues.salt
                                .trafficLight.guess.value}
                    </Text>
                </View>
            </View>

            <View style={styles.nutritionContainer}>
                <View style={{ width: '40%' }}>
                    <Text style={styles.inputLabel}>Salt (g)</Text>
                    <TextInput
                        style={styles.nutritionInput}
                        onChangeText={(input) => {
                            formikProps.setFieldValue(
                                'foodItems.nutritionalValues.salt.weight',
                                input
                            );
                            updateActualTrafficValue(input, 'salt');
                        }}
                        value={
                            formikProps.values.foodItems.nutritionalValues.salt
                                .weight
                        }
                        keyboardType="numeric"
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .salt &&
                            formikProps.errors.foodItems.nutritionalValues.salt
                                .weight}
                    </Text>
                </View>
                <View
                    style={{
                        ...styles.nutritionValue,
                        ...styles.trafficContainer,
                    }}
                >
                    <Text style={styles.inputLabel}>Traffic Light Value</Text>
                    <DropDownPicker
                        open={saltTrafficOpen}
                        value={saltTraffic}
                        items={trafficItems}
                        setOpen={setSaltTrafficOpen}
                        setValue={setSaltTraffic}
                        setItems={setTrafficItems}
                        zIndex={1000}
                        zIndexInverse={9000}
                        onOpen={() => {
                            setFatTrafficOpen(false);
                            setSugarTrafficOpen(false);
                            setSaturatesTrafficOpen(false);
                        }}
                        onChangeValue={(selected) => {
                            onTrafficChange(selected, 'salt', setSaltTraffic);
                        }}
                        listMode="SCROLLVIEW"
                        placeholder=""
                        dropDownContainerStyle={{
                            borderColor: '#5E5E5E',
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
                        style={styles.trafficInput}
                    />
                    <Text style={globalStyles.errorText}>
                        {formikProps.touched.foodItems &&
                            formikProps.errors.foodItems &&
                            formikProps.errors.foodItems.nutritionalValues &&
                            formikProps.errors.foodItems.nutritionalValues
                                .salt &&
                            formikProps.errors.foodItems.nutritionalValues.salt
                                .trafficLight &&
                            formikProps.errors.foodItems.nutritionalValues.salt
                                .trafficLight.guess &&
                            formikProps.errors.foodItems.nutritionalValues.salt
                                .trafficLight.guess.value}
                    </Text>
                </View>
            </View>

            <FlatButton
                text="next"
                onPress={handleNext}
                backgroundColor="blue"
                textColor="white"
                style={{
                    width: 126,
                    paddingVertical: 17,
                    alignSelf: 'flex-end',
                }}
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
    physicalFeeling,
    setPhysicalFeeling,
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
        { label: 'No', value: 'No' },
    ]);
    const [physicalOpen, setPhysicalOpen] = useState(false);
    const [physicalItems, setPhysicalItems] = useState([
        { label: 'Well', value: 'Well' },
        { label: 'Unwell', value: 'Unwell' },
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

    const onPhysicalChange = (selectedPhysical) => {
        setPhysicalFeeling(selectedPhysical);
        formikProps.setFieldValue('physicalFeeling', selectedPhysical);
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
            <Text style={styles.inputLabel}>Date</Text>
            <TouchableOpacity onPress={() => setShow(true)}>
                <TextInput
                    style={[globalStyles.input, styles.datePicker]}
                    value={date.toDateString()}
                    editable={false}
                />
            </TouchableOpacity>
            {show && <DateTimePicker value={date} onChange={onDateChange} />}
            <Text style={styles.inputLabel}>Time</Text>
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
            <Text style={styles.inputLabel}>Meal Type</Text>
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
                placeholder=""
                dropDownContainerStyle={{
                    borderColor: '#5E5E5E',
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
                style={styles.dropDown}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.mealType && formikProps.errors.mealType}
            </Text>
            <Text style={styles.inputLabel}>Location</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={formikProps.handleChange('location')}
                value={formikProps.values.location}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.location && formikProps.errors.location}
            </Text>
            <Text style={styles.inputLabel}>
                How did you feel about your food choice?
            </Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={formikProps.handleChange('mood')}
                value={formikProps.values.mood}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.mood && formikProps.errors.mood}
            </Text>
            <Text style={styles.inputLabel}>
                How did you feel physically after eating?
            </Text>
            <DropDownPicker
                open={physicalOpen}
                value={physicalFeeling}
                items={physicalItems}
                setOpen={setPhysicalOpen}
                setValue={setPhysicalFeeling}
                setItems={setPhysicalItems}
                onOpen={() => {
                    setMealTypeOpen(false);
                    setHungryOpen(false);
                }}
                onChangeValue={onPhysicalChange}
                listMode="SCROLLVIEW"
                placeholder=""
                dropDownContainerStyle={{
                    borderColor: '#5E5E5E',
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
                style={styles.dropDown}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.physical && formikProps.errors.physical}
            </Text>
            <Text style={styles.inputLabel}>
                What else were you doing while eating?
            </Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={formikProps.handleChange('activity')}
                value={formikProps.values.activity}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.activity && formikProps.errors.activity}
            </Text>
            <Text style={styles.inputLabel}>Were you hungry?</Text>
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
                placeholder=""
                dropDownContainerStyle={{
                    borderColor: '#5E5E5E',
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
                style={styles.dropDown}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.hungry && formikProps.errors.hungry}
            </Text>
            <Text style={styles.inputLabel}>Who were you with?</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={formikProps.handleChange('whoWith')}
                value={formikProps.values.whoWith}
            />
            <Text style={globalStyles.errorText}>
                {formikProps.touched.whoWith && formikProps.errors.whoWith}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}
            >
                <FlatButton
                    text="previous"
                    onPress={() => setStep(1)}
                    backgroundColor="white"
                    textColor="blue"
                    style={{
                        width: 120,
                        borderWidth: 3,
                        borderColor: 'blue',
                    }}
                />
                <FlatButton
                    text="Submit"
                    onPress={formikProps.handleSubmit}
                    textColor="white"
                    backgroundColor="blue"
                    style={{ width: 126, paddingVertical: 17 }}
                />
            </View>
        </ScrollView>
    );
};

export default EntryForm;

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
        borderBottomWidth: 2,
        borderColor: '#5E5E5E',
        padding: 10,
        fontSize: 18,
        width: '100%',
        color: 'black',
        marginTop: 5,
    },
    trafficInput: {
        borderBottomWidth: 2,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        marginTop: 5,
        borderRadius: 0,
        borderColor: '#5E5E5E',
        backgroundColor: '#F2F2F2',
    },
    nutritionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nutritionValue: {
        width: '50%',
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
    dropDown: {
        borderBottomWidth: 2,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        marginTop: 5,
        borderRadius: 0,
        borderColor: '#5E5E5E',
        backgroundColor: '#F2F2F2',
    },
    // trafficContainer: {
    //     marginLeft: 25,
    // },
});
