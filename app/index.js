import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  
    // return <Redirect href="/auth/login" />;
    const router = useRouter();

  useFocusEffect(() => {
    const redirect = async () => {
      const token =  await AsyncStorage.getItem('token')
      console.log("pk token", token)
      if(token) {
        // router.replace('/profile/profile');
        router.replace('/auth/login');

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