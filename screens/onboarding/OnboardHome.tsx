import { Alert, Dimensions, Image, StyleSheet, TouchableOpacity, View, Animated, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackProps } from '../../types/onboarding/onboardtypes';
import { colors } from '../../components/util/colors';
import { Box, Button, Icon, IconButton, Text, TextInput, VStack } from '@react-native-material/core';
const { height, width } = Dimensions.get("window")
const OnboardHome = () => {
    const navigation = useNavigation<StackNavigationProp<OnboardingStackProps>>()
    // const myValue = new Anim


    return (
        <Box bg={colors.primary} h={height} position='relative'>

            <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmclMjBzbWlsaW5nJTIwbGFkeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60" }} style={{ width, height }} resizeMode='cover' />

            {/* <ImageBackground /> */}
            <VStack position='absolute' bottom={20} h={100} w={width} ph={16} spacing={10} zIndex={99}>
                <Button title="Signup" variant='contained' disableElevation tintColor={colors.text_light}
                    contentContainerStyle={{ height: 45, }}
                    titleStyle={{ fontSize: 20, color: colors.text_dark, fontFamily: "Poppins_400Regular" }}
                    uppercase={false}
                    color={colors.white}
                    onPress={() => navigation.navigate("OnboardSlide")}

                />

                <Button title="Login" variant='contained'
                    disableElevation
                    // tintColor={colors.secondary}
                    titleStyle={{ fontSize: 20, color: colors.text_light, fontFamily: "Poppins_400Regular" }}
                    color={colors.text_dark} uppercase={false}
                    contentContainerStyle={{ height: 45 }}
                    pressableContainerStyle={{ backgroundColor: colors.text_dark }}
                    onPress={() => navigation.navigate("Login")}

                />
            </VStack>



        </Box>
    )
}

export default OnboardHome
