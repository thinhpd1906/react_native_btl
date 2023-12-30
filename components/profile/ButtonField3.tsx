//react native
import { Alert, Text, TouchableOpacity, View } from 'react-native';
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
// import { ISetAcceptFriend } from 'src/interfaces/friends.interface';
import { setAcceptFriendApi } from '../../api/profile/profile';
import ButtonField1 from './ButtonField1';
import ButtonField0 from './ButtonField0';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { AppNaviagtionName, ProfileNavigationName } from 'src/common/constants/nameScreen';

interface ISetAcceptFriend {
  user_id: string;
  is_accept: string | string[];
}
const ButtonField3 = ({ user_id, username }: { user_id: string; username: string }) => {
  const [status, setStatus] = useState('');

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
  const onPressAccept = async (data: ISetAcceptFriend) => {
    Alert.alert('XÁC NHẬN', `Bạn có muốn chấp nhận lời mời kết bạn của ${username}?`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            let result : any;
            await setAcceptFriendApi(data)
            .then((res : any) => {
              result= res.data
            })
            if (result.code == 1000) {
              setStatus('Accept');
              return result;
            } else if (result.code == 9994) {
              setStatus('Failed');
              Alert.alert(
                'Yêu cầu không hợp lệ',
                'Lời mời kết bạn đã hết hạn. Vui lòng thử lại sau!'
              ),
                setStatus('Failed');
              return result;
            } else {
              setStatus('Failed');
              return console.log({ message: 'sever availability' });
            }
          } catch (error) {
            console.log(error);
            return console.log({ message: 'sever availability' });
          }
        }
      }
    ]);
  };

  const onPressDelete = (data: ISetAcceptFriend) => {
    Alert.alert('XÁC NHẬN', `Bạn có muốn xóa lời mời kết bạn từ ${username}?`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const result = await setAcceptFriendApi(data);
            setStatus('Delete');
            return result;
          } catch (error) {
            return console.log({ message: 'sever availability' });
          }
        }
      }
    ]);
  };
  // const navigation: NavigationProp<AppNavigationType, AppNaviagtionName.ProfileNavigation> =
  //   useNavigation();
  const navigateSettingProfileScreen = () => {console.log("ok")}
    // navigation.navigate(AppNaviagtionName.ProfileNavigation, {
    //   screen: ProfileNavigationName.SettingProfile,
    //   params: { user_id, username }
    // });
  return (
    <View>
      {status === '' ? (
        <View
          style={[
            styles.section,
            { flexDirection: 'row', justifyContent: 'space-between', padding: 20 }
          ]}
        >
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
            onPress={navigateSettingProfileScreen}
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
                    {
                      index === 0
                        ? onPressAccept({ user_id: user_id, is_accept: '1' })
                        : index === 1
                        ? onPressDelete({ user_id: user_id, is_accept: '0' })
                        : null;
                    }
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
      ) : status === 'Accept' ? (
        <ButtonField1 user_id={user_id} username={username} />
      ) : status === 'Delete' || status === 'Failed' ? (
        <ButtonField0 user_id={user_id} username={username} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default ButtonField3;
