import { router } from "expo-router";
import { 
    ActivityIndicator,
    FlatList, Image, StyleSheet, Text, TouchableOpacity, View 
} from "react-native"
import PostItem from "./getPost/PostItem";
import { useEffect, useState } from "react";
import { getListPosts } from "../../api/post/post";
import { getInfor } from "../../api/profile/profile";
import { useSelector } from "react-redux";

export default home = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    console.log(user)
    const imageUrl = user.avatar;
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

    // useEffect(() => {
    //     getInfor();
    // },[])

    const handleGetListPost = async () => {
        try {
            setLoading(true);
            const result = await getListPosts(requestData);
            setPostData([...postData, ...result]);
        } catch (error) {
            console.error('Error:', error);
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
    }, [requestData]);
    
    // Xử lý khi đã load thêm thành công
    useEffect(() => {
        if (loadingMore) {
            handleGetListPost(); // Gọi lại hàm handleFetchData để load thêm bài viết
            setLoadingMore(false); // Đặt loadingMore về false để có thể load thêm lần tiếp theo
        }
    }, [loadingMore]);
    

    return (  
        <View style={styles.container}>
            <View style = {styles.header}>
                <Image
                    source={{ uri: imageUrl }}
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
                    data={postData}
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={({ item }) => <PostItem item={item} />}
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
    header: {
        padding: 12,
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
 
