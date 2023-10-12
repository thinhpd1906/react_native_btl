import React, { useRef, useState } from 'react';
import AuthLayout from '../../../components/AuthLayout';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InputHaft } from '../../../components/TextInput';
import { Formik } from 'formik';
import * as yup from 'yup'
import { ButtonPrimary } from '../../../components/ButtonPrimary';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default Birthday = (props) => {
  const inputRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <AuthLayout title="What's your birthday?" showBackButton>
        <ScrollView>
          <Text style= {{marginBottom: 24}}>Chose your  date of birth. You can always make this private later.</Text>
          <View >
            <ScrollView >
            <TouchableOpacity style = {styles.buttonBirthday} onPress = {showDatepicker}>
              <Text>{date.toLocaleString().substring(0, date.toLocaleString().indexOf(','))}</Text>
            </TouchableOpacity>
            {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          display='calendar'
          maximumDate= {new Date()}
        />
      )}
            </ScrollView>
            <ButtonPrimary onPress = {() => router.push('/auth/sign-up/email')} text="Next" customStyle= {{marginTop: 24}}/>
          </View>
        </ScrollView>
    </AuthLayout>
  );
}
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flex: 1,
  },
  buttonBirthday: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    width: '98%',
    display: 'flex',
    alignSelf: 'center',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})