import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { Box, Text, ThemeProvider } from '@react-native-material/core'
import { MaterialIcons } from '@expo/vector-icons';
import { StyleProp } from 'react-native';
import { colors } from './colors';


export interface Props {
    title: string
    // message container styles
    msgContainerStyle?: StyleProp<ViewStyle>
    setShowToast: React.Dispatch<React.SetStateAction<boolean>>
    types: "error" | "success" | "info" | "warning"

}
const Message = ({ title, msgContainerStyle, setShowToast, types }: Props) => {


    return (
        <Box ph={0} minH={60} style={[types === "error" ? styles.error : null, types === "info" ? styles.info : null, types === "success" ? styles.success : null, types === "warning" ? styles.warning : null, msgContainerStyle, { paddingHorizontal: 15, paddingVertical: 15, borderRadius: 10 }]}>
            <Text style={{ paddingHorizontal: 10, width: "85%", lineHeight: 22 }}>{title}</Text>
            <TouchableOpacity onPress={() => setShowToast(false)} style={{ backgroundColor: colors.grey, width: 40, height: 40, justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                <MaterialIcons name="clear" size={24} color="black" />
            </TouchableOpacity>
        </Box>
    )
}

export default Message

const styles = StyleSheet.create({
    info: {
        color: "#00529B",
        backgroundColor: "#BDE5F8",
        justifyContent: "space-between", alignItems: "center", flexDirection: "row",
    },
    success: {
        color: "#4F8A10",
        backgroundColor: "#DFF2BF",
        justifyContent: "space-between", alignItems: "center", flexDirection: "row",
    },
    warning: {
        color: "#9F6000",
        backgroundColor: "#FEEFB3",
        justifyContent: "space-between", alignItems: "center", flexDirection: "row",
    },
    error: {
        color: "#D8000C",
        backgroundColor: "#FFBABA",
        justifyContent: "space-between", alignItems: "center", flexDirection: "row",
    }

})