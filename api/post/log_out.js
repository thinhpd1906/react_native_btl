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

export const Deactivate = async() => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      const response = await fetch(`${baseURL}deactive_user`, {
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

export const buyCoins = async(req) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}buy_coins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(req), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data)
    return data.data;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  
}

export const changePass = async(req) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}change_password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(req), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data)
    return data.data;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  
}