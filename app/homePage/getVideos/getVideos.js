import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GetListVideos from "./getListVideos";
import { getListVideos } from "../../../api/post/video";
import Navbar from "../../../components/Navbar";

export default getVideos = () => {
    const [commentData, setCommentData] = useState([]);
    const [requestData, setRequestData] = useState({
        in_campaign: "1",
        campaign_id: "1",
        latitude: "1.0",
        longitude: "1.0",
        index: "0",
        count: "5",
    });

    const [loadingMore, setLoadingMore] = useState(false);

    const handleGetVideos = async () => {
        try {
            const result = await getListVideos(requestData);
            setCommentData([...commentData,...result])
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEndReached = () => {
        if (!loadingMore) {
          setLoadingMore(true);
    
          // Cập nhật index để load thêm
          setRequestData((prevRequestData) => ({
            ...prevRequestData,
            index:( parseInt(prevRequestData.index) + parseInt(prevRequestData.count)).toString(),
          }));
        }
    };

        // Xử lý khi đã load thêm thành công
    useEffect(() => {
            if (loadingMore) {
                handleGetVideos(); // Gọi lại hàm handleFetchData để load thêm bài viết
                setLoadingMore(false); // Đặt loadingMore về false để có thể load thêm lần tiếp theo
            }
    }, [loadingMore]);

    useEffect(() => {
        handleGetVideos();
    },[requestData])

    return (
        <View style={styles.container}>
            <View style = {styles.navbar}>
                <Navbar/>            
            </View>
            <FlatList
                data = {commentData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <GetListVideos item={item}/> }
                onEndReached={handleEndReached} // Xác định sự kiện khi cuộn đến cuối trang
                onEndReachedThreshold={0.1}
                ListFooterComponent={loadingMore && <ActivityIndicator style={styles.loadingIndicator} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    author: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10,
      
    },
    iconContainer:{
        paddingLeft: 15,
        paddingRight: 15,
    },
    loadingIndicator: {
        marginVertical: 10,
    },
})