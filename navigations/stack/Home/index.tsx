import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import Home from "../../../screens/homepage/Home";
import { homeStackProps } from "../../../types/homestack/homeStackProps";
import Login from "../../../screens/onboarding/Login";
import ProductDetails from "../../../screens/homepage/ProductDetails";

const Stack = createStackNavigator<homeStackProps>()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="NavigateLogin" component={Login} />
            <Stack.Screen name="productDetails" component={ProductDetails} />
        </Stack.Navigator>
    )
}

export default HomeStack