import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const getListPosts = async(requestData) => {

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
    return data.data.post;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  

}

export const createAPost = async (formData) => {
  try {
    // if (!formData) {
    //   console.log("No data");
    //   return;
    // } else {
    //   console.log("form data",formData);
    // }

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