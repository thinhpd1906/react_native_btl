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

export const createAPost = async (newData) => {
  try {
    if (!newData) {
      console.log("No data");
      return;
    } else {
      console.log(newData);
    }

    const authToken = await AsyncStorage.getItem('token');
    
    // Tạo đối tượng FormData để chứa dữ liệu
    const formData = new FormData();

    // Thêm dữ liệu vào FormData, newData là một đối tượng có chứa các trường dữ liệu, bao gồm cả file nếu có
    for (const key in newData) {
      if (newData[key] !== undefined) {
        formData.append(key, newData[key]);
      }
    }

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
    }
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};