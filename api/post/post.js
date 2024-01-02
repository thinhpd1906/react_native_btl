import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllPostSuccess, getIdPostSuccess, getNewPostSuccess } from "../../store/post";
import { loginSuccess } from "../../store/auth";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const getListPosts = async(requestData, dispatch) => {

  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_list_posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    // console.log(data)
    dispatch(getAllPostSuccess(data.data.post))
    return data.data.post;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  

}

export const getNewPosts = async(requestData, dispatch) => {

  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_new_posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data)
    dispatch(getNewPostSuccess(data.data.post))
    // return data.data.post;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  

}

export const get_Post = async(requestData) => {

  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    // console.log(data.data)
    // dispatch(getIdPostSuccess(data.data))
    return data.data;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  

}

export const createAPost = async (formData) => {
  try {
    const authToken = await AsyncStorage.getItem('token');  
      
    const response = await fetch(`${baseURL}add_post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${authToken}`,
      },
      body: formData, 
    });

    if (!response.ok) {
      console.error('Error in response:', response.status, response.statusText);
      throw new Error('Error in response');
    } else {
      console.log('API: Post created successfully');
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error('API Error creating post:', error);
    throw error;
  }
};

export const editPost = async (formData) => {
  try {
    const authToken = await AsyncStorage.getItem('token');  
      
    const response = await fetch(`${baseURL}edit_post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `${authToken}`,
      },
      body: formData, 
    });

    if (!response.ok) {
      console.error('Error in response:', response.status, response.statusText);
      throw new Error('Error in response');
    } else {
      console.log('API: Post edit successfully');
      const responseData = await response.json();
      return responseData;
    }
  } catch (error) {
    console.error('API Error editting post:', error);
    throw error;
  }
};

export const deletePost = async(id) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}delete_post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(id), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.error('API Error delete post:', error);
    throw error;
  }
}

export const reportPost = async(req) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}report_post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(req), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    console.log(data)
  } catch (error) {
    console.error('API Error delete post:', error);
    throw error;
  }
}

export const getUserProfile = async(req, dispatch) => {
  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_user_info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(req), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    dispatch(loginSuccess(data.data))
    console.log(data)
  } catch (error) {
    console.error('API Error delete post:', error);
    throw error;
  }
}