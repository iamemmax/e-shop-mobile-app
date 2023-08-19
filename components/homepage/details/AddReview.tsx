import { Box, Button, Dialog, HStack, Surface, TextInput, VStack } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { colors } from '../../util/colors'
import Textfield from '../../Text/Textfield'
import StarRating from 'react-native-star-rating-widget'
import { Dimensions, View, StyleSheet } from 'react-native'
import { BottomSheet } from 'react-native-btr';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { addNewReview, addProductPreview, fetchSingleProduct, reset } from '../../../redux/slice/product'
import { ProductRes, ProductReviewRes, addProductReview } from '../../../types/homestack/product'
import Message from '../../util/Message'


const AddReview = ({ slug }: { slug: string }) => {
    const { details, isLoading, isSuccess, message, isError } = useAppSelector((state) => state.product)
    const { user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        setTimeout(() => {
            dispatch(reset());
        }, 3000);
    }, [message, isError]);


    const dispatch = useAppDispatch()
    const [rating, setRating] = useState(0)
    const { width, height } = Dimensions.get("window")
    const [comment, setComment] = useState("")
    const [showToast, setShowToast] = useState(false)
    const [visible, setVisible] = useState(false);
    const [updateReview, setUpdateReview] = useState(false)

    const toggleBottomNavigationView = () => {
        setVisible(!visible);
    };
    let data: addProductReview = {
        productId: details?.product?.productId,
        comment,
        review: rating,
        userId: user?._id
    }
    const handleAddReview = async () => {
        dispatch(addProductPreview(data))
        setUpdateReview(true)
        setVisible(false)
    }
    let success = "product review successfully"


    return (
        <Box>
            <Box ph={16}>
                {isSuccess && message === success && <Message types={"success"} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: 10 }} />}
                {isError && message !== "" && <Message types={"error"} title={String(message)} setShowToast={setShowToast} msgContainerStyle={{ marginTop: 10 }} />}

            </Box>
            <Button variant='outlined' title="Add a review" color={colors.text_dark} onPress={toggleBottomNavigationView} />
            <Box>



                <BottomSheet
                    visible={visible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}
                >
                    <View style={styles.bottomNavigationView}>
                        <VStack >
                            <Box ph={10} >

                                <Textfield title={"Add Review"} fontSize={25} fontFamily='Poppins_700Bold' textAlign='center' backgroundColor={colors?.grey} pv={10} style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} mt={20} />

                            </Box>
                            <Box pv={20}>
                                <StarRating
                                    rating={rating}
                                    onChange={(e) => setRating(e)}
                                />
                            </Box>
                            <Box w={width} ph={16}>
                                <TextInput placeholder='comment' variant='outlined' onChangeText={(e) => setComment(e)} color={colors.text_dark} multiline />
                            </Box>
                            <HStack spacing={20} justify='end' ph={16} mt={10} mb={20}>
                                <Button variant='outlined' title="cancel" color={colors.text_dark} onPress={() => setVisible(false)} />
                                <Button loading={updateReview} variant='contained' title="Add" color={colors.text_dark} onPress={handleAddReview} loadingIndicatorPosition="overlay" />

                            </HStack>
                        </VStack>
                    </View>
                </BottomSheet>
            </Box>


        </Box >
    )
}

export default AddReview
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0F7FA',
        borderRadius: 40
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        paddingHorizontal: 16

    },
});