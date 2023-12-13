import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

const data = [
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
  {
    avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg",
    name: 'Nguyễn Ăn Khu',
    mutualFriend: 90
  },
]

const FriendList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
            // onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.invite}>
          <Text style={styles.textInvite}>100 bạn bè</Text>
        </View>
        <View style={styles.listFriend}>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {data.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image
                  source={{ uri: friend.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{friend.name}</Text>
                  <Text>{friend.mutualFriend} bạn chung</Text>
                </View>
                <Entypo style={styles.options}
                  name="dots-three-horizontal"
                  size={25}
                  color="black"
                  // onPress={}
                />
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
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    flexDirection: "row",
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
    fontWeight: "bold",
  },
  option: {
    flexDirection: "row",
    paddingBottom: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  options: {
    marginLeft: 'auto'
  }
});

export default FriendList;
