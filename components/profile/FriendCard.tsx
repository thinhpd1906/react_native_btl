import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { getAvatarUri } from './utils/helper';
import { color } from './style/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
export interface FriendProps {
  username: string;
  avatarUrl: string;
  id: string;
}
const screenWidth = Dimensions.get("window").width
const itemWidth = (screenWidth-10*6)/3
const FriendCard = (props: FriendProps) => {
  const routerFriend = () => {
    router.push({
      pathname: `/profile/${props.id}`,
      params: {
        userId: props.id
      }
    })
  }
  
  return (
    <TouchableOpacity onPress={routerFriend} style={styles.card}>
      <Image style={styles.avatar} source={getAvatarUri(props.avatarUrl)} />
      <Text style={styles.username}>{props.username}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: itemWidth,
    height: itemWidth,
    flexDirection: 'column',
    backgroundColor: 'white',
    minWidth: itemWidth,
    minHeight: (itemWidth + 30),
    marginHorizontal: 5,
    marginBottom: 12
  },
  avatar: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: 7,
    marginBottom: 5
  },
  username: {
    fontSize: 16,
    color: color.textColor,
    fontWeight: 'bold',
    marginLeft: 3
  }
});

export default FriendCard;
