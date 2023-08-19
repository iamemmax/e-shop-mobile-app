import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Goback from '../../components/Goback'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { colors } from '../../components/util/colors';
import { Formik } from "formik"
import { Resetvalidation } from '../../components/validation/onboarding';
import { OnboardingStackProps } from '../../types/onboarding/onboardtypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, HStack, Text, TextInput, VStack } from '@react-native-material/core';
import { Image } from 'react-native';
import Message from '../../components/util/Message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { reset, ResetUserPassword } from '../../redux/slice/auth/onboard';
import Textfield from '../../components/Text/Textfield';
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
const ResetPassword = () => {
    const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackProps>>()
    const [showPassword, setShowPassword] = useState(true)
    const [showToast, setShowToast] = useState(false)


    const dispatch = useAppDispatch()
    const { user, isError, isLoading, isSuccess, message } = useAppSelector((state) => state.auth)
    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 6000);
    }, [message, isError]);



    // if (isSuccess && user?.res === "ok") {
    //     navigation.push("verifyUser", { user })
    // }

    if (isSuccess && user?.token !== null) {
        navigation.navigate("verifyResetPassword")

    }
    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={Resetvalidation}
            onSubmit={async ({ email }) => {
                dispatch(ResetUserPassword(email))
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
                                    {isError && <Message types={'error'} title={message} setShowToast={setShowToast} msgContainerStyle={{ marginTop: -30, marginBottom: 20 }} />}

                                    {isSuccess ? <Message types={'success'} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: -30, marginBottom: 20 }} /> : null}
                                    <VStack spacing={20}>

                                        {/* <Text style={{ marginTop: -20 }}>Enter your email address</Text> */}
                                        <Box>
                                            <Headings title={"Reset Password"} subtitle='Enter your email address' />
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


                                        {/* @ts-ignore */}
                                        <Button title="Reset" disabled={!isValid} onPress={handleSubmit}
                                            contentContainerStyle={{ height: 50, backgroundColor: isValid ? colors.text_dark : colors.text_light }}
                                            loading={isLoading}
                                            loadingIndicatorPosition="overlay"

                                        />
                                    </VStack>


                                </Box>

                            </Box>
                        </ScrollView>
                    </KeyboardAvoidingView>

                </Box>


            )}
        </Formik>


    )
}

export default ResetPassword
