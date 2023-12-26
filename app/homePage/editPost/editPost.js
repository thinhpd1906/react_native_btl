import { useEffect, useState } from "react";
import { 
    Image, StyleSheet, Text, View, TouchableOpacity, TextInput
}from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createAPost, editPost, getListPosts, getNewPosts } from "../../../api/post/post";
import { router } from "expo-router";
import * as ImagePick from 'expo-image-picker';
import { ImagePicker } from "expo-image-multiple-picker";
import { FlatList } from "react-native-gesture-handler";
import { Video } from "expo-av";

export default EditPost = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const post = useSelector((state) => state.post.is_post.post)
    // console.log("redux",post)  
    const post_Id = post.id;

    const imageUrl = user.avatar;
    const dispatch = useDispatch();
    const list_image = post.image;
    const [status, setStatus] = useState(post.state);
    const [described, setDescribed] = useState(post.described);
    const [image_del, setImage_del] = useState('');
    const [image_sort, setImage_sort] = useState('');
    const [image, setImage] = useState([]); 
    const [video, setVideo] = useState(post.video);
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [requestData, setRequestData] = useState({      
        in_campaign: "1",
        campaign_id: "1",
        latitude: "1.0",
        longitude: "1.0",
        index: "0",
        count: "20",
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
    
     
    const handeleEditPost = async() => {
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

        if (image_del) {
            formData.append('image_del', image_del);
        }

        if (image_sort) {
            formData.append('image_sort', image_sort);
        }        

        formData.append('id', post_Id);
  
        try {
          const responseData = await editPost(formData);
          console.log('Upload successful:', responseData);

          router.push('/homePage/home'); 
          
          await getListPosts(requestData, dispatch); 

          setImage([]); 
          setVideo(null);
          setDescribed('');
          setStatus('');
          setImage_del('');
          setImage_sort('');

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
                    onPress={handeleEditPost} 
                >
                    <Text style={styles.textButton}>Save</Text>
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
                <TextInput 
                    style = {styles.textInput}
                    multiline={true}
                    numberOfLines={4} 
                    placeholder="What photos do you want to delete?"
                    value={image_del}
                    onChangeText={(inputText) => setImage_del(inputText)}
                /> 
                <TextInput 
                    style = {styles.textInput}
                    multiline={true}
                    numberOfLines={4} 
                    placeholder="How do you want to arrange the photos?"
                    value={image_sort}
                    onChangeText={(inputText) => setImage_sort(inputText)}
                />

                {list_image.length > 0 &&
                    <View style = {{flexDirection:"row"}}>
                        {list_image.map((item) => {
                            return(
                                <View key={item.id} style = {{marginLeft: 5, marginRight: 5}}>
                                    <Image
                                        source={{uri: item.uri || item.url}}
                                        style = {{width: 80, height:150, borderRadius: 15}}
                                    />                                
                                </View>
                            )
                        })}
                    </View>
                }



                {image &&
                    <View style = {{flexDirection:"row", marginTop: 20}}>
                        {image.map((item) => {
                            return(
                                <View key={item.id} style = {{marginLeft: 3, marginRight: 3}}>
                                    <Image
                                        source={{uri: item.uri || item.url}}
                                        style = {{width: 85, height:200, borderRadius: 15}}
                                    />                                
                                </View>
                            )
                        })}
                    </View>
                }
                {video && 
                    <Video
                     source={{ uri: video.uri || video.url }}
                     rate={1.0}
                     volume={0.0}
                     isMuted={false}
                     resizeMode="cover"
                     shouldPlay
                     isLooping
                     style={{ width: "100%", height: 200, marginBottom: 200 }}
                    /> 
                }              
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
}

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
        backgroundColor: "orange",
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
        marginLeft: 5
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