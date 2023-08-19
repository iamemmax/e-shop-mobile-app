import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Box, Button, Flex, HStack, IconButton, Text, VStack } from '@react-native-material/core'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { LogoutUser } from '../../redux/slice/auth/onboard'
import Message from '../../components/util/Message'
import { persistor } from '../../redux/store/store'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { homeStackProps } from '../../types/homestack/homeStackProps'
import Goback from '../../components/Goback'
import Menubar from '../../assets/icon/Menubar'
import Headings from '../../components/Text/Headings'
import Textfield from '../../components/Text/Textfield'
import Searchbar from '../../components/share/Searchbar'
import { colors } from '../../components/util/colors'
import Filtericon from '../../assets/icon/FilterIcon'
import Banners from '../../components/homepage/Banners'
import NewArrival from '../../components/homepage/NewArrival'
import Topselling from '../../components/homepage/Topselling'
import { OnboardingStackProps } from '../../types/onboarding/onboardtypes'

const Home = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<StackNavigationProp<OnboardingStackProps>>()
    const { user, message, isSuccess, isError } = useAppSelector((state) => state.auth)
    const [showToast, setShowToast] = useState(false)


    const handleLogout = () => {
        dispatch(LogoutUser())
        persistor.purge();
        navigation.navigate("Login")
        // console.log(user);
    }

    return (
        <Box style={{ flex: 1 }} bg={colors.bg}>
            <Box mt={41}>


                <Box ph={16}>
                    {isSuccess && <Message types={"success"} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: 10 }} />}
                    {isError && <Message types={"error"} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: 10 }} />}

                </Box>
                <ScrollView showsVerticalScrollIndicator={false}>


                    <Box>
                        <Flex direction='row' justify='between' style={{ alignItems: "center" }} ph={16}>
                            <Box>
                                <IconButton icon={<Menubar />} />
                            </Box>

                            <Box>
                                <IconButton onPress={handleLogout} icon={<Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg", }} size={40} />} />
                            </Box>
                        </Flex>

                        <HStack mt={10} spacing={15} center ph={16}>
                            <Box style={{ flex: 1 }}>
                                <Searchbar />
                            </Box>
                            <Box>
                                <IconButton icon={<Filtericon />} />
                            </Box>
                        </HStack>


                        <Box>
                            <Banners />
                        </Box>
                        <Box ph={16} mt={25}>
                            <NewArrival />
                        </Box>

                        <Box ph={16} mt={25}>
                            <Topselling />
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
        </Box>
    )
}

export default Home
