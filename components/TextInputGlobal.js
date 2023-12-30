import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';

export  default Login =(props) => {
  const [border,setBorder] =React.useState('#0866ff')
  const [isSecure, setIsSecure] = React.useState(false)
  return (
        <View style={[styles.inputWrapper]}>
            <TextInput
            {...props}
            placeholderTextColor="#696969"
            style={[styles.textInput,{borderColor:border}]}
            onFocus={()=>setBorder('#8CC33F')}
            onBlur={()=>setBorder('#696969')}
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
  },
  textInput: {
    flex: 1,
    color: '#696969',
    padding: 20,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    paddingTop:45
  },
  icon: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    right: 0,
    bottom:20
  }
});