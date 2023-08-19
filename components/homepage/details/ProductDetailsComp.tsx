import React, { useState } from 'react'
import { Box, Button, HStack, IconButton } from '@react-native-material/core'
import Textfield from '../../Text/Textfield'
import StarRating from 'react-native-star-rating-widget'
import { colors } from '../../util/colors'
import { TouchableOpacity } from 'react-native'
import { FontAwesome5, AntDesign, Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../../redux/hooks'
import { ProductRes } from '../../../types/homestack/product'
import { useAppDispatch } from '../../../redux/hooks/index';
// import { addTocart, cartSprops } from '../../../redux/slice/cart/cartSlice'

const ProductDetailsComp = () => {
    const dispatch = useAppDispatch()
    const { isLoading, details } = useAppSelector((state) => state.product)
    // const { cart } = useAppSelector((state) => state.cart)
    const [sizeActive, setSizeActive] = useState("")
    const [selectColor, setSelectColor] = useState("")
    const [count, setcount] = useState(1)


    const handleProductSize = (size: string) => {
        setSizeActive(size)
    }
    const handleProductColor = (color: string) => {
        setSelectColor(color)
    }
    const handleIncreament = () => {
        setcount((prev) => prev + 1)
    }
    const handleDecreament = () => {
        if (count <= 1) {
            setcount(1)
        } else {
            setcount((prev) => prev - 1)

        }
    }


    const addToCart = (cart: ProductRes) => {
        // let { title, description, price, productId, productImgs, _id } = cart.product
        // let data = {
        //     cartId: _id,
        //     title, description, price, productId, quantity: count, size: sizeActive, productImgs,
        //     color: selectColor, totalPrice: price * count
        // }

        // dispatch(addTocart({
        //     cartId: cart.product._id,
        //     title: cart.product.title,
        //     description: cart.product.description,
        //     price: cart.product.price,
        //     productId: cart.product.productId,
        //     quantity: count,
        //     size: sizeActive,
        //     productImgs: cart.product.productImgs,
        //     color: selectColor,
        //     totalPrice: count * cart.product.price,
        // }))
        // console.log(data);
    }

    return (
        <Box>

            <Textfield title={details?.product.title} fontSize={18} fontFamily='Poppins_600SemiBold' mt={15} />
            <Box>
                <HStack justify='between'>
                    <HStack spacing={5} style={{ alignItems: "center" }} >

                        <StarRating rating={Number(details?.product.rating.toFixed(2))}
                            onChange={(e) => e.toFixed()}
                            starSize={20}
                            starStyle={{ width: 15, marginLeft: 1 }}
                        />
                        <Textfield title={`${details?.product.numReview} review(s)`} fontSize={11} mt={2} />
                    </HStack>
                    <HStack bg={colors.grey} w={100} h={40} radius={50} spacing={9} center>
                        <Box ><IconButton onPress={handleIncreament} style={{ width: 25, height: 25 }} icon={<AntDesign name="plus" size={20} color="black" />} /></Box>

                        <Textfield title={count} fontSize={18} fontFamily='Poppins_700Bold' />
                        <Box><IconButton onPress={handleDecreament} style={{ width: 25, height: 25 }} icon={<AntDesign name="minus" size={20} color="black" />} /></Box>

                    </HStack>
                </HStack>
            </Box>
            {details?.product?.size.length !== 0 && <Box>
                <Textfield title={"Size"} fontFamily='Poppins_700Bold' fontSize={16} mt={10} />
                <HStack spacing={10} style={{ overflow: "scroll" }}>
                    {details?.product?.size?.map((x: string, index: number) => (
                        <TouchableOpacity onPress={() => handleProductSize(x)} key={index}>
                            <Box w={40} bg={sizeActive === x ? colors.text_dark : colors?.white}
                                h={40} radius={20} border={1}
                                borderColor={sizeActive === x ? colors.text_dark : colors.bg}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Textfield title={x} fontFamily='Poppins_600SemiBold' color={sizeActive === x ? colors.white : colors.text_light2} fontSize={11} />
                            </Box>
                        </TouchableOpacity>
                    ))}
                </HStack>
            </Box>}
            {details?.product?.colors.length !== 0 && <Box>
                <Textfield title={"Colors"} fontFamily='Poppins_700Bold' fontSize={16} mt={10} />
                <HStack spacing={10} style={{ overflow: "scroll" }}>
                    {details?.product?.colors?.map((x: string, index: number) => (
                        <TouchableOpacity onPress={() => handleProductColor(x)} key={index}>
                            <Box w={20} bg={x}
                                border={x === "white" || x === "#fff" ? 1 : 0}
                                borderColor={x === "white" || x === "#fff" ? colors.text_light : x}
                                h={20} radius={20}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Ionicons name="checkmark" size={10} color={
                                    selectColor === x ? "pink" : "transparent"
                                } />
                            </Box>
                        </TouchableOpacity>
                    ))}
                </HStack>
            </Box>}
            <Box>
                <Textfield title={"Description"} fontFamily='Poppins_700Bold' fontSize={16} mt={20} />
                <Textfield title={details?.product.description} fontSize={11} lineHeight={20} />
                <HStack mt={25} justify='between' style={{ alignItems: "center" }}>
                    <Box>
                        <Textfield title={"Total Price"} fontSize={9} color='#aaa' />
                        <Textfield title={`#${details?.product?.price}`} fontSize={18} fontFamily='Poppins_700Bold' />
                    </Box>
                    <Box>
                        <Button title="Add to cart" disableElevation
                            color={colors.text_dark}
                            leading={<FontAwesome5 name="shopping-bag"
                                size={16} color={colors.white} />}
                            uppercase={false}
                            // @ts-ignore
                            onPress={() => addToCart(details)}
                        />
                    </Box>
                </HStack>
            </Box>

        </Box>
    )
}

export default ProductDetailsComp