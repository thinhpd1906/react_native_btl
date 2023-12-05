import React from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { InputHaft, InputHaftPassword } from '../../../components/TextInput';
import { Formik } from 'formik';
import * as yup from 'yup'
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import { Stack, router } from 'expo-router';
import { COLORS } from '../../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSignInPassword } from '../../../store/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signUp } from '../../../api/auth/auth';
export default Name = props => {
  const signUpInfor = useSelector((state) => state.auth.userInforSignIn)
  let email = signUpInfor.email
  const dispatch = useDispatch()
  return (
    <AuthLayout  title="What's your password?" showBackButton>
     <Formik
        initialValues={{ 
            password: "Thinh123",
        }}
        onSubmit={(values) => {
          dispatch(setUserSignInPassword(values.password))
    //  backend not handle special character
          let data = {
              email: email,
              password: values.password,
              uuid: "string"
            }
            // console.log("data",typeof data)
            // data = JSON.stringify(data)

            signUp(data)
              .then((res) => {
                // console.log("res", res)
                Alert.alert(
                  "Success", // Tiêu đề của cửa sổ thông báo
                  "register success", // Nội dung của cửa sổ thông báo
                  [{
                    text: 'OK',
                    onPress: () => router.push('/auth/login'), // Hàm này sẽ được gọi khi người dùng nhấn "OK"
                  }, ],
                );
                
              })
              .catch((err) => {
                  console.log("err", err)
          })
          // alert("register success:")
          }
        }
        validationSchema={yup.object().shape({
            password: yup
            .string()
            .required('password is required')
            .min(8,'password length is min 8 character')
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, 'password is at least 1 uppercase, 1 lowercase and 1 number, 1 special charecters')
        })}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
        <View >
          <Text style= {{marginBottom: 24}}>Enter your password</Text>
          <View>
            <View style= {styles.row}>
              <View>
                <InputHaftPassword 
                  placeholder="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                {touched.password && errors.password &&
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
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