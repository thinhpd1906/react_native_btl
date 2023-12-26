import { router } from "expo-router";
import { 
    ActivityIndicator,
    FlatList, Image, StyleSheet, Text, TouchableOpacity, View 
} from "react-native"
import PostItem from "./getPost/PostItem";
import { useEffect, useState } from "react";
import { getListPosts, getNewPosts } from "../../api/post/post";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";

export default home = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const postLists = useSelector((state) => state.post.allPosts?.posts)
    // const postNew = useSelector((state) => state.post.newPosts.post)
    // console.log(postNew)
    // console.log(user)

    const imageUrl = user.avatar;
    const dispatch = useDispatch();

    const [postData, setPostData] = useState([]);
    const [requestData, setRequestData] = useState({
        in_campaign: "1",
        campaign_id: "1",
        latitude: "1.0",
        longitude: "1.0",
        index: "0",
        count: "20",
    });
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const handlePress = () => {
        router.push('/homePage/createPost/createPost')  
    };

    const handleGetListPost = async () => {

        try {
            setLoading(true);
            await getListPosts(requestData, dispatch);
            // setPostData([...postData,...postLists])
            
        } catch (error) {
            console.error('Errors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEndReached = () => {
        if (!loadingMore) {
          setLoadingMore(true);
    
          // Cập nhật index để load thêm
          setRequestData((prevRequestData) => ({
            ...prevRequestData,
            index: (parseInt(prevRequestData.index) + parseInt(prevRequestData.count)).toString(),
          }));
        }
    };

    useEffect(() => {
        handleGetListPost();
    }, [requestData, dispatch]);
    
    // Xử lý khi đã load thêm thành công
    useEffect(() => {
        if (loadingMore) {
            handleGetListPost(); // Gọi lại hàm handleFetchData để load thêm bài viết
            setLoadingMore(false); // Đặt loadingMore về false để có thể load thêm lần tiếp theo
        }
    }, [loadingMore]);

    return (  
        <View style={styles.container}>
            <View style = {styles.navbar}>
                <Navbar/>
            </View>

            <View style = {styles.header}>
                <Image
                    source={{ uri: imageUrl || 'https://example.com/default-image.jpg'}}
                    style={styles.avatar}
                />
                <TouchableOpacity onPress={handlePress} style={styles.button}>
                    <Text style={styles.buttonText}>What's on your mind?</Text>
                </TouchableOpacity>
                <Image
                    source={require('../../assets/images/home/album.png')}
                    style={{
                        width: 36,
                        height: 36,
                    }}
                />         
            </View>

            <View style = {styles.content}>
                <FlatList
                    data={postLists}
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={({ item }) => (
                        <PostItem 
                            item={item} 
                            user={user}
                        />
                    )}
                    onEndReached={handleEndReached} // Xác định sự kiện khi cuộn đến cuối trang
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={loadingMore && <ActivityIndicator style={styles.loadingIndicator} />}
                />  
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    navbar:{
        flexDirection: "row", 
        paddingTop: 10, 
        paddingLeft: 20, 
        paddingRight:20,
        paddingBottom: 5, 
        justifyContent: "center",
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.7,
    },
    iconContainer:{
        paddingLeft: 15,
        paddingRight: 15,
    },
    header: {
        padding: 10,
        paddingTop: 8,
        flexDirection: 'row', 
        alignItems: 'center',
        borderBottomWidth: 8,
        borderBottomColor: '#ddd',
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginRight: 10,
    },
    button: {
        marginRight: 12,
        width: "70%",
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        borderColor: '#ddd', 
        borderWidth: 1,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 10,
    },
    content: {
        flex: 1,
    },
    loadingIndicator: {
        marginVertical: 10,
    },
  });
 
