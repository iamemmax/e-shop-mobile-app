import React, { useEffect } from 'react'
import { Box, Flex, HStack, IconButton, Text, Wrap } from '@react-native-material/core'
import Textfield from '../Text/Textfield'
import { colors } from '../util/colors'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { fetchProducts, fetchTopProducts } from '../../redux/slice/product';
import { Dimensions, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ProductArray } from '../../types/homestack/product';
import Menubar from '../../assets/icon/Menubar';
import { AntDesign } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating-widget';
import { StackNavigationProp } from '@react-navigation/stack';
import { homeStackProps } from '../../types/homestack/homeStackProps';
import { useNavigation } from '@react-navigation/native';


interface productProps {
    item: ProductArray;
    index: number
}
const { width } = Dimensions.get("window")
const NewArrival = () => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation<StackNavigationProp<homeStackProps>>()

    const { isLoading, isError, message, topSelling } = useAppSelector((state) => state.product)
    useEffect(() => {
        dispatch(fetchTopProducts())
    }, [])


    return (
        <Box>
            {!isLoading && <HStack justify='between'>
                <Textfield title="Top selling" fontSize={18} fontFamily='Poppins_700Bold' color={colors.text_dark} />
                <Textfield title="See all" fontSize={14} color={colors.text_light2} />
            </HStack>}
            <Box mt={10}>
                {isLoading ? <Text>Loading</Text> : (
                    <Box style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 12

                    }}>

                        {topSelling?.products?.map((item: ProductArray, index: number) => (

                            <Box key={index}>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("productDetails", { slug: item?.slug })}>

                                    <Box w={width / 2.3} bg={"#f9f9f9"} radius={10} pv={8} ph={10} h={210}>
                                        <Image source={{ uri: item?.productImgs[0] }} style={{ width: "100%", height: 120, borderRadius: 10 }} resizeMode='cover' />
                                        <Box mt={5}>
                                            <Textfield numberOfLines={1} title={item?.title} fontFamily='Poppins_700Bold' fontSize={14} />
                                            {/* <Textfield title={item?.description} numberOfLines={2} /> */}
                                            <Textfield title={"#" + item?.price} fontSize={16} />

                                            <StarRating
                                                rating={item.rating}
                                                onChange={(e) => e.toFixed()}
                                                starSize={20}
                                                starStyle={{ width: 18, marginLeft: -1 }}
                                            />
                                        </Box>

                                        <Box style={{ position: "absolute", right: 8, top: 5, borderRadius: 15, justifyContent: "center", alignItems: "center" }} w={30} h={30} bg={colors.text_light2}>
                                            <IconButton icon={<AntDesign name="hearto" size={18} color={colors.white} />} />
                                        </Box>
                                    </Box>
                                    <Box>
                                    </Box>
                                </TouchableOpacity>
                            </Box>
                        ))}

                        {/* <Text> <IconButton icon={<AntDesign name="hearto" size={24} color="black" />} /></Text> */}
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default NewArrival
