import { useState } from "react";
import { 
    Image, StyleSheet, Text, View, TouchableOpacity, TextInput
}from "react-native";
import { useSelector } from "react-redux";
import { createAPost, getListPosts } from "../../../api/post/post";
import { router } from "expo-router";


export default CreatePost = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    // console.log(user)
    const imageUrl = user.avatar;
    const [status, setStatus] = useState('');
    const [described, setDescribed] = useState('');

    const handeleCreatePost = () => {
        const newData = {
            described,
            status,
        }
        createAPost(newData)
            .then(()=>{
                console.log('Home: Post created successfully');
                setDescribed('');
                setStatus('');
                router.push("/homePage/home")
            })
            .catch((err) => {
                console.log('Error creating student:', err);
            });
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
            </View>

            <View style = {styles.footter}>
                <View style = {styles.footterLeft}>
                    <Image
                        source={require('../../../assets/images/home/album.png')}
                        style={{
                            width: 45,
                            height: 45,
                            margin: 7,
                            marginRight: 80
                        }}
                    />                    
                </View>
                <View style = {styles.footterRight}>
                    <Image
                        source={require('../../../assets/images/home/video.png')}
                        style={{
                            width: 45,
                            height: 45,
                            margin: 7,
                            marginLeft: 80
                        }}
                    />                   
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