// import React, { useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import { Link, Stack, router } from 'expo-router';
import * as yup from 'yup'
import { Formik } from 'formik'
import TextInputGlobal from '../../components/TextInputGlobal';

export default Login = props => {
  // const [userEmail, setUserEmail] = useState("")
  return (
    <AuthLayout title="Log In" isLogin = {true}>
      <Formik
        initialValues={{ 
          name: '',
          email: '', 
          password: '' 
        }}
        onSubmit={values => alert(values.email)}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email('email invalid')
            .required('Please, provide your email!'),
          password: yup
            .string()
            .min(6, "password at least 6 characters")
            .required('password is required')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "must include uppercase, lowercase, number and special character"),
        })}
       >
         {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
           <View style={styles.form}>
           <TextInputGlobal
             placeholder="Email"
             keyboardType="email-address"
             icon={require('../../assets/images/mail/mail.png')}
             value = {values.email}
             onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
           />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
            }
             <TextInputGlobal
               placeholder="Password"
               value={values.password}
               onChangeText={handleChange('password')}
               onBlur={() => setFieldTouched('password')}
               secureTextEntry={true}
               icon={require('../../assets/images/password/password.png')}
             />
             {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
             }
           <Link href="auth/forgotpassword" underlayColor="#f0f4f7" style={styles.navItemContainer}>
           <Text style={styles.navItemText}>Forgot password ?</Text>
           </Link>
           <Button title="Log In" onPress={handleSubmit}/>
           <Button title="Sign Up" onPress= {() => router.push("/auth/signUp/")}/>
           <Stack.Screen options={{ title: "login" }} />
         </View>
         )}
       </Formik>
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
    alignSelf: 'center',
  },
  navItemText: {
    fontSize: 18,
    color: '#696969',
    fontFamily: 'Poppins-Medium',
  }
});