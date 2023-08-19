import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { OnboardingStackProps } from "../../../types/onboarding/onboardtypes";
import OnboardHome from "../../../screens/onboarding/OnboardHome";
import GetStarted from "../../../screens/onboarding/GetStarted";
import Signup from "../../../screens/onboarding/Signup";
import VerifyUser from "../../../screens/onboarding/VerifyUser";
import Login from "../../../screens/onboarding/Login";
import ResetPassword from "../../../screens/onboarding/ResetPassword";
import VerifyResetPassword from "../../../screens/onboarding/VerifyResetPassword";
import UpdatePassword from "../../../screens/onboarding/UpdatePassword";

const Stack = createStackNavigator<OnboardingStackProps>()

const OnboardingStack = () => {
    return (
        <Stack.Navigator initialRouteName="OnboardHome" screenOptions={{ headerShown: false, animationEnabled: true, gestureDirection: "horizontal" }}>
            <Stack.Screen name="OnboardHome" component={OnboardHome} />
            <Stack.Screen name="OnboardSlide" component={GetStarted} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="verifyUser" component={VerifyUser} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="verifyResetPassword" component={VerifyResetPassword} />
            <Stack.Screen name="updateResetPassword" component={UpdatePassword} />
        </Stack.Navigator>
    )
}

export default OnboardingStack