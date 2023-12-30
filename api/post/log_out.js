import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const logOut = async() => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      const response = await fetch(`${baseURL}logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`,
        },
        body: JSON.stringify(), // Chuyển đối tượng JSON thành chuỗi
      });
  
      const data = await response.json();
      console.log(data)
      return data.data;
  
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }  
  }