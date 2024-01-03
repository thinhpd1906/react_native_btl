import {
    Text,
    View,
    StyleSheet,
    Image,
    Avatar,
    ScrollView,
    FlatList,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
import { getNotification } from "../../api/notification/notification";
import moment from "moment";
export default function Notification({ route }) {
      const [notifyData, setNotifyData] = useState([])
      const requestData = {
        index: "0",
        count: "30"
      }
      const handGetNotification = async () =>{
        try{
          const result = await getNotification(requestData)
          setNotifyData(result)
        }
        catch(error){
          console.error("error", error);
        }
      }
      useEffect(()=>{
        handGetNotification();
      }, [requestData]);

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


    return (
      <View>
          <View style = {styles.navbar}>
            <Navbar/>
          </View>
          {route && route.name && (
          <Text>{`Current Route: ${route.name}`}</Text>
          )}
        <View style={styles.container}>
          <FlatList
                data = {notifyData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>(
                  <TouchableOpacity>
                    <View key={item.notification_id} style={styles.main}>
                      <Image style={styles.img} source={{ uri: item.user.avatar || 'https://example.com/default-image.jpg'}} />
                      {/* <Avatar style={styles.img} rounded source={{uri: ''}}/> */}
                      <View style={styles.content}>
                        <Text style={styles.item}>
                          <Text style={styles.name}>{item.user.username}</Text> 
                          {item.type == "1" ? (
                            ' đã gửi lời mời kết bạn'
                          ) : item.type == '2' ? (
                            ' đã chấp nhận lời mời kết bạn'
                          ) : item.type == '3' ? (
                            ' đã thêm một bài viết mới'
                          ) : item.type  == "4" ? (
                            ' đã cập nhật lại bài viết'
                          ) : item.type  == "5" ? (
                            ' đã bày tỏ cảm xúc bài viết của bạn'
                          ) : item.type  == "6" ? (
                            ' đã bình luận bài viết của bạn'
                          ) : item.type  == "7" ? (
                            ' đã trả lời bình luận của bạn'
                          ) : item.type  == "8" ? (
                            ' đã thêm một video mới'
                          ) : item.type  == "9" ? (
                            ' đã bình luận bài viết của bạn'
                          ) : ('')
                        }
                        </Text>
                        <Text style={styles.time}>{getFormattedTimeAgo(item.created)}</Text>
                      </View>
                    </View>                    
                  </TouchableOpacity>
                 
                )}
          />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
    },
    header: {
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      marginBottom: 10,
    },
    textHeader: {
      fontSize: 25,
      fontWeight: "600",
      marginLeft: 30,
    },
    main: {
      marginBottom: 1,
      backgroundColor: "#f6f7f9",
      flexDirection: "row",
      justifyContent: "center", //Centered horizontally
      alignItems: "center", //Centered vertically
    },
    img: {
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
      marginTop: 5,
      width: 80,
      height: 80,
      borderRadius: 100,
      flex: 0,
    },
    content: {
      flex: 1,
    },
    name: {
      fontWeight: "bold",
    },
    time: {
      fontSize: 10,
      fontWeight: "300",
    },
  });
  