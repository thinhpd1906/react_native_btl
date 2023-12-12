import React, { useState } from "react";
import {
    FlatList, Image, Text, StyleSheet, View, Modal, TouchableOpacity, BackHandler, TextInput 
} from "react-native";
import { Video } from "expo-av";
import moment from "moment";
export default CommentPost = ({ visible, onClose, comments }) => {

    const [textComment, setTextCtextComment] = useState('');
    // const [showReply, setshowReply] = useState(false);

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

    const getFormattedTimeAgo = (createdAt) => {
        const now = moment();
        const postTime = moment(createdAt);
        const duration = moment.duration(now.diff(postTime));
      
        const years = duration.years();
        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
      
        if (years > 0) {
          return `${years} y`;
        } else if (months > 0) {
          return `${months} m`;
        } else if (days > 0) {
          return `${days} d`;
        } else if (hours > 0) {
          return `${hours} h`;
        } else {
          return `${minutes} p`;
        }
    };

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
                        <View>
                            <View style = {styles.borderAuthor}>
                                <Text style={styles.posterName}>{item.poster.name}</Text>
                                <Text style = {{fontSize: 16}}>{item.mark_content}</Text>
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

                            <View style = {{flexDirection: "row", marginBottom: 10}}>
                                <Text style = {styles.createAt}>
                                    {getFormattedTimeAgo(item.created)}
                                </Text>
                                <Text style = {styles.like}>Like</Text>
                                <TouchableOpacity >
                                    <Text style = {styles.reply}>Reply</Text> 
                                </TouchableOpacity>
                            </View>  

                            <FlatList
                                data = {item.comments}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style = {styles.replyMark}>
                                        <Image
                                            source={{ uri: item.poster.avatar }}
                                            style={styles.avatarReply}
                                        />
                                        <View>
                                            <View style = {styles.borderAuthor}>
                                                <Text style={styles.posterName}>{item.poster.name}</Text>
                                                <Text>{item.content}</Text>  
                                            </View> 
                                            <View style = {{flexDirection: "row", marginBottom: 0}}>
                                                <Text style = {styles.createAt}>
                                                    {getFormattedTimeAgo(item.created)}
                                                </Text>
                                                <Text style = {styles.likeReply}>Like</Text>
                                            </View>                                                                                        
                                        </View>
                                    </View>
                                )}
                            />
                          
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
      marginBottom: 15,
      width: "80%"
    },
    replyMark:{
        flexDirection: "row",
        marginBottom: 10,
        width: "83%",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    avatarReply: {
        width: 35,
        height: 35,
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
    },
    posterName: {
      fontWeight: "bold",
      fontSize: 16,
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
    },
    createAt:{
        fontSize: 13, 
        color: "#65676B", 
        fontWeight: "400",
        marginLeft: 5,
        marginRight:5,
    },
    like : {
        fontWeight: "500",
        color: "#65676B", 
        marginLeft: 10,
        marginRight: 10,
    },
    likeReply : {
        fontWeight: "500",
        color: "#65676B", 
        marginLeft: 25,
    },
    reply:{
        fontWeight: "500",
        color: "#65676B", 
        paddingLeft: 10,
        paddingRight: 10,  
    }
});