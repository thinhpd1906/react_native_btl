import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const getListBlocks = async requestData => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_list_blocks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.data);
      return data.data;
    } else return data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const setBlock = async requestData => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}set_block`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    if (response.ok) {
      return {
        message: data.message,
        data: data.data,
      };
    } else return data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const unBlock = async requestData => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}unblock`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
