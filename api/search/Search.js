import AsyncStorage from "@react-native-async-storage/async-storage";
const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const search = async (requestData) => {
    try {
        const authToken = await AsyncStorage.getItem('token');
        const response = await fetch(`${baseURL}search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`,
          },
          body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
        });
    
        const data = await response.json();
        console.log(data.data);
        return data.data;
    
      } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
      }  
    
}

export const search_user = async (requestData) => {
    try {
        const authToken = await AsyncStorage.getItem('token');
        const response = await fetch(`${baseURL}search_user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`,
          },
          body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
        });
    
        const data = await response.json();
        console.log(data)
        return data.data;
    
      } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
      }  
    
}

export const get_save_search = async (requestData) => {
    try {
        const authToken = await AsyncStorage.getItem('token');
        const response = await fetch(`${baseURL}get_saved_search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`,
          },
          body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
        });
    
        const data = await response.json();
        console.log(data)
        return data.data;
    
      } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
      }  
    
}

export const del_save_search = async (requestData) => {
    try {
        const authToken = await AsyncStorage.getItem('token');
        const response = await fetch(`${baseURL}del_saved_search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`,
          },
          body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
        });
    
        const data = await response.json();
        // console.log(data)
        return data.data;
    
      } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
      }  
    
}