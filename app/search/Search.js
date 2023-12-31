import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {get_save_search, search, search_user} from '../../api/search/Search';
import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import PostItem from '../homePage/getPost/PostItem';
import {useSelector} from 'react-redux';
import Button from '../../components/Button';

export default Search = () => {
  const [firstClick, setFirstClick] = useState(true);
  const [showSearchRecent, setShowSearchRecent] = useState(false);
  const [postData, setPostData] = useState([]);
  const [searchRecent, setSearchRecent] = useState([]);
  const [searchText, setSearchText] = useState();
  const [searchRecentText, setSearchRecentText] = useState();
  const [showPostData, setShowPostData] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const user = useSelector(state => state.auth.login.currentUser);
  const [count, setCount] = useState(10);
  const [isFindPost, setIsFindPost] = useState(true);
  const [userData, setUserData] = useState([]);

  const handleEndReached = async () => {
    console.log('handleEndReached', loadingMore, isFindPost)
    console.log('Loading more');
      if (isFindPost) {
        const requestData = {
          keyword: searchText,
          user_id: 1,
          index: 0,
          count: count + 10,
        };
        setPostData(await search(requestData));
      } else {
        const requestDataUser = {
          keyword: searchText,
          index: 0,
          count: count + 10,
        };
        setUserData(await search_user(requestDataUser));
      }
      setCount(prev => prev + 10);
  };
  const getSearchRecent = async () => {
    console.log('getSearchRecent');
    const requestData = {
      index: 0,
      count: 10,
    };
    setSearchRecent(await get_save_search(requestData));
    setFirstClick(false);
    setShowSearchRecent(true);
  };

  const handleSearch = async () => {
    if (searchText === undefined) {}
    else {
      if (isFindPost === true) {
        const requestData = {
          keyword: searchText,
          user_id: 1,
          index: 0,
          count: 5,
        };
        setPostData(await search(requestData));
      } else {
        const requestDataUser = {
          keyword: searchText,
          index: 0,
          count: 10,
        };
        setUserData(await search_user(requestDataUser));
      }
    }
    setShowSearchRecent(false);
  };

  const handleSearchRecent = async text => {
    setSearchRecentText(text);
    setSearchText(text);
  };

  const handleDeleSearch = () => {
    router.push('/search/HistorySearch');
  };

  const handleSelectPost = async () => {
    if (isFindPost === true){}
    else {
      setIsFindPost(true);
      if (postData.length > 0) {}
      else {
        const requestData = {
          keyword: searchText,
          user_id: 1,
          index: 0,
          count: 5,
        };
        setPostData(await search(requestData));
      }
    }
  }

  const handleSelectUser = async () => {
    console.log('select user', isFindPost, userData)
    if (isFindPost === false){}
    else {
      setIsFindPost(false);
      if (userData.length > 0) {}
      else {
        const requestData = {
          keyword: searchText,
          index: 0,
          count: 10,
        };
        setUserData(await search_user(requestData));
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.group}>
          <TextInput
            style={styles.input}
            value={searchText}
            placeholder="Tìm kiếm..."
            onPressIn={getSearchRecent}
            onChangeText={text => setSearchText(text)}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
        </View>
        {searchText === undefined && <TouchableOpacity></TouchableOpacity>}
      </View>

      {showSearchRecent === true && (
        <View style={styles.body}>
          <View style={styles.group1}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
              }}>
              Tìm kiếm gần đây
            </Text>
            <TouchableOpacity
              onPress={handleDeleSearch}
              >
              <Text
                style={{
                  fontSize: 22,
                  color: 'blue',
                }}>
                Chỉnh sửa
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listSearch}>
            {searchRecent.map((search, index) => (
              <TouchableOpacity
                style={styles.searchItem}
                key={index}
                onPress={() => handleSearchRecent(search.keyword)}>
                <Ionicons name="search" size={32} color="#333" />
                <Text
                  style={{
                    fontSize: 20,
                  }}>
                  {' '}
                  {search.keyword}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {showSearchRecent === false && (
        <View style={styles.body}>
          <View style={styles.selectFind}>
            <Button title="Bài viết" isSelect={isFindPost} onPress={handleSelectPost} />
            <Button title="Người dùng" isSelect={!isFindPost} onPress={handleSelectUser} />
          </View>

          {isFindPost === true && (
            <FlatList
              style={styles.listPost}
              data={postData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <PostItem item={item} user={user} />}
              onEndReached={handleEndReached} // Xác định sự kiện khi cuộn đến cuối trang
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                loadingMore && (
                  <ActivityIndicator style={styles.loadingIndicator} />
                )
              }
            />
          )}

          {isFindPost === false && (
            <FlatList
              style={styles.listUser}
              data={userData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.itemUser}
                  // cho nay cho thinh
                  onPress = {
                    () =>
                   { console.log("friends", item)
                    router.push({
                      pathname: `/profile/${item.id}`,
                      params: {
                        userId: item.id
                      }
                    })}
                  }
                >
                  <Image
                    source={item.avatar ? {
                      uri: item.avatar,
                    } : require('../../assets/images/search.png')}
                    style={styles.avatarPeople}
                  />
                  <View style={{marginLeft: 30}}>
                    <Text style={styles.textPeople}>{item.username}</Text>
                    <Text style={styles.textPeople}>{item.same_friends} bạn chung</Text>
                  </View>
                </TouchableOpacity>
              )}
              onEndReached={handleEndReached} // Xác định sự kiện khi cuộn đến cuối trang
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                loadingMore && (
                  <ActivityIndicator style={styles.loadingIndicator} />
                )
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
  },
  group: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    width: '100%',
    maxHeight: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    bottom: 0,
    margin: 10,
    // backgroundColor: '#eee',
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  // body
  body: {
    flex: 1,
    marginTop: 40,
    // backgroundColor: '#123456',
    // height: 640,
  },
  group1: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    width: '100%',
    height: 50,
    maxHeight: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  listSearch: {
    // backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
    width: '100%',
  },
  searchItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginLeft: 5,
    width: '100%',
    height: 60,
  },
  listPost: {
    // backgroundColor: 'green',
    // height: 400,
  },
  listUser: {
    // backgroundColor: '#455424',
    // height: 400,

  },
  selectFind: {
    marginTop: -10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemUser: {
    flexDirection: 'row',
    height: 70,
    // backgroundColor: '#431231',
    marginBottom: 10,
  },
  avatarPeople: {
    height: 50,
    width: 50,
    borderRadius: 5,
    marginBottom: 5,
  },
  textPeople: {
    fontSize: 20,
  }
});
