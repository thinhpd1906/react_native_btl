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
import { setBlock } from "../../../api/friends/Friend";

export default PostItem = ({ item , user}) => {
    const post_Id = {
        id: item.id,
    }
   
    const dispatch = useDispatch();

    const [itemf, setItem] = useState(item.feel)
    const [modalVisible, setModalVisible] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [showFeel, setShowFeel] = useState(false);
    const [hidePost, setHidePost] = useState(false);

    const count  = () => {

    }

    const openModal = () => {
        setModalVisible(true);
        setHidePost(false);
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

    const handleGetPost = async() => { 
        const result = await get_Post(post_Id);
        dispatch(getIdPostSuccess(result)) ;

        router.push('/homePage/getPost/getPost');
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

            setModalVisible(false);
            await getListPosts(requestData, dispatch);
            
            console.log("delete success")
        } catch (error) {
            console.error("err delete post", error);
        }
    }

    const handleBlock = async(friendId) => {
        const requestData = {
            in_campaign: "1",
            campaign_id: "1",
            latitude: "1.0",
            longitude: "1.0",
            index: "0",
            count: "20",
        }
        try {
          const response = await setBlock({
            user_id: friendId
          })
          
          setModalVisible(false);
          setHidePost(true);
        //   await getListPosts(requestData, dispatch);

          if (response.message === 'OK') {
            console.log(`Đã chặn người dùng có ID ${friendId}`) 
          }
        } catch (error) {
            console.log("Lỗi khi chặn người dùng: ", error)
        }
        closeModal();
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
    <>
    {hidePost ? (
        <View style = {styles.postItems}>
            <Image
                source={require("../../../assets/images/home/block-friend.png")}
                style={styles.imgReport}
            />
            <View style= {{marginLeft:15}}>
                <Text style = {styles.textReport}>
                    You blocked {item.author.name}'s profile
                </Text>
                <Text style = {{color:"#9B9B9B"}}>
                    You won't be able to see or contact each other
                </Text>
            </View>
        </View>
    ):(
        <View style = {styles.postItem}>
            <View style = {{marginLeft: 10, marginRight: 10}}>
                <View style = {styles.author}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: item.author.avatar || 'https://example.com/default-image.jpg'}}
                    />
                    <View>
                        <View style = {{width:250,}}>
                            {item.state == "" ? (
                                <Text style = {{fontWeight: 600, fontSize: 17}}>
                                    {item.author.name}
                                </Text>                            
                            ):(
                                <Text style = {{}}>
                                    <Text style = {{fontWeight: 600, fontSize: 17,}}>
                                        {item.author.name}
                                    </Text> is feelling {item.state}
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
                            <View style={{alignItems:"center"}}>
                                <TouchableOpacity onPress={closeModal}>
                                    <Image
                                        source={require("../../../assets/images/home/dash.png")}
                                        style={styles.closeModal}
                                    />
                                </TouchableOpacity>                            
                            </View>
                            <View style ={{padding: 20}}>
                                {user.id == item.author.id ? (
                                    <View>
                                        <TouchableOpacity onPress={handleEditPost}>
                                            <View style = {{flexDirection: "row", marginBottom: 20}}>
                                                <Image
                                                    source={require("../../../assets/images/home/edit.png")}
                                                    style={styles.imgEdit}
                                                />
                                                <View style={{marginLeft:15}}>
                                                    <Text style = {styles.textEdit}>
                                                        Edit post
                                                    </Text>
                                                    <Text style = {{color: "#9B9B9B"}}>
                                                        Change the content of the post
                                                    </Text>                                            
                                                </View>                                 
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={handleDeletePost}>
                                            <View style = {{flexDirection: "row", marginBottom:20}}>
                                                <Image
                                                    source={require("../../../assets/images/home/delete.png")}
                                                    style={styles.imgDelete}
                                                />
                                                <View style={{marginLeft:15}}>
                                                    <Text style = {styles.textDelete}>
                                                        Delete post
                                                    </Text>
                                                    <Text style = {{color: "#9B9B9B"}}>
                                                        The post will be deleted and will no longer be displayed
                                                    </Text>                                           
                                                </View>                                 
                                            </View>                         
                                        </TouchableOpacity>                                
                                    </View>
                                ) : (
                                    <View>
                                        <TouchableOpacity>
                                            <View style = {{flexDirection: "row", marginBottom: 20}}>
                                                <Image
                                                    source={require("../../../assets/images/home/report.png")}
                                                    style={styles.imgReport}
                                                />  
                                                <View style = {{marginLeft: 15}}>
                                                    <Text style = {styles.textReport}>
                                                        Report post
                                                    </Text> 
                                                    <Text style = {{color: "#9B9B9B"}}>
                                                        We won't let {item.author.name} know who reported this
                                                    </Text>                                               
                                                </View>                              
                                            </View>                          
                                        </TouchableOpacity>   
                                        <TouchableOpacity>
                                            <View style = {{flexDirection: "row", marginBottom: 20}}>
                                                <Image
                                                    source={require("../../../assets/images/home/add-friend.png")}
                                                    style={styles.imgReport}
                                                />
                                                <View style = {{marginLeft: 15}}>
                                                    <Text style = {styles.textReport}>
                                                        Add friend with {item.author.name}'s profile
                                                    </Text>
                                                    <Text style = {{color: "#9B9B9B"}}>
                                                        Let's build relationships with everyone together  
                                                    </Text>                                        
                                                </View>
                                            </View>
                                        </TouchableOpacity> 
                                        <TouchableOpacity onPress={()=> handleBlock(item.author.id)}>
                                            <View style = {{flexDirection: "row", marginBottom: 20}}>
                                                <Image
                                                    source={require("../../../assets/images/home/block-friend.png")}
                                                    style={styles.imgReport}
                                                />
                                                <View style = {{marginLeft: 15}}>
                                                    <Text style = {styles.textReport}>
                                                        Block {item.author.name}'s profile
                                                    </Text>
                                                    <Text style = {{color: "#9B9B9B"}}>
                                                        You won't be able to see or contact each other
                                                    </Text>
                                                </View>
                                            </View>                                        
                                        </TouchableOpacity>                                                                     
                                    </View>
                                )}
                            </View>
                        </View>
                    </Modal>               
                </View>
                {item.described ? (
                    <View style = {{ height:"auto"}}>
                        <Text 
                            style = {{
                                fontWeight: 400,
                                fontSize: 16,
                                marginBottom: 7,
                            }}>
                            {item.described}
                        </Text>                        
                    </View>
                ):('')}
                
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
            </View>
            ) : (
                <TouchableOpacity onPress={handleGetPost}>
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
                </TouchableOpacity>


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
                            {item.feel}
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
    )}

    </>
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
    postItems: {
        flex:1,
        flexDirection:"row",
        paddingLeft: 15,
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
        backgroundColor: '#fff',
        height: "50%",
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
        fontSize: 18,
        fontWeight: "500",
        color: "black",
        marginRight: 20,
    },
    imgEdit:{
        width: 35, 
        height: 35, 
        // marginBottom:5,
        // marginTop: 5,
        marginRight: 5,
    },
    textDelete: {
        fontSize: 18,
        fontWeight: "500",
        color: "black",
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
        fontSize: 17,
        fontWeight: "500",
        color: "black",
    },
    imgReport:{
        width: 30, 
        height: 30, 
        marginTop: 3
    }
});