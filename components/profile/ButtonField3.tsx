//react native
import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

//icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import IconF from 'react-native-vector-icons/Fontisto';

//lib
import styles from './style/style';
import { color } from './style/color';
import Modal from 'react-native-modal';
import OptionCard from './OptionCard';

const ButtonField3 = () => {
  const [modalResponseVisible, setModalResponseVisible] = useState(false);
  const showModalResponse = () => {
    setModalResponseVisible(true);
  };
  const hideModalResponse = () => {
    setModalResponseVisible(false);
  };
  const optionsResponse = [
    {
      icon: 'check',
      title: 'Chấp nhận'
    },
    {
      icon: 'delete-outline',
      title: 'Xóa'
    }
  ];
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
        onPress={showModalResponse}
      >
        <Icon name='account-check' color={'white'} size={15} style={{ paddingRight: 5 }} />
        <Text style={styles.buttonText}>Phản hồi</Text>
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
      <Modal
        isVisible={modalResponseVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={hideModalResponse}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {optionsResponse.map((option, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => {
                console.log(`Selected: ${option.title}`);
                hideModalResponse();
              }}
            >
              <View style={[styles.option, { height: 50 }]}>
                <OptionCard icon={option.icon} title={option.title} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default ButtonField3;
