import { Box } from '@react-native-material/core'
import React from 'react'
import Textfield from './Textfield'
import { StyleProp } from 'react-native';
import { TextStyle } from '@expo/html-elements/build/primitives/Text';
import { colors } from '../util/colors';


interface Props {
    title?: string;
    subtitle?: string
    titleStyle?: StyleProp<TextStyle>;
    subtitleStyle?: StyleProp<TextStyle>;
}
const Headings = ({ title, subtitle, subtitleStyle, titleStyle }: Props) => {
    return (
        <Box>
            {title && <Textfield title={title} fontFamily='Poppins_600SemiBold' fontSize={35} lineHeight={40} />}
            {subtitle && <Textfield title={subtitle} fontFamily='Poppins_400Regular' fontSize={16} lineHeight={28} mb={5} color={colors.text_light} pt={6} />}
        </Box>
    )
}

export default Headings
