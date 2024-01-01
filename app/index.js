import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../store/auth';
import { useDispatch } from 'react-redux';

export default function App() {
    const dispatch = useDispatch()
    // return <Redirect href="/auth/login" />;
    const router = useRouter();

  useFocusEffect(() => {
    const redirect = async () => {
      const token =  await AsyncStorage.getItem('token')
      console.log("pk token", token)
      if(token) {
        // router.replace('/profile/profile');
        const jsonString = await AsyncStorage.getItem('user');
        if (jsonString) {
            const userObject = JSON.parse(jsonString);
            console.log('Đối tượng lấy từ AsyncStorage:', userObject);
            dispatch(loginSuccess(userObject));
            // setUserDataLoaded(true);  // Cập nhật state với dữ liệu từ AsyncStorage
        } else {
            // setUserDataLoaded(true); 
            console.log('Không có đối tượng được lưu trong AsyncStorage.');
        }

        router.replace('/homePage/home');

      } else {
        router.replace('/auth/login');
      }
    }
    redirect()
    // router.replace('/profile/profile');
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});