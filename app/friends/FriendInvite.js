import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Ionicons, Entypo} from '@expo/vector-icons';
import { getRequestedFriends, setAcceptFriend } from '../../api/friends/Friend';

const data = [
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
  {
    avatar:
      'https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg',
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90,
  },
];

const RequestedFriend = () => {
  const [requestedFriendData, setRequestedFriendData] = useState([])
  const [requestData, setRequestData] = useState({
    index: "0",
    count: "10"
  })
  const [totalData, setTotalData] = useState(0)
  
  const handleGetRequestedFriend = async() => {
    try {
      const result = await getRequestedFriends(requestData)
      setRequestedFriendData([...requestedFriendData, ...result.requests])
      setTotalData(result.total);
      console.log("sucessfully")
    } catch(error) {
      console.log("err: ", error)
    }
  }

  const handleSetAcceptFriend = async(friendId) => {
    try {
      const response = await setAcceptFriend({
        user_id: friendId,
        is_accept: '1'
      })

      if (response.message === 'OK') {
        const updatedFriends = requestedFriendData.filter(
          (friend) => friend.id !== friendId
        );
        setRequestedFriendData(updatedFriends);
        setTotalData(updatedFriends.length)
        console.log("sucessfully chấp nhận lời mời kết bạn")
      } else {
        console.log('Lỗi khi chấp nhận lời mời: ', response.message);
      }
    } catch(error) {
      console.log("err: ", error)
    }
  }

  const handleSetRejectFriend = async(friendId) => {
    try {
      const response = await setAcceptFriend({
        user_id: friendId,
        is_accept: '0'
      })

      if (response.message === 'OK') {
        const updatedFriends = requestedFriendData.filter(
          (friend) => friend.id !== friendId
        );
        setRequestedFriendData(updatedFriends);
        setTotalData(updatedFriends.length)
        console.log("đã xóa lời mời kết bạn")
      } else {
        console.log('Lỗi khi xóa lời mời: ', response.message);
      }
    } catch(error) {
      console.log("err: ", error)
    }
  }

  useEffect(() => {
    handleGetRequestedFriend();
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
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Lời mời kết bạn</Text>
        <TouchableOpacity style={styles.buttonSearch}>
          <Entypo
            style={{backgroundColor: '#fff'}}
            name="dots-three-horizontal"
            size={25}
            color="black"
            // onPress={}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.invite}>
          <Text style={styles.textInvite}>
            Lời mời kết bạn <Text style={{color: 'red', fontSize: 22}}>{totalData}</Text>
          </Text>
        </View>
        <View style={styles.listFriend}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {requestedFriendData.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image source={{uri: friend.avatar || 'https://example.com/default-image.jpg'}} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{friend.username}</Text>
                  <Text>{friend.same_friends} bạn chung</Text>
                  <View style={styles.buttonContainer}>
                    {/* Nút Chấp nhận */}
                    <TouchableOpacity 
                      style={[styles.button, styles.acceptButton]}
                      onPress={() => handleSetAcceptFriend(friend.id)}
                    >
                      <Text style={styles.buttonText}>Chấp nhận</Text>
                    </TouchableOpacity>
                    {/* Nút Xóa */}
                    <TouchableOpacity 
                      style={[styles.button, styles.deleteButton]}
                      onPress={() => handleSetRejectFriend(friend.id)}
                    >
                      <Text style={styles.buttonText}>Xóa</Text>
                    </TouchableOpacity>
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
    // marginHorizontal: 15,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default RequestedFriend;
