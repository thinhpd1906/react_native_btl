import React from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { StyleSheet, Text, View } from 'react-native';
import { InputHaft } from '../../../components/TextInput';
import { Formik } from 'formik';
import * as yup from 'yup'
import { ButtonPrimary } from '../../../components/ButtonPrimary';

export default Signup = propps => {

  return (
    <AuthLayout title="What's your birthday?" showBackButton>
        <View>
          <Text style= {{marginBottom: 24}}>Chose your  date of birth. You can always make this private later.</Text>
          <View >
            <View>
          </View>
            <ButtonPrimary text="Next" customStyle= {{marginTop: 24}}/>
          </View>
        </View>
    </AuthLayout>
  );
};
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 8,
  },
  col: {
    flex: 1,
  }

});