import React from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { StyleSheet, Text, View } from 'react-native';
import { InputHaft } from '../../../components/TextInput';
import { Formik } from 'formik';
import * as yup from 'yup'
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Stack, router } from 'expo-router';
import { COLORS } from '../../../constants/theme';
import { useDispatch } from 'react-redux';
import { setUserSignInEmail } from '../../../store/auth';

export default Name = props => {
  const dispatch = useDispatch()
  return (
    <AuthLayout  title="What's your email?" showBackButton>
     <Formik
        initialValues={{ 
          email: 'phanthinh123@gmail.com',
        }}
        onSubmit={(values) => {
          dispatch(setUserSignInEmail(values.email))
          router.push('/auth/sign-up/password')
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .required('first name is required')
            .email('email is invalid'),
        })}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <View >
          <Text style= {{marginBottom: 24}}>Enter your email to contact you</Text>
          <View >
            <View style= {styles.row}>
              <View>
                <InputHaft 
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                />
                {touched.email && errors.email &&
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
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
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 8,
  },
  col: {
    flex: 1,
  }

});