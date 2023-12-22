import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const setFell = async(feelData) => {

  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}feel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(feelData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data.data)
    return data.data;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  

}