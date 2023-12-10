import { Video } from "expo-av";
import { 
    Image, StyleSheet, Text, TouchableOpacity, View, Modal
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ThreePicture from "../../../components/ThreePicture";
import TwoPicture from "../../../components/TwoPicture";
import FourPicture from "../../../components/FourPicture";
import FivePicture from "../../../components/FivePicture";
import CommentPost from "../comment/CommentPost";
import { router } from "expo-router";

export default PostItem = ({ item }) => {
    const data = [
        {
            mark_content: "Hôm nay lướt qua Facebook thấy bài này...sâu lắng..từng câu từ..từng chữ.. Thấm..nghe qua một lần nghiện luôn  Cảm ơn Only C.. Ko ra thì thôi..ra bài nào cũng đẳng cấp và Thấm❤ ",
            // image: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg",
            
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
            {
                content: "so good",
                created: "2023-12-01T10:18:37.432Z",
                poster: {
                    id: "102",
                    name: "Minh12345",
                    avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
                }
            },
            {
                content: "so good",
                created: "2023-12-01T10:18:37.432Z",
                poster: {
                    id: "102",
                    name: "Minh12345",
                    avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
                }
            },
            {
                content: "so good",
                created: "2023-12-01T10:18:37.432Z",
                poster: {
                    id: "102",
                    name: "Minh12345",
                    avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
                }
            },
            ]
        },
        {
            mark_content: "so good",
            // video: "https://it4788.catan.io.vn/files/video-1701153345274-798896164.mp4",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
   
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [

            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
              
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
          
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
          
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
          
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
          
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
          
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
          
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
          
            ]
        },
        {
            mark_content: "so good",
            type_of_mark: "1",
            created: "2023-12-01T17:07:38.901Z",
            poster: {
                id: "102",
                name: "Minh Nguyễn",
                avatar: "https://it4788.catan.io.vn/files/avatar-1701153643437-841715809.jpg"
            },
            comments: [
          
            ]
        },
    ];
    const [modalVisible, setModalVisible] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const navigation = useNavigation();

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleEditPost = () => {
        setModalVisible(false);
        router.push('/homePage/editPost/editPost');
    }

    return(
    <View style = {styles.postItem}>
        <View style = {{paddingLeft: 10, paddingRight: 10}}>
            <View style = {styles.author}>
                <Image
                    style={styles.avatar}
                    source={{ uri: item.author.avatar || 'https://example.com/default-image.jpg'}}
                />
                <View>
                    <Text style = {{fontWeight: 600, fontSize: 20}}>
                        {item.author.name}
                    </Text>
                    <Text style = {{fontSize: 13, color: "#65676B"}}>{item.created}</Text>                      
                </View>                
                <TouchableOpacity 
                    onPress={openModal}
                    style={styles.menu}
                >
                    <Image
                        style={styles.menuImg}
                        source={require('../../../assets/images/home/menu1.png')}
                    />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.overlay} />
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={closeModal}>
                            <Image
                                source={require("../../../assets/images/home/dash.png")}
                                style={styles.closeModal}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleEditPost}>
                            <View style = {{flexDirection: "row"}}>
                                <Image
                                    source={require("../../../assets/images/home/edit.png")}
                                    style={styles.imgEdit}
                                />                                 
                                <Text style = {styles.textEdit}>
                                    Edit
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {{flexDirection: "row"}}>
                                <Image
                                    source={require("../../../assets/images/home/delete.png")}
                                    style={styles.imgDelete}
                                />                                 
                                <Text style = {styles.textDelete}>
                                    Delete
                                </Text>  
                            </View>                         
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style = {{flexDirection: "row"}}>
                                <Image
                                    source={require("../../../assets/images/home/report.png")}
                                    style={styles.imgReport}
                                />                                
                                <Text style = {styles.textReport}>
                                    Report
                                </Text>
                            </View>                          
                        </TouchableOpacity>
                    </View>
                </Modal>               
            </View>
            {item.described ? (
                <Text 
                    style = {{
                        fontWeight: 500,
                        fontSize: 16,
                        marginBottom: 10,
                    }}>
                    {item.described}
                </Text>  
            ):(
                ""
            )}
              
        </View>

        {item.video && item.video.url ? (
        <View>
            <Video
            source={{ uri: item.video.url }}
            rate={1.0}
            volume={0.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: "100%", height: 200 }}
            />            
            <View>
                {item.image.length > 4 ?(
                <FivePicture 
                    selectedImages={item.image.slice(0, 4).map(img => img.url)} 
                    extraImagesCount={item.image.length - 4} 
                />
                ) : item.image.length === 3 ? (
                <ThreePicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 2 ? (
                <TwoPicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 4 ? (
                <FourPicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 1 ? (
                <Image
                    source={{
                    uri: item.image[0].url,
                    }}
                    style={styles.picture}
                />
                ) : (
                ""
                )}
            </View>
        </View>
        ) : (
            <View>
                {item.image.length > 4 ?(
                <FivePicture 
                    selectedImages={item.image.slice(0, 4).map(img => img.url)} 
                    extraImagesCount={item.image.length - 4} 
                />
                ) : item.image.length === 3 ? (
                <ThreePicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 2 ? (
                <TwoPicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 4 ? (
                <FourPicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 1 ? (
                <Image
                    source={{
                    uri: item.image[0].url,
                    }}
                    style={styles.picture}
                />
                ) : (
                ""
                )}
            </View>

        )}

        <View style = {{
            flexDirection: 'row', 
            alignItems: 'center',
            // justifyContent: 'center',
            padding: 10,
            borderBottomWidth: 0.6,
            borderBottomColor: "#8D949E",
        }}>
            <Text style = {{paddingLeft: 10, color: "#65676B"}}>
                Feel: {item.feel}
            </Text>
            <Text style = {{marginLeft: "50%", color: "#65676B"}}>
                {item.comment_mark} comments
            </Text>                
        </View>
        <View style = {{
                flexDirection: 'row',
                padding: 8,
            }}>
            <TouchableOpacity style = {{flexDirection: 'row',}}>
                <Image
                    source={require('../../../assets/images/home/like.png')}
                    style = {{height: 30, width: 30, marginLeft: "20%",}}
                />
                <Text style = {{marginTop: 7, marginLeft: 7, color: "#65676B"}}>
                    Like
                </Text>                    
            </TouchableOpacity>
            <View>
                <TouchableOpacity 
                    style = {{flexDirection: 'row',}}
                    onPress={() => setShowComment(true)}
                >
                    <Image
                        source={require('../../../assets/images/home/comment.png')}
                        style = {{height: 30, width: 30, marginLeft: "40%",}}
                    />
                    <Text style = {{marginTop: 7, marginLeft: 7, color: "#65676B"}}>
                        Comment
                    </Text>                    
                </TouchableOpacity>
                {showComment && (
                <CommentPost
                    visible={showComment}
                    onClose={() => setShowComment(false)}
                    comments={data}
                />                     
                )}
                              
            </View>
        </View>
    </View>
    )
};

const styles = StyleSheet.create({
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginRight: 10,
    },
    menu: {
        marginLeft: "auto",
        marginTop: 5,
        marginRight: 10,
    },
    menuImg: {
        width: 25,
        height: 27,        
    },
    postItem: {
        flex:1,
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 8,
        borderBottomColor: '#ddd',
    },
    author: {
        flexDirection: 'row',
        marginBottom: 10
    },
    picture: {
        width: "100%",
        height: 350,
        overflow: "hidden",
        marginTop:0,
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: "18%",
        marginTop: "auto"
    },
    closeModal: {
        height: 10,
        marginBottom: 10,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    textEdit: {
        fontSize: 20,
        fontWeight: "600",
        color: "black",
        padding: 5,
        marginRight: 20,
    },
    imgEdit:{
        width: 25, 
        height: 25, 
        marginBottom:5,
        marginTop: 5,
        marginRight: 5,
    },
    textDelete: {
        fontSize: 20,
        fontWeight: "600",
        color: "black",
        padding: 5,
        marginRight: 5,
    },
    imgDelete:{
        width: 30, 
        height: 30, 
        marginBottom:5,
        marginTop: 3,
        marginRight: 5,
    },
    textReport: {
        fontSize: 20,
        fontWeight: "600",
        color: "black",
        padding: 5,
    },
    imgReport:{
        width: 25, 
        height: 25, 
        marginBottom:5,
        marginTop: 4,
        marginRight: 5
    }
});