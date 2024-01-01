import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { router } from 'expo-router';
import AuthLayout from '../../../components/AuthLayout';
import { ButtonPrimary, ButtonSecondary } from '../../../components/ButtonPrimary';


export default SignUp = (props) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.9;
  return (
    <AuthLayout title="Tham gia cùng chúng tôi" showBackButton>
      <View style={styles.form}>
        <Image 
          source={require('../../../assets/images/sign_up_commumity_image.jpg')}
          style = {{width: imageWidth, height:imageWidth*2/3}}
        />
        <Text style={{paddingTop: 12, paddingBottom: 12}}>Tạo tài khoản để kết nối cùng bạn bè và gia đình, cộng đồng những người cùng sở thích với bạn</Text>
        <ButtonPrimary text="Bắt đầu" customStyle={{marginBottom: 12}} onPress = {() =>  router.push('/auth/sign-up/name')}/>
        <ButtonSecondary text="Tôi đã có tài khoản" onPress = {() =>  router.push('/auth/login')}/>
      </View>
    </AuthLayout>
  );
};
const styles = StyleSheet.create({
  form: {
    // paddingLeft: 20,
    // paddingRight: 20,
    paddingTop: 0,
  },
  navItemContainer: {
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
  },
  marginBottom8: {
    marginBottom: 8,
  }
});