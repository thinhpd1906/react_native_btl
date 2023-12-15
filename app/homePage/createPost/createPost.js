import { useEffect, useState } from "react";
import { 
    Image, StyleSheet, Text, View, TouchableOpacity, TextInput
}from "react-native";
import { useSelector } from "react-redux";
import { createAPost, getListPosts } from "../../../api/post/post";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default CreatePost = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    // console.log(user)
    const imageUrl = user.avatar;
    const [status, setStatus] = useState('');
    const [described, setDescribed] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    // const [selectedImage, setSelectedImage] = useState(null);

    // const handleChoosePhoto = async () => {
    //   try {
    //     const result = await ImagePicker.launchImageLibraryAsync({
    //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //       allowsEditing: true,
    //       aspect: null,
    //       quality: 1,
    //     });
  
    //     if (!result.canceled) {
    //       setSelectedImage(result);
    //     //   console.log("Resul", result)
    //     }
    //   } catch (error) {
    //     console.error('Error choosing photo:', error);
    //   }
    // };
  
    // const handleUpload = async () => {
    //   if (selectedImage) {
    //     const formData = new FormData();
    //     formData.append('image', {
    //       uri: selectedImage.uri,
    //       type: 'image/jpeg',
    //       name: 'photo.jpg',
    //     });
    //     console.log("form data", formData)
    //     try {
    //         const authToken = await AsyncStorage.getItem('token');
    //       const response = await fetch('https://it4788.catan.io.vn/add_post', {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         'Authorization': `${authToken}`,

    //         },
    //       });
  
    //       const responseData = await response.json();
  
    //       console.log('Upload successful:', responseData);
    //     } catch (error) {
    //       console.error('Error uploading image:', error);
    //     }
    //   }
    // };

    useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access media library is required!');
          }
        })();
    }, []);

    const handleImagePicker = async () => { 
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: null,
              quality: 1,
            });
      
            if (!result.canceled) {
                console.log("IMGData" ,result.assets[0])
                setImage(result.assets[0]);
            }
          } catch (error) {
            console.error('Error choosing image:', error);
          }
    };
    const pickVideo = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Videos,
              allowsEditing: true,
              aspect: null,
              quality: 1,
            });
      
            if (!result.canceled) {
                console.log("videoData" ,result.assets[0])
                setVideo(result.assets[0]);  
            }
          } catch (error) {
            console.error('Error choosing video:', error);
          }
    };
    
     
    const handeleCreatePost = async() => {
        const formData = new FormData();

        if (image) {
          formData.append('image', {
            uri: image.uri,
            type: 'image/jpeg',
            name: 'image.jpg',
          });
        }
  
        if (video) {
          formData.append('video', {
            uri: video.uri,
            type: 'video/mp4',
            name: 'video.mp4',
          });
        }
   
        if (described) {
            formData.append('described', described);
        }
        
        if (status) {
            formData.append('status', status);
        }
  
        try {
          const responseData = await createAPost(formData);
          console.log('Upload successful:', responseData); 
        } catch (error) {
          console.error('Error uploading media:', error);  
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                 <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />
                <Text style = {styles.text}>
                    {user.username}    
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={handeleCreatePost} 
                >
                    <Text style={styles.textButton}>POST</Text>
                </TouchableOpacity>                               
            </View>

            <View style = {styles.slider}>
                <TextInput 
                    style = {styles.textInput}
                    multiline={true}
                    numberOfLines={4} 
                    placeholder="How are you feeling?"
                    placeholderStyle={styles.placeholder}
                    value={status}
                    onChangeText={(inputText) => setStatus(inputText)}
                />
                <TextInput 
                    style = {styles.textInputs}
                    multiline={true}
                    numberOfLines={4} 
                    placeholder="What's on your mind?"
                    placeholderStyle={styles.placeholder}
                    value={described}
                    onChangeText={(inputText) => setDescribed(inputText)}
                />
                {/* {image && <Image source={{uri: image.uri}}  style = {{width: 50, height:50}} />}                */}
            </View>

            <View style = {styles.footter}>
                <View style = {styles.footterLeft}>
                    <TouchableOpacity onPress={handleImagePicker}>
                        <Image
                            source={require('../../../assets/images/home/album.png')}
                            style={{
                                width: 45,
                                height: 45,
                                margin: 7,
                                marginRight: 80
                            }}
                        />                         
                    </TouchableOpacity>
                </View>
                <View style = {styles.footterRight}>
                    <TouchableOpacity onPress={pickVideo}>
                        <Image
                            source={require('../../../assets/images/home/video.png')}
                            style={{
                                width: 45,
                                height: 45,
                                margin: 7,
                                marginLeft: 80
                            }}
                        />                         
                    </TouchableOpacity>
                </View>
            </View>
        </View>        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 12,
        flexDirection: 'row', 
        alignItems: 'center',
 
    },
    text: {
        color: "#000",
        fontWeight: "600",
        fontSize: 20,
        marginLeft: 5
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10,
    },
    button: {
        width: 60,
        backgroundColor: "#1B74E4",
        padding: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 7,
        marginLeft: "auto",
        marginRight: 10,
    },
    textButton: {
        color: "#fff",
        fontWeight: "600",
        
    },
    slider: {
        flex: 1,
        alignItems: 'center',
    },    
    textInput: {
        width: "95%",
        height: 35,
    },
    placeholder: {
        fontSize: 30, 
        color: 'gray', 
    },
    textInputs: {
        width: "95%",
        // borderWidth: 1
    },
    footter: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ddd",
    },
    footterLeft: {
        borderRightWidth: 1,
        borderRightColor: "#fff",
    },
    footterRight: {

    }

})