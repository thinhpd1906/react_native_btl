import { useEffect, useState } from "react";
import { 
    Image, StyleSheet, Text, View, TouchableOpacity, TextInput
}from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createAPost, getListPosts, getNewPosts } from "../../../api/post/post";
import { router } from "expo-router";
import * as ImagePick from 'expo-image-picker';
import { ImagePicker } from "expo-image-multiple-picker";
import { getAllPostSuccess } from "../../../store/post";

export default CreatePost = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    // console.log(user)
    const imageUrl = user.avatar;
    const dispatch = useDispatch();
    const [status, setStatus] = useState('');
    const [described, setDescribed] = useState('');
    const [image, setImage] = useState([]);
    const [video, setVideo] = useState(null);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [requestData, setRequestData] = useState({      
        in_campaign: "1",
        campaign_id: "1",
        latitude: "1.0",
        longitude: "1.0",
        index: "0",
        count: "10",
    });
  
    useEffect(() => {
        (async () => {
          const { status } = await ImagePick.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access media library is required!');
          }
        })();
    }, []);

    const closeImagePicker = (assets) => {
        setImage([...assets]);
        setShowImagePicker(false);
    };
 
    const ImagePickerContainer = () => {
        return (
            <View style={styles.imagePickerContainer}>
              <ImagePicker
                onSave={(assets) => closeImagePicker(assets)}
                onCancel={() => setShowImagePicker(false)}
                multiple
                noAlbums 
                limit={4}
                galleryColumns={3}
                albumColumns={3}
              />
            </View>
          );
    }

    const pickVideo = async () => {
        try {
            const result = await ImagePick.launchImageLibraryAsync({
              mediaTypes: ImagePick.MediaTypeOptions.Videos,
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

        if (image && image.length > 0) {
            image.forEach((img, index) => {
              formData.append(`image`, {
                uri: img.uri,
                type: 'image/jpeg',
                name: `image${index}.jpg`,
              });
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
          
          await getListPosts(requestData, dispatch); 

          setImage([]); 
          setVideo(null);
          setDescribed('');
          setStatus('');

          router.push('/homePage/home');

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
                {showImagePicker && <ImagePickerContainer />}
            </View>

            <View style = {styles.footter}>
                <View style = {styles.footterLeft}>
                    <TouchableOpacity onPress={() => setShowImagePicker(true)}>
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

    },
    imagePickerContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "white",
        marginTop: -30,
        zIndex: 9,
    },

})