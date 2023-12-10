import React, { useState } from "react";
import {
    FlatList, Image, Text, StyleSheet, View, Modal, TouchableOpacity, BackHandler, TextInput 
} from "react-native";
import { Video } from "expo-av";
export default CommentPost = ({ visible, onClose, comments }) => {

    const [textComment, setTextCtextComment] = useState('');

    React.useEffect(() => {
        const backAction = () => {
          onClose();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
    }, [onClose]);
    return (
        <Modal 
            animationType="slide" 
            transparent={true}
            isVisible={visible} 
            onBackdropPress={onClose}
            onRequestClose={onClose}
        >
            <View style={styles.overlay} />
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={onClose}>
                    <View style = {styles.closeModalContainer}>
                        <Image 
                            source={require('../../../assets/images/home/dash.png')}
                            style={styles.closeModal}
                        />                        
                    </View>

                </TouchableOpacity>                
                <FlatList
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Image
                            source={{ uri: item.poster.avatar }}
                            style={styles.avatar}
                        />
                        <View style = {styles.borderAuthor}>
                            <Text style={styles.posterName}>{item.poster.name}</Text>
                            <Text>{item.mark_content}</Text>
                            {item.image ? (
                                <Image
                                    source={{ uri: item.image}}
                                    style={styles.image}
                                />
                            ): item.video ? (
                                <Video
                                source={{ uri: item.video }}
                                rate={1.0}
                                volume={0.0}
                                isMuted={true}
                                resizeMode="cover"
                                shouldPlay
                                isLooping
                                style={{ width:150, height: 100 }}
                                />
                            ):(
                                ""
                            )}

                        </View>
                    </View>
                    )}
                />
                <View style = {styles.inputContainer}>
                    <TextInput
                        style = {styles.textInput}
                        multiline={true}
                        numberOfLines={4} // Số dòng mặc định hiển thị (tùy chọn)
                        placeholder="Write a public comment..."
                        placeholderStyle={styles.placeholder}
                        value={textComment}
                        onChangeText={(inputText) => setTextCtextComment(inputText)}
                    />
                    <Image
                        source={require("../../../assets/images/home/camera.png")}
                        style = {styles.cameraComment}
                    />                    
                </View>
            </View>
        </Modal>
      );
}

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: "#fff",
      borderRadius: 10,
    //   padding: 15,
      paddingTop: 2,
      height: "93%",
      marginTop: "15%"
    },
    commentContainer: {
      flexDirection: "row",
      marginLeft: 15,
    //   marginRight: 50,
      marginBottom: 10,
      width: "83%"
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    borderAuthor: {
        backgroundColor: "#ddd",
        borderRadius: 10,
        paddingTop: 1,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        // marginRight: 100
    },
    posterName: {
      fontWeight: "bold",
      fontSize: 16,
    //   marginBottom: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    closeModalContainer:{
        justifyContent: "center", 
        alignItems: "center",        
    },
    closeModal: {
        height: 10,
        marginBottom: 10,

    },
    inputContainer:{
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: "center",
        borderTopWidth: 0.6, 
        borderTopColor: "#8D949E", 
        paddingTop: 5,
        paddingBottom:10,
    },
    textInput: {
        width: "80%",
        height: 40,
        backgroundColor: "#ddd",
        borderRadius: 15,
        padding: 10,
    },
    cameraComment: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    image: {
        width: 150,
        height: 150,
    }
});