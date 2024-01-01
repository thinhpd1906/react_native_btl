import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getUserFriends, unFriend } from '../../api/friends/Friend';
import { setBlock } from '../../api/block/Block';
import { router } from 'expo-router';
import Navbar from '../../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendScreen = () => {
  const [friendData, setFriendData] = useState([]);
  const [totalFriend, setTotalFriend] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [requestData, setRequestData] = useState({
    index: "0",
    count: "15",
    user_id: null,
  });

  useEffect(()=>{
    const fetchData = async()=>{
      const result = await AsyncStorage.getItem("userId")
      setUserData(result);
      setUserDataLoaded(true);
    }
    fetchData();
  },[])

  useEffect(() => {
    if (userDataLoaded) {
      setRequestData((prevRequestData) => ({
        ...prevRequestData,
        user_id: userData, // Cập nhật user_id khi userData thay đổi
      }));
    }
  }, [userData, userDataLoaded]);

  const handleGetUserFriend = async () => {
    try {
      const result = await getUserFriends(requestData);
      setFriendData([, ...result.friends]);
      setTotalFriend(result.total);
    } catch(error) {
      console.log("err", error);
    }
  }

  const openModal = (friendId) => { 
    setSelectedFriendId(friendId)
    setModalVisible(true)
  }
  const closeModal = () => { setModalVisible(false); }

  const handleBlock = async(friendId) => {
    try {
      const response = await setBlock({
        user_id: friendId
      })

      if (response.message === 'OK') {
        const updatedFriends = friendData.filter(
          (friend) => friend.id !== friendId
        );
        setFriendData(updatedFriends);
        setTotalFriend(updatedFriends.length)
        console.log(`Đã chặn người dùng có ID: ${friendId}`)
      }
    } catch (error) {
        console.log("Lỗi khi chặn người dùng: ", error)
    }
    closeModal()
  }

  const handleUnFriend = async(friendId) => {
    try {
      const response = await unFriend({
        user_id: friendId
      })

      if (response.message === 'OK') {
        const updatedFriends = friendData.filter(
          (friend) => friend.id !== friendId
        );
        setFriendData(updatedFriends);
        setTotalFriend(updatedFriends.length)
        console.log(`Hủy kết bạn với người bạn có ID: ${friendId} thành công`)
      } else {
        console.log("Lỗi khi hủy kết bạn: ", response.message);
      }
    } catch(error) {
      console.log("err: ", error)
    }
    closeModal()
  }

  useEffect(() => {
    handleGetUserFriend();
  }, [requestData]);

  return (
    <>
    <View style={styles.container}>
      <Navbar/>
      <View style={styles.header}>
        <View style={styles.headerBar}>
          {/* <TouchableOpacity style={styles.buttonReturn}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="black" />
          </TouchableOpacity> */}
          <Text style={styles.textHeader}>Bạn bè</Text>
          <TouchableOpacity style={styles.buttonSearch}>
            <Ionicons
              name="search"
              size={28}
              color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/friends/SuggestionFriend')}
          >
            <Text>Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/friends/FriendInvite')}
          >
            <Text>Lời mời</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.invite}>
          <Text style={styles.textInvite}>{totalFriend} bạn bè</Text>
        </View>
        <View style={styles.listFriend}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {loading ? (
              // Hiển thị Loading Indicator khi đang tải dữ liệu
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              // Hiển thị danh sách bạn bè từ dữ liệu API
              friendData.map((friend, index) => (
                <View key={index} style={styles.friendItem}>
                  <Image source={{ uri: friend.avatar || 'https://example.com/default-image.jpg' }} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.name}>{friend.username}</Text>
                    <Text>{friend.same_friends} bạn chung</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.options}
                    onPress={() => openModal(friend.id)}
                  >
                    <Entypo
                      name="dots-three-horizontal"
                      size={25}
                      color="black" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
      // style={styles.modalContainer}
      >
      {/* Vùng tương tác với nền để đóng modal */}
      <TouchableOpacity style={styles.overlay} onPress={() => closeModal()} />
      <View style={styles.modalContent}>
        {/* Nút "Block" */}
        <TouchableOpacity style={styles.modalButton} onPress={() => handleBlock(selectedFriendId)}>
          <MaterialCommunityIcons name='account-cancel-outline' size={20} style={{marginRight: 5}} />
          <Text style={{fontWeight: 'bold'}}>Block</Text>
        </TouchableOpacity>

        {/* Nút "Hủy kết bạn" */}
        <TouchableOpacity style={styles.modalButton} onPress={() => handleUnFriend(selectedFriendId)}>
          <MaterialCommunityIcons name='account-remove-outline' size={20} style={{marginRight: 5, color: 'red'}} />
          <Text style={{color: 'red', fontWeight: 'bold'}}>Hủy kết bạn</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    </>
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
    flexDirection: 'collumn',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    flexDirection: 'row',
    borderRadius: 5,
    gap: 10,
  },
  button: {
    padding: 7,
    borderRadius: 19,
    backgroundColor: '#969393',
    justifyContent: "center",
    alignItems: "center"
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
  option: {
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  options: {
    marginLeft: 'auto',
  },
  modalContent: {
    backgroundColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalButton: {
    display: 'flex', 
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  // modalCloseButton: {
  //   backgroundColor: '#ebebeb',
  //   alignSelf: 'flex-end',
  //   padding: 5,
  //   marginTop: 10,
  //   marginRight: 10,
  //   borderRadius: 10,
  // },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default FriendScreen;
