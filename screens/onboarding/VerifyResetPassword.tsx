import { KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { OnboardingStackProps } from '../../types/onboarding/onboardtypes'
import { colors } from '../../components/util/colors'
import { Box, HStack, Button, Text } from '@react-native-material/core'
import Goback from '../../components/Goback'
import Message from '../../components/util/Message'
import OTPTextInput from 'react-native-otp-textinput'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { ResentOTP, reset, userResetVerification, userVerification } from '../../redux/slice/auth/onboard'
import { User, verifyOtp } from '../../types/onboarding/signupTypes'
import Headings from '../../components/Text/Headings'

// type props = StackScreenProps<OnboardingStackProps, "verifyResetPassword">

interface Users {
    user: User
}
const VerifyResetPassword = () => {
    const { message, isError, isSuccess, isLoading, user } = useAppSelector((state) => state.auth)

    const navigation = useNavigation<StackNavigationProp<OnboardingStackProps>>()
    const [showToast, setShowToast] = useState(false)
    const [otpInput, setOtpInput] = useState("")

    // const { userId } = user
    // console.log(otpInput);


    const dispatch = useAppDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 5000);
    }, [message, isError]);





    if (isSuccess && message === "user verified") {
        navigation.replace("updateResetPassword")
    }




    const handleSubmit = async () => {
        let datas: verifyOtp = {
            // @ts-ignore
            email: user?.email,
            token: Number(otpInput)
        }
        dispatch(userResetVerification(datas))
    }

    const resendOtp = async () => {
        // @ts-ignore
        dispatch(ResentOTP(user?.userId))

    }
    return (
        <Box style={{ flex: 1, backgroundColor: colors.white }} pt={30}>
            <Goback />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView>



                    <Box ph={16}>
                        {isSuccess && <Message types={"success"} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: 10 }} />}
                        {isError && <Message types={"error"} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: 10 }} />}




                        <Box mt={70}>
                            <Text variant='h4'>Enter Otp</Text>
                            <Headings title='Verification' subtitle='Enter verification code sent to your email address' />
                            <HStack justify='between'>
                                <Text>Verification code</Text>
                                <Text color={colors.text_blue} onPress={resendOtp}>Re-send code</Text>
                            </HStack>
                        </Box>
                        <Box>
                            <OTPTextInput handleTextChange={(e) => setOtpInput(e)} inputCount={5} tintColor={colors.text_light} defaultValue={otpInput} offTintColor={colors.text_light} textInputStyle={{ borderBottomWidth: 2 }} />
                            <Box mt={20}>
                                <Button title="Submit Otp" disabled={otpInput.length < 5} onPress={handleSubmit}
                                    contentContainerStyle={{ height: 50, backgroundColor: otpInput.length < 5 ? colors.text_light : colors.text_dark }}
                                    loading={isLoading}
                                    loadingIndicatorPosition="overlay"

                                />
                            </Box>
                        </Box>
                    </Box>
                </ScrollView>

            </KeyboardAvoidingView>
        </Box>
    )
}


export default VerifyResetPassword
