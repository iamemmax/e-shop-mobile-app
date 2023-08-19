import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Goback from '../../components/Goback'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { colors } from '../../components/util/colors';
import { Formik } from "formik"
import { signupvalidation, updatePaswwordValidation } from '../../components/validation/onboarding';
import { OnboardingStackProps } from '../../types/onboarding/onboardtypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Button, Text, TextInput, VStack } from '@react-native-material/core';
import { Image } from 'react-native';
import Message from '../../components/util/Message';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { reset, RegisterUser, updateResetNewPassword } from '../../redux/slice/auth/onboard';
import { updateNewPassword } from '../../types/onboarding/signupTypes';
import Headings from '../../components/Text/Headings';


const UpdatePassword = () => {
    const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackProps>>()
    const [showPassword, setShowPassword] = useState(true)
    const [showToast, setShowToast] = useState(false)


    const dispatch = useAppDispatch()
    const { user, isError, isLoading, isSuccess, message } = useAppSelector((state) => state.auth)
    // const {user } = useAppSelector((state)=>state.signup)
    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [message, isError]);

    if (isSuccess && user?.res === "ok") {
        // @ts-ignore
        navigation.push("verifyUser", { userId: user.user.userId })
    }
    // console.log(user?.user, "message");


    if (isSuccess && message === "password change successfully") {
        navigation.navigate("Login")
    }
    return (
        <Formik
            initialValues={{ password: '', password2: "" }}
            validationSchema={updatePaswwordValidation}
            onSubmit={async ({ password, password2 }) => {
                const datas: updateNewPassword = {
                    userId: user?.userId,
                    password,
                    password2
                }
                dispatch(updateResetNewPassword(datas))
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
                                        <Headings title='Create New Passsword' subtitle='Choose a strong password' />
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
                                        <Button title="Update" disabled={!isValid} onPress={handleSubmit}
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


export default UpdatePassword

const styles = StyleSheet.create({})