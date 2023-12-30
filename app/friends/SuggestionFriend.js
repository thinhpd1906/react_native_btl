import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSuggestedFriends, setRequestFriend } from '../../api/friends/Friend';


const SuggestionFriend = () => {
  const [suggestedFriendData, setSuggestedFriendData] = useState([])
  const [requestData, setRequestData] = useState({
    index: "0",
    count: "15"
  })
  const [friendStatus, setFriendStatus] = useState({});

  
  const handleGetSuggestedFriend = async() => {
    try {
      const result = await getSuggestedFriends(requestData)
      const defaultFriendStatus = result.reduce((acc, friend) => {
        acc[friend.id] = 'add'; // Mặc định là trạng thái "Thêm bạn bè"
        return acc;
      }, {});

      setSuggestedFriendData([...suggestedFriendData, ...result])
      setFriendStatus(defaultFriendStatus);
      console.log("sucessfully")
    } catch(error) {
      console.log("err: ", error)
    }
  }

  const handleSetRequestFriend = async(friendId) => {
    try {
      const response = await setRequestFriend({
        user_id: friendId,
      })

      if (response.message === 'OK') {
        // Cập nhật trạng thái thành "Hủy" khi gửi yêu cầu thành công
        setFriendStatus({
          ...friendStatus,
          [friendId]: 'cancel',
        });
        console.log("sucessfully gửi lời mời thành công")
      } else {
        console.log('Lỗi khi gửi yêu cầu kết bạn: ', response.message);
      }
    } catch(error) {
      console.log("err: ", error)
    }
  }

  const handleDeleteRequestFriend = async(friendId) => {
    const updatedSuggestedFriends = suggestedFriendData.filter(
      (friend) => friend.id !== friendId
    );
    setSuggestedFriendData(updatedSuggestedFriends);
    console.log(`Đã gỡ người bạn có ID ${friendId} khỏi danh sách gợi ý`)
  }
  
  const handleCancelRequestFriend = (friendId) => {
    // Thực hiện các bước xử lý khi hủy yêu cầu kết bạn
    // Cập nhật trạng thái về mặc định hoặc "Thêm bạn bè" tùy thuộc vào logic của bạn
    setFriendStatus({
      ...friendStatus,
      [friendId]: 'add',
    });
  };

  useEffect(() => {
    handleGetSuggestedFriend();
  }, [requestData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonReturn}>
          <Ionicons
            style={{backgroundColor: '#fff'}}
            name="arrow-back"
            size={30}
            color="black"
            // onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Gợi ý</Text>
        <TouchableOpacity style={styles.buttonSearch}>
          <Ionicons
            name="search"
            size={28}
            color="black"
            // onPress={}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.invite}>
          <Text style={styles.textInvite}>
            Những người bạn có thể biết
          </Text>
        </View>
        <View style={styles.listFriend}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {suggestedFriendData.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image source={{uri: friend.avatar || 'https://example.com/default-image.jpg'}} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{friend.username}</Text>
                  <Text>{friend.same_friends} bạn chung</Text>
                  <View style={styles.buttonContainer}>
                    {friendStatus[friend.id] === 'add' && [
                      <TouchableOpacity 
                        key="addButton"
                        style={[styles.button, styles.acceptButton]}
                        onPress={() => handleSetRequestFriend(friend.id)}
                      >
                        <Text style={styles.buttonText}>Thêm bạn bè</Text>
                      </TouchableOpacity>,
                      <TouchableOpacity 
                        key="deleteButton"
                        style={[styles.button, styles.deleteButton]}
                        onPress={() => handleDeleteRequestFriend(friend.id)}
                      >
                        <Text style={styles.buttonText}>Gỡ</Text>
                      </TouchableOpacity>
                    ]}
                    {friendStatus[friend.id] === 'cancel' && (
                      <TouchableOpacity
                        key="cancelButton"
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => handleCancelRequestFriend(friend.id)}
                      >
                        <Text style={styles.buttonText}>Hủy</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // marginHorizontal: 10,
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  //body
  body: {
    paddingHorizontal: 15,
  },
  invite: {
    paddingTop: 15,
  },
  textInvite: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: 10,
    gap: 5,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  acceptButton: {
    backgroundColor: '#1f37d1',
  },
  deleteButton: {
    backgroundColor: '#808080',
  },
  cancelButton: {
    backgroundColor: '#808080',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default SuggestionFriend;
