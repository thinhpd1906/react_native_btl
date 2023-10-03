import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import AuthLayout from '../../components/AuthLayout';


export default Signup = propps => {
  return (
    <AuthLayout title="Sign Up" showBackButton>
      <View style={styles.form}>
        <TextInput
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
        />
        <Button title="Sign Up" />
      </View>
    </AuthLayout>
  );
};
const styles = StyleSheet.create({
  form: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
  },
  navItemContainer: {
    marginTop: 35,
    marginBottom: 35,
    alignSelf: 'center',
  },
  navItemText: {
    fontSize: 18,
    color: '#696969',
    fontFamily: 'Poppins-Medium',
  },
});