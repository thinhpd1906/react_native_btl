import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAvatarUri } from './utils/helper';
import { color } from './style/color';
import { router } from 'expo-router';

export interface CreatePostCardProps {
  avatar: string;
}

const CreatePostCard = (props: CreatePostCardProps) => {
  return (
    <View style={styles.containerCreatePost}>
      <TouchableOpacity activeOpacity={0.8}>
        <Image source={getAvatarUri(props.avatar)} style={styles.avatar} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/homePage/createPost/createPost")} style={styles.input} activeOpacity={0.7}>
        <Text style={{ color: color.textColor, fontSize: 16 }}>Bạn đang nghĩ gì?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name='image-multiple' size={24} color={color.green}></Icon>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCreatePost: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  input: {
    flex: 1
  },
  iconContainer: {
    marginLeft: 15,
    marginRight: 15
  }
});

export default CreatePostCard;
