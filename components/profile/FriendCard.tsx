import { View, Text, Image, StyleSheet } from 'react-native';
import { getAvatarUri } from './utils/helper';
import { color } from './style/color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { router } from 'expo-router';
export interface FriendProps {
  username: string;
  avatarUrl: string;
  id: string;
}
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
    width: 115,
    height: 115,
    flexDirection: 'column',
    backgroundColor: 'white',
    minWidth: 124,
    minHeight: 170,
    paddingHorizontal: 5,
    marginBottom: 50
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 7,
    marginBottom: 5
  },
  username: {
    fontSize: 16,
    color: color.textColor,
    fontWeight: 'bold',
    marginHorizontal: 3
  }
});

export default FriendCard;
