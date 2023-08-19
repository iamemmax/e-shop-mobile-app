import { Box, Text, TextProps, TypographyVariant, } from '@react-native-material/core'
import React from 'react'
import { ColorValue, FlexAlignType, StyleProp, TextStyle } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';



interface Props {
    variant?: TypographyVariant | undefined;
    style?: StyleProp<TextStyle> | undefined
    fontSize?: number | undefined// font-sizee
    fontFamily?: "Poppins_500Medium_Italic" | "Poppins_400Regular" | "Poppins_100Thin" | "Poppins_600SemiBold" | "Poppins_700Bold" | "Poppins_800ExtraBold" | undefined;
    fontWeight?: "bold" | "normal" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined,
    fontStyle?: "normal" | "italic" | undefined;
    backgroundColor?: ColorValue | undefined
    color?: ColorValue | undefined;
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | undefined;
    justifyContent?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined
    align?: FlexAlignType | undefined;
    lineHeight?: number | undefined;
    title: any;
    p?: string | number | undefined;
    ph?: string | number | undefined
    pv?: string | number | undefined
    pt?: string | number | undefined
    pb?: string | number | undefined
    pr?: string | number | undefined
    pl?: string | number | undefined
    m?: string | number | undefined;
    mh?: string | number | undefined
    mv?: string | number | undefined
    mt?: string | number | undefined
    mb?: string | number | undefined
    mr?: string | number | undefined
    ml?: string | number | undefined;
    textAlign?: "center" | "justify" | "right" | "left" | "auto" | undefined;
    textTransform?: "none" | "capitalize" | "uppercase" | "lowercase" | undefined;
    textAlignVertical?: "center" | "auto" | "top" | "bottom" | undefined;
    textDecorationColor?: ColorValue | undefined;
    textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined;
    textDecorationStyle?: "solid" | "double" | "dotted" | "dashed" | undefined;
    textShadowColor?: ColorValue | undefined;
    textShadowOffset?: {
        width: number;
        height: number;
    } | undefined;
    textShadowRadius?: number | undefined
}
const Textfield = ({
    variant = "h4",
    style,
    fontSize = 14,
    fontFamily = "Poppins_400Regular",
    fontWeight = "400",
    fontStyle = "normal",
    color,
    align,
    lineHeight,
    backgroundColor,
    flexDirection,
    justifyContent,
    title,
    textAlign,
    textTransform,
    textAlignVertical,
    textDecorationColor,
    textDecorationLine,
    textShadowColor,
    textDecorationStyle,
    textShadowRadius,
    textShadowOffset,
    p, pb, ph, pl, pr, pt, pv,
    m, mb, mh, ml, mr, mt, mv,
    ...rest


}: Props & TextProps) => {
    return (
        <Text variant={variant} {...rest}

            style={[{
                fontSize: RFValue(Number(fontSize)),
                fontFamily: fontFamily,
                fontWeight: fontWeight,
                fontStyle: fontStyle,
                color: color,
                lineHeight: lineHeight,
                backgroundColor: backgroundColor,
                flexDirection: flexDirection,
                justifyContent: justifyContent,
                alignItems: align,
                padding: p,
                paddingHorizontal: ph,
                paddingVertical: pv,
                paddingLeft: pl,
                paddingRight: pr,
                paddingTop: pt,
                paddingBottom: pb,
                margin: m,
                marginHorizontal: mh,
                marginVertical: mv,
                marginLeft: ml,
                marginRight: mr,
                marginTop: mt,
                marginBottom: mb,
                textAlign: textAlign,
                textTransform: textTransform,
                textAlignVertical: textAlignVertical,
                textDecorationColor: textDecorationColor,
                textDecorationLine: textDecorationLine,
                textDecorationStyle: textDecorationStyle,
                textShadowColor: textShadowColor,
                textShadowOffset: textShadowOffset,
                textShadowRadius: textShadowRadius,





            }, style]}>{title}</Text>
    )
}

export default Textfield