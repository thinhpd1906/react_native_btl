import React  from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import StyleGlobal from '../css/cssGlobal'
import { Text } from "react-native";
export const ButtonPrimary = (props) => {

    return(
        <TouchableOpacity style={[ StyleGlobal.buttonFullPrimary, props.customStyle]} {...props}>
            <Text style={[StyleGlobal.buttonFullPrimaryText, props.customStyleText]}>{props.text}</Text>
        </TouchableOpacity>
    )
}
export const ButtonSecondary = (props) => {

    return(
        <TouchableOpacity style={[StyleGlobal.buttonFullSecondary, props.style]} {...props}>
            <Text style={StyleGlobal.buttonFullSecondaryText}>{props.text}</Text>
        </TouchableOpacity>
    )
}