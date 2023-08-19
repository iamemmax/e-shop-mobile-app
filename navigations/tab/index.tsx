import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import OnboardingStack from '../stack/onboarding/onBoardingStack'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import HomeStack from '../stack/Home'
import { LogoutUser, reset } from '../../redux/slice/auth/onboard'
import BottomTabs from './Bottomtab'
import { persistor } from '../../redux/store/store'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { homeStackProps } from '../../types/homestack/homeStackProps'

const Tabs = () => {
    const navigation = useNavigation<StackNavigationProp<homeStackProps>>()

    const { user, isError, isSuccess, message, isAuthenticated } = useAppSelector((state) => state.auth)
    const { message: productMsg } = useAppSelector((state) => state.product)

    const dispatch = useAppDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [message, isError]);
    // console.log(user, message);
    useEffect(() => {
        if (productMsg === "Not authorized, no token") {
            dispatch(LogoutUser())
            persistor.purge();
            navigation.navigate("NavigateLogin")
        }
    }, [productMsg === "Not authorized, no token"])


    return (

        isAuthenticated === true ?
            <BottomTabs />
            :
            <OnboardingStack />
    )
}

export default Tabs