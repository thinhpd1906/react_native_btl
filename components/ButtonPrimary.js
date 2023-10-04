import React  from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import StyleGlobal from '../css/cssGlobal'
import { Text } from "react-native";
export const ButtonPrimary = (props) => {

    return(
        <TouchableOpacity style={StyleGlobal.buttonFullPrimary} {...props}>
            <Text style={StyleGlobal.buttonFullPrimaryText}>{props.text}</Text>
        </TouchableOpacity>
    )
}