import React  from "react";
import StyleGlobal from '../css/cssGlobal'
import { StyleSheet, TextInput } from "react-native";
export const InputHaft = (props) => {
    const [border,setBorder] =React.useState('#ccc')
    return(
        <TextInput
            style={[StyleGlobal.inputHaft,{borderColor:border}, props.customStyle]}
            onFocus={()=>setBorder('#000')}
            onBlur={()=>setBorder('#ccc')}
            // placeholderTextColor="#696969"
            {...props}
        />
    )
}

