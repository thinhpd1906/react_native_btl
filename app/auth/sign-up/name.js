import React from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { StyleSheet, Text, View } from 'react-native';
import { InputHaft } from '../../../components/TextInput';
import { Formik } from 'formik';
import * as yup from 'yup'
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Stack, router } from 'expo-router';
import { COLORS } from '../../../constants/theme';

export default Name = props => {

  return (
    <AuthLayout  title="What's your name?" showBackButton>
     <Formik
        initialValues={{ 
          firstName: '',
          lastName: '', 
        }}
        onSubmit={() => router.push('/auth/sign-up/birthday')}
        validationSchema={yup.object().shape({
          firstName: yup
            .string()
            .required('first name is required')
            .min(2, "first name at leatst 2 letters"),
          lastName: yup
            .string()
            .required('last name is required')
            .min(2, "last name at leatst 2 letters"),
        })}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <View >
          <Text style= {{marginBottom: 24}}>Enter 1 the name you use in real life</Text>
          <View >
            <View style= {styles.row}>
              <View style = {[styles.col, {marginRight: 8}]}>
                <InputHaft 
                  placeholder="First name"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                />
                {touched.firstName && errors.firstName &&
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.firstName}</Text>
                }
            </View>
            <View style = {[styles.col,{marginLeft: 8}]}>
              <InputHaft 
                placeholder="Last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={() => setFieldTouched('lastName')}
              />
              {touched.lastName && errors.lastName &&
                <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.lastName}</Text>
              }
            </View>
          </View>
            <ButtonPrimary text="Next" customStyle= {{marginTop: 24}} onPress={handleSubmit}/>
          </View>
          {/* <Stack options={{ title: "name" }} /> */}
        </View>
        )}
       </Formik>
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