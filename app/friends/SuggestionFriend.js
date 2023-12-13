import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const SuggestionFriend = () => {
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
            {data.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image source={{uri: friend.avatar}} style={styles.avatar} />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{friend.name}</Text>
                  <Text>{friend.mutualFriend} bạn chung</Text>
                  <View style={styles.buttonContainer}>
                    {/* Nút Chấp nhận */}
                    <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                        <Text style={styles.buttonText}>Thêm bạn bè</Text>
                    </TouchableOpacity>
                    {/* Nút Xóa */}
                    <TouchableOpacity style={[styles.button, styles.deleteButton]}>
                        <Text style={styles.buttonText}>Gỡ</Text>
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default SuggestionFriend;
