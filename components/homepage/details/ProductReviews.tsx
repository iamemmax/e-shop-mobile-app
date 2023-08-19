import { Avatar, Box, Button, HStack } from '@react-native-material/core'
import React from 'react'
import Textfield from '../../Text/Textfield'
import StarRating from 'react-native-star-rating-widget'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAppSelector } from '../../../redux/hooks'
import { ProductReview } from '../../../types/homestack/product'
import { colors } from '../../util/colors'
import moment from 'moment'

const ProductReviews = () => {
    const { isLoading, details } = useAppSelector((state) => state.product)

    return (
        <Box mt={40}>
            <HStack justify='between' style={{ alignItems: "center" }}>
                <Textfield title={`Reviews (${details?.product?.numReview})`} fontFamily='Poppins_600SemiBold' fontSize={16} />
                <HStack justify='center' style={{ alignItems: "center" }}>
                    <StarRating
                        rating={3}
                        onChange={(e) => e}
                        maxStars={1}
                        starSize={RFValue(20)}
                    />
                    <Textfield title={details?.product.numReview === 1 ? 2 : details?.product?.rating.toFixed(1)} fontSize={16} mt={5} />

                </HStack>
            </HStack>
            <Box>
                {details?.product?.productReviews?.map((x: ProductReview, index: number) => (
                    <Box key={index} mt={10} pv={10} bg={colors.grey} ph={10} radius={10}>
                        <HStack spacing={10}>
                            <Avatar image={{ uri: "https://mui.com/static/images/avatar/1.jpg" }} size={40} />
                            <Box>
                                {x?.userId?.firstname || x?.userId?.lastname ? <HStack spacing={5}>
                                    {x?.userId.firstname && <Textfield title={x?.userId.firstname} textTransform='capitalize' fontSize={16} fontFamily='Poppins_600SemiBold' />}
                                    {x?.userId.lastname && <Textfield title={x?.userId.lastname} textTransform='capitalize' fontSize={16} fontFamily='Poppins_600SemiBold' />}
                                </HStack>
                                    :
                                    <Textfield title={x?.userId?.username} fontSize={16} fontFamily='Poppins_600SemiBold' />
                                }
                                <Box>
                                    <Textfield title={moment(x?.reviewDate).format('LL')} fontSize={10} color={colors.text_light2} />
                                </Box>
                                <Box mt={2}>
                                    <StarRating
                                        rating={x?.review}
                                        onChange={(e) => e}
                                        starSize={RFValue(18)}
                                        starStyle={{ width: 15, marginLeft: -2, paddingLeft: 0 }}
                                    />
                                </Box>
                                <Box w={"90%"}>
                                    <Textfield title={x?.comment} fontSize={12} lineHeight={22} color={colors.text_dark} mt={4} />
                                </Box>

                            </Box>
                        </HStack>
                    </Box>
                ))}
            </Box>


        </Box>
    )
}

export default ProductReviews
