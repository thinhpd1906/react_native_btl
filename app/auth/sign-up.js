import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import AuthLayout from '../../components/AuthLayout';
import { ButtonPrimary } from '../../components/ButtonPrimary';


export default Signup = propps => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.9;
  return (
    <AuthLayout title="Join With Us" showBackButton>
      <View style={styles.form}>
        <Image 
          source={require('../../assets/images/sign_up_commumity_image.jpg')}
          style = {{width: imageWidth, height:imageWidth*2/3}}
        />
        <Text style={{paddingTop: 12, paddingBottom: 12}}>Tạo tài khoản để kết nối cùng bạn bè và gia đình, cộng đồng những người cùng sở thích với bạn</Text>
        {/* <TextInput
          placeholder="Name"
          icon={require('../../assets/images/mail/mail.png')}
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          icon={require('../../assets/images/mail/mail.png')}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          icon={require('../../assets/images/password/password.png')}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          icon={require('../../assets/images/password/password.png')}
        /> */}
        <ButtonPrimary text="start"/>
        {/* <Button title="Sign Up" /> */}
      </View>
    </AuthLayout>
  );
};
const styles = StyleSheet.create({
  form: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 0,
  },
  navItemContainer: {
    // marginTop: 35,
    // marginBottom: 35,
    alignSelf: 'center',
  },
  navItemText: {
    fontSize: 18,
    color: '#696969',
    fontFamily: 'Poppins-Medium',
  },
  image: {
    width: '80%',
    // aspectRatio: 1,
    objectFit: 'contain',
  }
});