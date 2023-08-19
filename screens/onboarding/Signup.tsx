import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Goback from '../../components/Goback'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { colors } from '../../components/util/colors';
import { Formik } from "formik"
import { signupvalidation } from '../../components/validation/onboarding';
import { OnboardingStackProps } from '../../types/onboarding/onboardtypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Text, TextInput, VStack } from '@react-native-material/core';
import { Image } from 'react-native';
import Message from '../../components/util/Message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { reset, RegisterUser } from '../../redux/slice/auth/onboard';
import Headings from '../../components/Text/Headings';


interface userProp {
    msg: string;
    user: {
        res: string;
        email: string;
        msg: string;
        userId: string
        username: string;
    }
}
const Signup = () => {
    const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackProps>>()
    const [showPassword, setShowPassword] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const handleState = () => {
        setShowPassword(!showPassword)
    }

    const dispatch = useAppDispatch()
    const { user, isError, isLoading, isSuccess, message } = useAppSelector((state) => state.auth)
    // const {user } = useAppSelector((state)=>state.signup)
    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [message, isError]);



    if (isSuccess && user?.res === "ok") {
        navigation.push("verifyUser")
    }
    // console.log(message, "message");


    return (
        <Formik
            initialValues={{ email: '', username: "", password: '', password2: "" }}
            validationSchema={signupvalidation}
            onSubmit={async (values) => {
                dispatch(RegisterUser(values))
            }}
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <Box style={{ backgroundColor: colors.white, flex: 1 }}>
                    <Goback />
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ backgroundColor: colors.white, flex: 1 }}>


                        <ScrollView>
                            <Box style={{ position: "relative" }}>
                                <Box style={{ justifyContent: "center", alignItems: "center", height: 200, }}>
                                    <Image source={require("../../assets/freakyLogo.png")} style={{ width: 130, zIndex: 9999, height: 130 }} />
                                </Box>

                                <Box mt={1} ph={20} style={{ position: "relative" }}>
                                    {isError && <Message types={'error'} title={message} setShowToast={setShowToast} msgContainerStyle={{ marginTop: -30, marginBottom: 20 }} />}

                                    {isSuccess ? <Message types={'success'} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: -30, marginBottom: 20 }} /> : null}
                                    <Box mt={-20}>
                                        <Headings title='Sign up' subtitle='Create a new account' />
                                    </Box>
                                    <VStack spacing={18} pv={20}>
                                        <TextInput
                                            label='Username'
                                            onBlur={handleBlur("username")}
                                            value={values.username}
                                            onChangeText={handleChange("username")}
                                            variant='outlined'
                                            color={colors.text_light}
                                            helperText={touched.username && errors.username ? errors.username : ""}

                                        />
                                        <TextInput
                                            label='Email'
                                            onBlur={handleBlur("email")}
                                            value={values.email}
                                            onChangeText={handleChange("email")}
                                            variant='outlined'
                                            color={colors.text_light}
                                            helperText={touched.email && errors.email ? errors.email : ""}
                                            keyboardType='email-address'



                                        />
                                        <TextInput
                                            label='Password'
                                            onBlur={handleBlur("password")}
                                            value={values.password}
                                            onChangeText={handleChange("password")}
                                            variant='outlined'
                                            color={colors.text_light}
                                            helperText={touched.password && errors.password ? errors.password : ""}
                                            secureTextEntry

                                        />
                                        <TextInput
                                            label='Confirm Password'
                                            onBlur={handleBlur("password2")}
                                            value={values.password2}
                                            onChangeText={handleChange("password2")}
                                            variant='outlined'
                                            color={colors.text_light}
                                            helperText={touched.password2 && errors.password2 ? errors.password2 : ""}
                                            secureTextEntry


                                        />
                                        {/* @ts-ignore */}
                                        <Button title="Submit" disabled={!isValid} onPress={handleSubmit}
                                            contentContainerStyle={{ height: 50, backgroundColor: isValid ? colors.text_dark : colors.text_light }}
                                            loading={isLoading}
                                            loadingIndicatorPosition="overlay"

                                        />
                                    </VStack>
                                    <Box mb={20} style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text onPress={() => navigation.navigate("Login")} style={{ fontFamily: "Poppins_400Regular", fontSize: 14 }}>Have an Account? <Text color={colors.text_blue}>Sign In</Text></Text>
                                    </Box>
                                </Box>
                            </Box>
                        </ScrollView>
                    </KeyboardAvoidingView>

                </Box>


            )}
        </Formik>


    )
}

export default Signup
