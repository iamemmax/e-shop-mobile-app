import { Box, Button, IconButton, VStack } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { colors } from '../../components/util/colors'
import { StackScreenProps } from '@react-navigation/stack';
import { homeStackProps } from '../../types/homestack/homeStackProps';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LeftArrow from '../../assets/icon/LeftArrow';
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSingleProduct, reset } from '../../redux/slice/product';
import Textfield from '../../components/Text/Textfield';
import { FlatList } from 'react-native';
import ProductDetailsComp from '../../components/homepage/details/ProductDetailsComp';
import ProductReviews from '../../components/homepage/details/ProductReviews';
import AddReview from '../../components/homepage/details/AddReview';


const { width, height } = Dimensions.get("window")
type props = StackScreenProps<homeStackProps, "productDetails">
interface Imgprops {
    index: number;
    item: string;
}


const ProductDetails = ({ navigation, route: { params: { slug } } }: props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchSingleProduct(slug))
        return () => {
            dispatch(reset())
        }
    }, [slug,])
    const { isLoading, details } = useAppSelector((state) => state.product)

    const [activeScrollImg, setActiveScrollImg] = useState(0)



    const RenderImg = ({ item, index }: Imgprops) => {
        // console.log(item);
        return (
            <Box h={300} p={5} w={width} >
                <Image key={index} source={{ uri: item }} style={{ width: "100%", height: "100%" }} resizeMode='cover' />
            </Box>
        )
    }
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPos = event.nativeEvent.contentOffset.x
        const scrollIndex = scrollPos / (width);
        setActiveScrollImg(Math.floor(Math.round(scrollIndex)))

    }

    return (
        <Box style={{ flex: 1 }} bg={colors.bg} ph={16} mb={70} position='relative'>
            {isLoading ? <Textfield title={"Loading ..."} mt={30} />
                :
                <Box>
                    <Box mt={40} style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-between" }} h={40}>

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <LeftArrow />
                        </TouchableOpacity>
                        <Box bg={colors.white} radius={50}>
                            <IconButton style={{ width: 40, height: 40 }} icon={<Ionicons name="cart-outline" size={24} color={colors.text_dark} />} />
                        </Box>
                    </Box>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Box>

                            <Box h={300} w={width}>
                                <FlatList
                                    data={details?.product.productImgs}
                                    renderItem={({ item, index }) => <RenderImg item={item} index={index} />}
                                    keyExtractor={(index) => index.toString()}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={handleScroll}
                                />

                                <VStack spacing={8} style={{ position: "absolute", bottom: "50%" }}>
                                    {details?.product?.productImgs?.map((_, index: number) => (
                                        activeScrollImg === index ?
                                            <Box w={3} h={35} bg={colors.text_dark} key={index} radius={10} />
                                            :

                                            <Box w={3} h={20} bg={colors.text_light} key={index} radius={10} />
                                    ))}
                                </VStack>
                            </Box>

                            <Box bg={colors.white} style={{ borderTopRightRadius: 40, borderTopLeftRadius: 40 }} ph={16} pv={16}>
                                <ProductDetailsComp />
                                <Box mt={30}>
                                    <AddReview slug={slug} />

                                </Box>
                                {Number(details?.product?.productReviews?.length) > 0 && <Box minH={400} mb={30}>
                                    <ProductReviews />
                                </Box>}

                            </Box>
                        </Box>
                    </ScrollView>

                </Box>

            }

        </Box>
    )
}

export default ProductDetails