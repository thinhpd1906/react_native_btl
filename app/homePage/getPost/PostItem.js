import { Video } from "expo-av";
import { 
    Image, StyleSheet, Text, TouchableOpacity, View, Modal
} from "react-native";
import { useEffect, useState } from "react";
import moment from 'moment';
import ThreePicture from "../../../components/ThreePicture";
import TwoPicture from "../../../components/TwoPicture";
import FourPicture from "../../../components/FourPicture";
import FivePicture from "../../../components/FivePicture";
import CommentPost from "../comment/CommentPost";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getListPosts, get_Post } from "../../../api/post/post";
import { getIdPostSuccess } from "../../../store/post";
import GetListFeels from "../comment/GetListFeels";
import SetFeel from "../comment/SetFeel";

export default PostItem = ({ item , user}) => {
    const post_Id = {
        id: item.id,
    }
   
    const dispatch = useDispatch();

    const [itemf, setItem] = useState(item.feel)
    const [modalVisible, setModalVisible] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [showFeel, setShowFeel] = useState(false);

    const count  = () => {
        
    }

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleEditPost = async() => {
        setModalVisible(false);

        const result = await get_Post(post_Id);
        dispatch(getIdPostSuccess(result)) ;

        router.push('/homePage/editPost/editPost');
    }

    const handleDeletePost = async() => {
        const requestData = {
            in_campaign: "1",
            campaign_id: "1",
            latitude: "1.0",
            longitude: "1.0",
            index: "0",
            count: "16",
        }
        const id = {
            id: item.id,
        }
        try {
            await deletePost(id);

            await getListPosts(requestData, dispatch);
            setModalVisible(false);

            console.log("delete success")
        } catch (error) {
            console.error("err delete post", error);
        }
    }
    
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
          return `${years} năm trước`;
        } else if (months > 0) {
          return `${months} tháng trước`;
        } else if (days > 0) {
          return `${days} ngày trước`;
        } else if (hours > 0) {
          return `${hours} giờ trước`;
        } else {
          return `${minutes} phút trước`;
        }
      };
    const formattedTimeAgo = getFormattedTimeAgo(item.created);

    // console.log('cnt',item.feel)

    return(
    <View style = {styles.postItem}>
        <View style = {{paddingLeft: 10, paddingRight: 10}}>
            <View style = {styles.author}>
                <Image
                    style={styles.avatar}
                    source={{ uri: item.author.avatar || 'https://example.com/default-image.jpg'}}
                />
                <View>
                    <View style = {{flexDirection:"row"}}>
                        <Text style = {{fontWeight: 600, fontSize: 20}}>
                            {item.author.name}
                        </Text>
                        {item.state == "" ? (
                            ""
                        ):(
                            <Text style = {{marginLeft: 5, marginTop:5}}>
                                is feeling {item.state}
                            </Text>                             
                        )}
                    </View>
                    <Text style = {{fontSize: 13, color: "#65676B"}}>{formattedTimeAgo}</Text>                      
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
                        {user.id == item.author.id ? (
                            <View>
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
                                <TouchableOpacity onPress={handleDeletePost}>
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
                            </View>
                        ) : (
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
                        )}

                    </View>
                </Modal>               
            </View>
            {item.described ? (
                <Text 
                    style = {{
                        fontWeight: 400,
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
            style={{ width: "100%", height: 350 }}
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
            <TouchableOpacity onPress={()=>setShowFeel(true)}>
                <View style = {{flexDirection:"row", alignContent:"center", marginLeft: 30, position: 'relative',}}>
                    <Image
                        source={require('../../../assets/images/home/like-blue1.png')}
                        style = {{
                            width: 20, height:20, borderRadius: 15, 
                            borderColor:"#fff", borderWidth:2,
                            position: 'absolute',
                            left:-15,
                            zIndex:5,
                        }}
                    />
                    <Image
                        source={require('../../../assets/images/home/sad.png')}
                        style = {{width: 18, height:18, borderRadius: 10, }}
                    />
                    <Text style = {{paddingLeft: 5, color: "#65676B"}}>
                        {itemf}
                    </Text>                     
                </View>
            </TouchableOpacity>
            {showFeel && 
                <GetListFeels
                    visible={showFeel}
                    onClose={() => setShowFeel(false)}
                    post_Id = {item.id}
                />
            }
            <Text style = {{marginLeft: "50%", color: "#65676B"}}>
                {item.comment_mark} comments
            </Text>                
        </View>
        <View style = {{
                flexDirection: 'row',
                padding: 8,
            }}>
            
            <SetFeel
                item={item}
                count = {count}
            />

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
                    post_Id = {item.id}
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