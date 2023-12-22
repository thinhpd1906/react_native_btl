import AsyncStorage from "@react-native-async-storage/async-storage";
import { createImageFormData } from "../../components/createImageFormData";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const getUserFriends = async(requestData) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_user_friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data.data)
    return {
      friends: data.data.friends,
      total: data.data.total
    };

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  
}

export const getSuggestedFriends = async(requestData) => {

  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_suggested_friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data.data)
    return data.data;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  

}

export const getRequestedFriends = async(requestData) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_requested_friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data.data.requests)
    return {
      requests: data.data.requests,
      total: data.data.total
    };

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  
}

export const setRequestFriend = async(requestData) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}set_request_friend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data.data.requests)
    return {
      message: data.message,
      data: data.data
    };

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  
}
