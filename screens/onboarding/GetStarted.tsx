import { Dimensions, FlatList, Image, NativeSyntheticEvent, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackProps } from '../../types/onboarding/onboardtypes';
import { NativeScrollEvent } from 'react-native';
import { Box, HStack, IconButton, Text } from '@react-native-material/core';
import { colors } from '../../components/util/colors';
import RightArrow from '../../assets/icon/RightArrow';
import Headings from '../../components/Text/Headings';



interface slideProps {
    id: number,
    img: string;
    title: string;
    description: string;
}
interface Props {
    item: slideProps;
    index: number
}
const slideArray: slideProps[] = [
    {
        id: 1,
        img: "https://plus.unsplash.com/premium_photo-1661666504786-896c8c221a7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHNtaWxpbmclMjBmYXNoaW9uJTIwc2hvcHBpbmclMjBsYWR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
        title: "20% Discount on new Arrival product",
        description: "publish your selfies and make your self more beautiful with this app"
    },
    {
        id: 2,
        img: "https://plus.unsplash.com/premium_photo-1661642114933-b278658815c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHNtaWxpbmclMjBmYXNoaW9uJTIwc2hvcHBpbmclMjBsYWR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
        title: "Take advantage of our shopping offers",
        description: "publish your selfies and make your self more beautiful with this app"
    },
    {
        id: 3,
        img: "https://plus.unsplash.com/premium_photo-1661666716956-bcf9bc1bc4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fHNtaWxpbmclMjBmYXNoaW9uJTIwc2hvcHBpbmclMjBsYWR5fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
        title: "All types of offers within your reach ",
        description: "publish your selfies and make your self more beautiful with this app"
    },
]
const { width, height } = Dimensions.get("window")

const GetStarted = () => {

    const navigation = useNavigation<StackNavigationProp<OnboardingStackProps>>()
    const [activeIndex, setActiveIndex] = useState(0)

    // const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    //     const scrollposition = event.nativeEvent.contentOffset.x
    //     const index = scrollposition / width;
    //     setActiveIndex(Math.floor(Math.round(index)))

    // }


    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPos = event.nativeEvent.contentOffset.x
        const scrollEvent = scrollPos / width
        setActiveIndex(Math.floor(Math.round(scrollEvent)))


    }
    const handleSlideIndex = () => {
        if (activeIndex === 2) {
            navigation.navigate("Signup")
        } else {
            setActiveIndex((prev) => prev + 1)

        }
    }

    const RenderItem = ({ item, index }: Props) => {
        return (
            <Box key={index} w={width} h={"80%"} bg={colors.white}>
                <Box h={350} w={"100%"}>
                    <Image source={{ uri: item.img }} style={{ width, height: "100%" }} />
                </Box>
                <Box ph={16} pv={25}>
                    <Headings title={item?.title} subtitle={item.description} />

                </Box>
            </Box>
        )
    }


    return (
        <Box h={height} w={width} bg={colors.white}>
            <FlatList
                data={slideArray}
                renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
                pagingEnabled
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}

            />

            <Box w={width} ph={16} h={"20%"} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <HStack bg={colors.white} spacing={10}>
                    {slideArray.map((_, index) => {
                        if (activeIndex === index) {
                            return (
                                <Box key={index} w={50} h={10} radius={20} bg={colors.text_light} />
                            )
                        } else {
                            return (
                                <Box key={index} w={10} h={10} radius={20} bg={colors.text_dark} />
                            )

                        }
                    })}
                </HStack>
                <Box w={70} h={70} bg={colors.text_dark} radius={35} style={{ justifyContent: "center", alignItems: "center" }}>
                    {/* <TouchableOpacity> */}
                    <RightArrow fill='#fff' onPress={handleSlideIndex} />
                    {/* </TouchableOpacity> */}
                </Box>

            </Box>
        </Box>
    )
}

export default GetStarted
