import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Goback from '../../components/Goback'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { colors } from '../../components/util/colors';
import { Formik } from "formik"
import { Loginvalidation, signupvalidation } from '../../components/validation/onboarding';
import { OnboardingStackProps } from '../../types/onboarding/onboardtypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, HStack, Text, TextInput, VStack } from '@react-native-material/core';
import { Image } from 'react-native';
import Message from '../../components/util/Message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { reset, LoginUsers } from '../../redux/slice/auth/onboard';
import Headings from '../../components/Text/Headings';
import Textfield from '../../components/Text/Textfield';


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
const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackProps>>()
    const [showPassword, setShowPassword] = useState(true)
    const [showToast, setShowToast] = useState(false)
    const handleState = () => {
        setShowPassword(!showPassword)
    }

    const dispatch = useAppDispatch()
    const { user, isError, isLoading, isSuccess, message } = useAppSelector((state) => state.auth)
    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [message, isError]);



    // if (isSuccess && user?.res === "ok") {
    //     navigation.push("")
    // }


    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Loginvalidation}
            onSubmit={async (values) => {
                dispatch(LoginUsers(values))
            }}
        >

            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <Box style={{ backgroundColor: colors.white, flex: 1 }}>
                    <Goback />
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ backgroundColor: colors.white, flex: 1 }}>

                        <ScrollView>
                            <Box style={{ position: "relative" }}>
                                <Box style={{ justifyContent: "center", alignItems: "center", height: 200 }}>
                                    <Image source={require("../../assets/freakyLogo.png")} style={{ width: 130, height: 130 }} />
                                </Box>

                                <Box mt={1} ph={20} style={{ position: "relative" }}>
                                    {isError && message !== "undefined" && <Message types={'error'} title={message} setShowToast={setShowToast} msgContainerStyle={{ marginTop: -30, marginBottom: 20 }} />}

                                    {isSuccess && message !== "undefined" ? <Message types={'success'} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: -30, marginBottom: 20 }} /> : null}
                                    <VStack spacing={20}>
                                        <Box mt={-10}>
                                            <Headings title='Welcome' subtitle='Please login or signup to use our app' />
                                        </Box>

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

                                        {/* @ts-ignore */}
                                        <Button title="Login" disabled={!isValid} onPress={handleSubmit}
                                            contentContainerStyle={{ height: 50, backgroundColor: isValid ? colors.text_dark : colors.text_light }}
                                            loading={isLoading}
                                            loadingIndicatorPosition="overlay"

                                        />
                                    </VStack>


                                </Box>
                                <HStack justify='between' ph={20} mt={20}>

                                    <Textfield title={"Forget Password"} color={colors.text_dark} onPress={() => navigation.navigate("ResetPassword")} />
                                    <Textfield title={"Signup"} color={colors.text_dark} onPress={() => navigation.navigate("Signup")} />

                                </HStack>
                            </Box>
                        </ScrollView>
                    </KeyboardAvoidingView>

                </Box>


            )}
        </Formik>


    )
}

export default Login
