import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

const service = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_API_URL,
    withCredentials: true,
    timeout: 1000 * 3600, // request timeout
});
service.interceptors.request.use(
  async (config) => {
      if (config.headers["Content-Type"] != "multipart/form-data") {
        config.headers["Content-Type"] = "application/json";
      }
      // console.log("config request", typeof config.data, config.headers["Content-Type"])
      // if (config.data && ((typeof config.data) === "object") && config.headers["Content-Type"] == "application/json; charset=utf-8") {
      //   console.log("lot,", config.data)
      //   config.data = JSON.stringify(config.data);
      //   console.log(config.data)
      //   // config.headers["Content-Type"] = "application/json; charset=utf-8";
      // }
      const token = await AsyncStorage.getItem('token');
      if(token != null) {
        config.headers["Authorization"] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  service.interceptors.response.use(
    (response) => {
      const data = response.data.data? response.data.data:  response.data
      return {data: data}
    },
    (error) => {
      if(error.response) {
        const message = error.response.data.message
        const errorCustom = {status: error.response.status, message: error.response.data.message}
          switch(error.response.status) {
            case 400:
              Alert.alert(
                "Error", // Tiêu đề của thông báo
                message, // Nội dung thông báo
                [{
                  text: "OK",
                  onPress: () => console.log("OK Pressed")
                }], {
                  cancelable: false
                }
              );
              return Promise.reject(errorCustom);
              break;
            default:
              return Promise.reject(errorCustom);
              break;
          }
        }
        else {
          return Promise.reject(error);
        }
    }
    )
    export default service;