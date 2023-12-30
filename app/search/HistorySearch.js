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
import {del_save_search, get_save_search, search} from '../../api/search/Search';
import {Ionicons} from '@expo/vector-icons';
imgSearch = require('../../assets/images/search.png');

export default HistorySearch = () => {
  const [historySearch, setHistorySearch] = useState([]);
  const [count, setCount] = useState(40);

  // lay lich su tim kiem
  const getSearchHistory = async () => {
    const requestData = {
      index: 0,
      count: 40,
    };
    setHistorySearch(await get_save_search(requestData));
  };

  // xoa 1 search history
  const deleteOneSearch = async (id) => {
    console.log('delete one');
    const requestData = {
        search_id: id,
        all: "0",
    }
    await del_save_search(requestData);
    const newHistorySearch = historySearch.filter(item => item.id !== id);
    setHistorySearch(newHistorySearch);
  }

  const deleteAllSearch = async () => {
    const requestData = {
        all: "1",
    }
    await del_save_search(requestData);
    setHistorySearch([]);
  };

  const handleEndHistorySearch = async () => {
    console.log('handleEndHistorySearch');
    const requestData = {
      index: 0,
      count: count + 40,
    }
    setHistorySearch(await get_save_search(requestData));
    setCount(prev => prev + 40);
  }
  useEffect(() => {
    getSearchHistory();
  }, []);
  const groupedData = historySearch.reduce((acc, item) => {
    const date = new Date(item.created).toDateString();

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(item);

    return acc;
  }, {});

  // Chuyển đổi Map thành mảng để render
  const groupedArray = Object.entries(groupedData).map(([date, items]) => ({
    date,
    items,
  }));
  return (
    <View>
      <Text style={styles.title}>Nhật ký hoạt động</Text>
      {historySearch && (
        <TouchableOpacity style={styles.deleButton} onPress={deleteAllSearch}>
          <Text
            style={{
              fontSize: 20,
              color: 'blue',
            }}>
            Xóa các tìm kiếm
          </Text>
        </TouchableOpacity>
      )}
      <View>
        <FlatList
          data={groupedArray}
          keyExtractor={item => item.date}
          renderItem={({item}) => (
            <View style={styles.groupContainer}>
              <Text style={styles.dateText}>{item.date}</Text>
              <FlatList
                data={item.items}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <View style={styles.searchItem}>
                    <Image
                      source={require('../../assets/images/search.png')}
                      style={styles.iconSearch}
                    />
                    <View>
                      <Text>Bạn đã tìm kiếm trên Facebook</Text>
                      <Text>"{item.keyword}"</Text>
                      <Text>Chỉ mình tôi. Đã ẩn khỏi dòng thời gian</Text>
                    </View>
                    <TouchableOpacity onPress={() => deleteOneSearch(item.id)}>
                      <Ionicons name="close-outline" size={32} color="#333" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}
          onEndReached={handleEndHistorySearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    // backgroundColor: '#bbb',
    fontSize: 22,
    marginTop: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
    height: 40,
    // justifyContent: 'center', // Căn giữa theo chiều dọc
    // alignItems: 'center',
    textAlign: 'center',
  },
  deleButton: {
    // backgroundColor: 'red',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'center',
  },

  groupContainer: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchItem: {
    // backgroundColor: 'blue',
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 1,
    marginTop: 5,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  iconSearch: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 10,
  },
});
