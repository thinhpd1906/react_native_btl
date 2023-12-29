import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
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

    const handleGetVideos = async () => {
        try {
            const result = await getListVideos(requestData);
            setCommentData([...commentData,...result])
        } catch (error) {
            console.error('Error:', error);
        }
    }

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
})