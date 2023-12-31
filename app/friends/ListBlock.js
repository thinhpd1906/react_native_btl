import {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getListBlocks, unBlock} from '../../api/block/Block';

const ListBlock = () => {
  const [listBlockData, setListBlockData] = useState([]);
  const [requestData, setRequestData] = useState({
    index: '0',
    count: '10',
  });

  const handleGetListBlock = async () => {
    try {
      const result = await getListBlocks(requestData);
      setListBlockData([, ...result]);
      console.log('sucessfully lấy danh sách block');
    } catch (error) {
      console.log('err: ', error);
    }
  };

  const handleUnBlock = async friendId => {
    try {
      const response = await unBlock({
        user_id: friendId,
      });
      if (response === 'OK') {
        const updateListBlock = listBlockData.filter(
          friend => friend.id !== friendId,
        );
        setListBlockData(updateListBlock);
        console.log(`Đã gỡ block người bạn ID ${friendId}`);
      } else {
        console.log('Lỗi khi gỡ block: ', response);
      }
    } catch (error) {
      console.log('err: ', error);
    }
  };

  useEffect(() => {
    handleGetListBlock();
  }, [requestData]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <View style={styles.block}>
          <Text style={styles.textBlock}>Những người bạn đã block</Text>
        </View>
        <View>
          <ScrollView showsHorizontalScrollIndicator={false}>
            {listBlockData.map((friend, index) => (
              <View key={index} style={styles.friendItem}>
                <Image
                  source={{
                    uri:
                      friend.avatar || 'https://example.com/default-image.jpg',
                  }}
                  style={styles.avatar}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{friend.name}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      key="addButton"
                      style={styles.button}
                      onPress={() => handleUnBlock(friend.id)}>
                      <Text style={styles.buttonText}>Gỡ Block</Text>
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
    backgroundColor: '#fff',
    flex: 1,
  },
  body: {
    paddingHorizontal: 15,
  },
  block: {
    paddingTop: 15,
  },
  textBlock: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
  button: {
    flex: 1,
    backgroundColor: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 13,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListBlock;
