import React, { useEffect, useRef, useState } from 'react'
import { Box, HStack, Text } from '@react-native-material/core'
import { Dimensions, FlatList, FlatListProps, Image, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { FetchBanners } from '../../redux/slice/banner';
import { BannerProps, Product } from '../../types/homestack/productTypes';
import { colors } from '../util/colors';

interface productProps {
    item: Product;
    index: number
}
const { width } = Dimensions.get("window")
const Banners = () => {
    const dispatch = useAppDispatch()
    const [activeSlide, setActiveSlide] = useState(0)
    const sliderRef = useRef<FlatList>(null)
    const { isLoading, products, isError, isSuccess } = useAppSelector((state) => state.slider)

    useEffect(() => {
        dispatch(FetchBanners())

    }, [])



    const handleScrollSlider = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x
        const scrollIndex = scrollPosition / width
        setActiveSlide(Math.floor(Math.round(scrollIndex)))

    }
    let length = products?.products.length
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (activeSlide === Number(length) - 1) {
    //             sliderRef?.current?.scrollToIndex({
    //                 index: 0,
    //                 animated: true,
    //             })
    //         } else {
    //             sliderRef?.current?.scrollToIndex({
    //                 index: activeSlide + 1,
    //                 animated: true,
    //             })
    //         }
    //         return () => clearInterval(interval)
    //     }, 20000)
    // }, [])

    // const getItemLayout = (data: any, index: number) => ({
    //     length: width,
    //     index: index,
    //     offset: width * index,
    // })


    const RenderItems = ({ item, index }: productProps) => {
        return (
            <Box h={160} key={index} ph={16} w={width}>
                {
                    <Image source={{ uri: item.img }} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
                }
            </Box>
        )
    }
    return (
        <Box mt={30}>

            {isLoading ? <Text>Loading</Text> : (
                <Box>
                    <FlatList
                        data={products?.products}
                        // ref={sliderRef}
                        renderItem={({ item, index }) => <RenderItems item={item} index={index} />}
                        keyExtractor={(item) => item._id.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <Box />}
                        onScroll={handleScrollSlider}
                    // getItemLayout={getItemLayout}
                    />
                    <HStack justify='center' spacing={10} mt={15}>
                        {products?.products.map((_, index) => (
                            activeSlide === index ? <Box key={index} w={30} h={5} bg={colors.text_light} radius={5} />
                                : <Box key={index} w={5} h={5} bg={colors.primary} radius={5} />
                        ))}
                    </HStack>
                </Box>
            )}

        </Box>
    )
}

export default Banners
