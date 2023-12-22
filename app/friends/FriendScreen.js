import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getUserFriends } from '../../api/friends/Friend';
import { router } from 'expo-router';

const dataFake = [
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

const FriendScreen = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  // console.log(user.id)
  const [friendData, setFriendData] = useState([]);
  const [totalFriend, setTotalFriend] = useState(0);
  const [loading, setLoading] = useState(false);
  const [requestData, setRequestData] = useState({
    index: "0",
    count: "50",
    user_id: user.id,
  });

  const handleGetFriend = async () => {
    try {
      const result = await getUserFriends(requestData);
      setFriendData([...friendData, ...result.friends]);
      setTotalFriend(result.total);
      console.log("sucessfully");
    } catch(error) {
      console.log("err",error);
    }
  }

  useEffect(() => {
    handleGetFriend();
  }, [requestData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.buttonReturn}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Bạn bè</Text>
          <TouchableOpacity style={styles.buttonSearch}>
            <Ionicons
              name="search"
              size={28}
              color="black"
              // onPress={}
            />
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
          <Text style={styles.textInvite}>100 bạn bè</Text>
        </View>
        <View style={styles.listFriend}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {loading ? (
              // Hiển thị Loading Indicator khi đang tải dữ liệu
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              // Hiển thị danh sách bạn bè từ dữ liệu API
              dataFake.map((friend, index) => (
                <View key={index} style={styles.friendItem}>
                  <Image source={{uri: friend.avatar}} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.name}>{friend.name}</Text>
                    {/* <Text>{totalFriend} bạn chung</Text> */}
                    <Text>{friend.mutualFriend} bạn chung</Text>
                  </View>
                  <Entypo
                    style={styles.options}
                    name="dots-three-horizontal"
                    size={25}
                    color="black"
                    // onPress={}
                  />
                </View>
              ))
            )}
            
            {/* {data.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image source={{uri: friend.avatar}} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{friend.name}</Text>
                  <Text>{friend.mutualFriend} bạn chung</Text>
                </View>
                <Entypo
                  style={styles.options}
                  name="dots-three-horizontal"
                  size={25}
                  color="black"
                  // onPress={}
                />
              </View>
            ))} */}
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
    borderRadius: 25,
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
});

export default FriendScreen;
