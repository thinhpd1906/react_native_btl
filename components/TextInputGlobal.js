import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

export  default Login =(props) => {
  const [border,setBorder] =React.useState('#ccc')
  const [isSecure, setIsSecure] = React.useState(false)
  return (
        <View style={[styles.inputWrapper]}>
            <TextInput
            {...props}
            placeholderTextColor="#696969"
            style={[styles.textInput,{borderColor:border}]}
            onFocus={()=>setBorder('#0b1021')}
            onBlur={()=>setBorder('#ccc')}
            secureTextEntry={isSecure}
            />
            {/* {!props.isPasswordField && props.icon &&
                <Image
                source={props.icon}
                style={styles.icon}
                />
            } */}
            {props.icon &&
              <TouchableOpacity onPress = {() => {
                props.isPasswordField && setIsSecure(!isSecure)
              }}>
                <Image
                source={props.icon}
                style={styles.icon}
                />
              </TouchableOpacity>
            }
        </View>
    );
  }
const styles = StyleSheet.create({

  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // paddingHorizontal: 8,
  },
  textInput: {
    flex: 1,
    color: '#696969',
    paddingLeft: 18,
    paddingVertical: 14,
    // paddingLeft: ,
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    // justifyContent: "center",
    // alignItems: "center"
  },
  icon: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 14,
    bottom:20
  }
});