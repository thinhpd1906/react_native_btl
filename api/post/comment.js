import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCommentSuccess } from "../../store/post";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const getMarkComment = async(requestData, dispatch) => {

  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_mark_comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    // console.log(data.data)
    dispatch(getCommentSuccess(data.data));
    return data.data;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  

}

export const setMarkComment = async (newComment, dispatch) => {
  try {
    // console.log(newComment);

    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}set_mark_comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(newComment),
    });

    // console.log('res:', response);  

    if (!response.ok) {
      console.error('Error in response:', response.status, response.statusText);
      throw new Error('Error in response');
    }

    // console.log('API: Comment created successfully');

    const data = await response.json();
    // console.log('####', data.data);
    
    // return data.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to let the calling code handle it
  }
};
