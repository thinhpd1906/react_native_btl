import React  from "react";
import StyleGlobal from '../css/cssGlobal'
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
export const InputHaft = (props) => {
    const [border,setBorder] =React.useState('#ccc')
    return(
        <TextInput
            style={[StyleGlobal.inputHaft,{borderColor:border}, props.customStyle]}
            onFocus={()=>setBorder('#000')}
            onBlur={()=>setBorder('#ccc')}
            {...props}
        />
    )
}
export const InputHaftPassword = (props) => {
    const [border,setBorder] =React.useState('#ccc')
    const [isSecure, setIsSecure] = React.useState(false)
    return(
        <View style={[styles.inputPasswordWrap, {borderColor:border, borderWidth: 1, borderRadius: 12,}]}>
            <TextInput
                style={[StyleGlobal.inputHaft,{borderWidth: 0, flex: 1}, props.customStyle]}
                onFocus={()=>setBorder('#000')}
                onBlur={()=>setBorder('#ccc')}
                secureTextEntry={isSecure}
                {...props}
            />
            <TouchableOpacity style = {styles.icon} onPress = {() => {
                setIsSecure(!isSecure)
            }}>
                {!isSecure? <Icon name="eye" size={24} />: <Icon name="eye-slash" size={24} />}
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    inputPasswordWrap: {
        flexDirection: 'row',
        //  justifyContent: 'flex-end',
    },
    icon: {
        alignSelf: 'center',
        marginRight: 12,
    }
})
