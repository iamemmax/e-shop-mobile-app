import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FC, ReactNode, useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { TabStackProps } from '../../types/homestack/BottomTab';
import HomeStack from '../stack/Home';
import { colors } from '../../components/util/colors';
import CartScreen from '../../screens/cart/CartScreen';
import { Box, Text } from '@react-native-material/core';
import Textfield from '../../components/Text/Textfield';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import NotificationScreen from '../../screens/notification/NotificationScreen';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Tab = createBottomTabNavigator<TabStackProps>();

interface Props {
    id: string;
    name: keyof TabStackProps;
    element: FC,
    icon: ReactNode
}
function BottomTabs() {
    const [active, setActive] = useState("Home")
    const { message: productMsg, msg } = useAppSelector((state) => state.product)


    const tabArray: Props[] = [
        {
            id: "1",
            name: "Home",
            icon: <Ionicons name="ios-home-outline" size={24} color={active === "Home" ? colors?.white : colors?.text_light} />,
            element: HomeStack
        },
        {
            id: "2",
            name: "Cart",
            icon: <Ionicons name="cart-outline" size={24} color={active === "Cart" ? colors?.white : colors?.text_light} />,
            element: CartScreen


        },
        {
            id: "3",
            name: "Profile",
            icon: <MaterialCommunityIcons name="account-outline" size={24} color={active === "Profile" ? colors?.white : colors?.text_light} />,
            element: ProfileScreen


        },
        {
            id: "4",
            name: "Inbox",
            icon: <MaterialCommunityIcons name="bell-badge-outline" size={24} color={active === "Inbox" ? colors?.white : colors?.text_light} />,
            element: NotificationScreen


        },

    ]

    return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { ...styles.container },
                tabBarItemStyle: { backgroundColor: colors.bg },
            }}
        // screenListeners={{}}
        >


            {tabArray?.map((tab: Props) => (
                <Tab.Screen name={tab?.name} component={tab?.element} key={tab?.id}
                    listeners={{
                        tabPress: () => setActive(tab?.name)
                    }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Box style={[focused && styles.active]}>
                                {tab?.name === active ? <Box radius={15} bg={colors.primary} w={30} h={30} style={{ justifyContent: "center", alignItems: "center", }}>
                                    {tab?.icon}
                                </Box> : tab?.icon}
                                {active === tab?.name &&
                                    <Textfield
                                        fontSize={RFValue(16)}
                                        color={colors?.text_light}
                                        textTransform="capitalize"
                                        fontWeight={"bold"}
                                        title={tab?.name}
                                    />}
                            </Box>
                        )
                    }}

                />
            ))}



        </Tab.Navigator >
    );
}

export default BottomTabs

const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: "center",
        height: 60,
        borderTopRightRadius: 40
    },
    active: {
        padding: 9,
        paddingHorizontal: 12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors?.grey,
        borderRadius: 60,
        flexDirection: "row",
        gap: 4
    }
})