//react native
import { Text, TouchableOpacity, View } from 'react-native';

//icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import IconF from 'react-native-vector-icons/Fontisto';
import styles from './style/style';
import { color } from './style/color';

const ButtonField2 = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
      <TouchableOpacity
        style={{
          backgroundColor: color.primary,
          padding: 8,
          borderRadius: 5,
          width: '42%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon name='account-clock' color={'white'} size={15} style={{ paddingRight: 5 }} />
        {/* <IconFA6 name='user-clock' color={'white'} size={15} style={{ paddingRight: 5 }} /> */}
        <Text style={styles.buttonText}>Hủy lời mời</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: color.outlineColor,
          padding: 8,
          borderRadius: 5,
          width: '42%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconF name='messenger' color={'black'} size={15} style={{ paddingRight: 5 }} />
        <Text style={[styles.buttonText, { color: color.textColor }]}>Nhắn tin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: color.outlineColor,
          padding: 8,
          borderRadius: 5,
          width: '12%',
          alignItems: 'center'
        }}
      >
        <Icon name='dots-horizontal' size={20}></Icon>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonField2;
