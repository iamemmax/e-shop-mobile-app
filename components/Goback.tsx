import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, IconButton, Stack } from '@react-native-material/core';
import { colors } from './util/colors';
import LeftArrow from '../assets/icon/LeftArrow';
import Textfield from './Text/Textfield';

interface Props {
    handlePress: () => void
}
const Goback = () => {
    const navigation = useNavigation()
    return (

        <Box mt={40} ph={16} >

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrow />
            </TouchableOpacity>
        </Box>
    )
}

export default Goback
