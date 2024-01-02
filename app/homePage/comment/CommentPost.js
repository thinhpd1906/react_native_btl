import React, { useEffect, useState } from "react";
import {
    FlatList, Image, Text, StyleSheet, View, Modal, TouchableOpacity, BackHandler, TextInput 
} from "react-native";
import moment from "moment";
import { getMarkComment, setMarkComment } from "../../../api/post/comment";
import { useDispatch } from "react-redux";
export default CommentPost = ({ visible, onClose, post_Id }) => {
    const dispatch = useDispatch();

    const [requestData, setRequestData] = useState({
        id: post_Id,
        index: "0",
        count: "15",
    });
    const [textComment, setTextCtextComment] = useState('');
    const [showMarkId, setShowMarkId] = useState('');
    const [commentData, setCommentData] = useState([]);
    const [showReply, setShowReply] = useState(false);
    const [showUserName, setShowName] = useState("");

    const handleShowReply = (id, username)=>{
        setShowReply(true);
        setShowMarkId(id);
        setShowName(username);
    }

    const handleCloseReply = () =>{
        setShowReply(false);
        setShowName('');
        setShowMarkId('');
    }

    const handleSetMarkComment = async () => {
        try {
          const newComment = {
            id: post_Id,
            content: textComment,
            index: "0",
            count: "10",
            mark_id: showMarkId,  
            type: "1"
          };
      
          await setMarkComment(newComment);
          setTextCtextComment('');
          setShowMarkId('');
          setShowReply(false);

          const result = await getMarkComment(requestData, dispatch);
          setCommentData([...result]); 

          console.log("Comment: successfully");
        } catch (err) {
          console.error('Error setting mark for comment:', err); 
        }
    };

    const handleGetMark = async() => {
        try {
            const result = await getMarkComment(requestData, dispatch);
            setCommentData([...commentData, ...result]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetMark();
    }, [requestData]);

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
                    data={commentData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                        <Image
                            source={{ uri: item.poster.avatar || 'https://example.com/default-image.jpg'}}
                            style={styles.avatar}
                        />
                        <View>
                            <View>
                                <View style = {styles.borderAuthor}>
                                    <Text style={styles.posterName}>{item.poster.name}</Text>
                                    <Text style = {{fontSize: 16}}>{item.mark_content}</Text>
                                </View>                                
                            </View>

                            <View style = {{flexDirection: "row", marginBottom: 10}}>
                                <Text style = {styles.createAt}>
                                    {getFormattedTimeAgo(item.created)}
                                </Text>
                                <Text style = {styles.like}>Like</Text>
                                <TouchableOpacity onPress={() => handleShowReply(item.id, item.poster.name)}>
                                    <Text style = {styles.reply}>Reply</Text> 
                                </TouchableOpacity>
                            </View>  

                            <FlatList
                                data = {item.comments}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style = {styles.replyMark}>
                                        <Image
                                            source={{ uri: item.poster.avatar || 'https://example.com/default-image.jpg'}}
                                            style={styles.avatarReply}
                                        />
                                        <View>
                                            <View style = {styles.borderAuthors}>
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
                <View style = {styles.inputContainers}>
                    {showReply &&
                        <View style = {{flexDirection:"row"}}>
                            <Text>
                                Replying to <Text style={{fontWeight:"bold"}}>{showUserName}</Text>
                            </Text>
                            <Text style= {{fontWeight:"bold", color:"#65676B", marginLeft:5,}}>.</Text>
                            <TouchableOpacity onPress={handleCloseReply}>
                                <Text style = {{fontWeight:"bold", color:"#65676B", paddingLeft:5,}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style = {styles.inputContainer}>
                        <TextInput
                            style = {styles.textInput}
                            multiline={true}
                            numberOfLines={1} 
                            placeholder="Write a public comment..."
                            placeholderStyle={styles.placeholder}
                            value={textComment}
                            onChangeText={(inputText) => setTextCtextComment(inputText)}
                        />                            
                        <View>
                            
                                {textComment ? (
                                <TouchableOpacity onPress={handleSetMarkComment}>
                                    <Image
                                        source={require("../../../assets/images/home/send-blue.png")}
                                        style = {styles.cameraComment}
                                    />                                    
                                </TouchableOpacity>

                                ):(
                                 <TouchableOpacity>   
                                <Image
                                    source={require("../../../assets/images/home/send-white.png")}
                                    style = {styles.cameraComment}
                                /> 
                                </TouchableOpacity>                            
                                )}                      
                                                          
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
      );
}

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingTop: 2,
      height: "95%",
      marginTop: "14%"
    },
    commentContainer: {
      flex:1,
      flexDirection: "row",
      marginLeft: 15,
      marginBottom: 15,
      width: "75%",
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
        // maxWidth: 200,  
        backgroundColor: "#ddd",
        borderRadius: 10,
        paddingTop: 1,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    borderAuthors: {
        backgroundColor: "#ddd",
        borderRadius: 10,
        paddingTop: 1,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    replyMark:{
        flexDirection: "row",
        marginBottom: 10,
        width: "83%",
        // backgroundColor: "#ccc"
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
        paddingTop: 5,
    },
    inputContainers:{
        paddingLeft:20,
        borderTopWidth: 0.6, 
        borderBottomWidth: 0.6, 
        borderTopColor: "#8D949E", 
        paddingTop: 5,
        paddingBottom:30,
    },
    textInput: {
        width: "80%",
        height: "auto",
        backgroundColor: "#ddd",
        borderRadius: 15,
        padding: 10,
    },
    cameraComment: {
        width: 40,
        height: 40,
        marginLeft: 10,
        zIndex: 100,
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