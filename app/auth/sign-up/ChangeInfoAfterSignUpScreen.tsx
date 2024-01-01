import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ScrollView
} from 'react-native';
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import WraperAuthScreen from '../../../components/auth/WrapperScreen';
import { color } from '../../../components/profile/style/color';
import BaseInputText from '../../../components/auth/BaseInputText';
import BaseForm from '../../../components/auth/BaseForm';
import BaseButton from '../../../components/auth/BaseButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector} from 'react-redux';
// import { IChangeInfoScreen } from 'src/interfaces/profile.interface';
import { changeInfoAfterSignupApi } from '../../../api/profile/profile';
// import { modifyAccountAtivity } from 'src/redux/slices/authSlice';
// import { AccountStatus } from 'src/common/enum/commom';
import * as yup from 'yup';
import { router } from 'expo-router';
import { loginSuccess } from '../../../store/auth';
const nameFormSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required()
});

interface IChangeInfoScreen {
    firstname: string;
    lastname: string;
}
  
const ChangeInfoAfterSignUpScreen: React.FC = () => {
  const methods = useForm({ resolver: yupResolver(nameFormSchema) });
  const { handleSubmit } = methods;
  const signUpInfor = useSelector((state:any) => state.auth.userInforSignIn)

  const [avatarSource, setAvatarSource] = useState('');
  const selectAvatar = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission given');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    const options = {
      mediaType:  MediaTypeOptions.Images,
      quality: 0.4,
      aspect: null, 
      allowsEditing: true,
    };
    let response = await launchImageLibraryAsync(options)
    const srcUri = response && response?.assets ? response?.assets[0]?.uri : avatarSource;
    console.log("src source", srcUri)
    setAvatarSource(srcUri ? srcUri : '');
  };

  const dispatch = useDispatch();

  const onPressNextButton = async (data: IChangeInfoScreen) => {
    try {
      const username = data.firstname + ' ' + data.lastname;
      const formData = new FormData();
      console.log("data", username, avatarSource)
      if (avatarSource !== '') {
        formData.append('avatar', {
          uri: avatarSource,
          type: 'image/png',
          name: 'avatar.jpg'
        } as never);
      }
      formData.append('username', username);
      changeInfoAfterSignupApi(formData)
      .then((res) => {
        console.log("res change infor", res)
        dispatch(loginSuccess(res.data))
        router.push("/homePage/home")
      })
      .catch((err) => {
        console.log("err change infor", err)
      })
    //   if (!res.success) {
    //     return;
    //   }
    // //   dispatch(modifyAccountAtivity(AccountStatus.Active));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WraperAuthScreen spaceBetween linnerGradient>
      <ScrollView>
        <BaseForm methods={methods}>
          <Text
            style={{ fontSize: 24, fontWeight: 'bold', color: color.textColor, paddingBottom: 10 }}
          >
            Thêm ảnh đại diện
          </Text>
          <Text style={{ fontSize: 16, color: color.textColor }}>
            Hãy thêm ảnh đại diện để bạn bè nhận ra bạn. Mọi người có thể nhìn thấy ảnh của bạn.
          </Text>
          <TouchableOpacity onPress={selectAvatar} style={{ alignItems: 'center', paddingTop: 20 }}>
            <View style={styles.avatarContainer}>
              {avatarSource ? (
                <TouchableOpacity style={styles.wrapAvatar} onPress={selectAvatar}>
                  <Image source={{ uri: avatarSource }} style={styles.avatar}></Image>
                </TouchableOpacity>
              ) : (
                <Text>Chọn ảnh đại diện</Text>
              )}
            </View>
          </TouchableOpacity>

          <Text
            style={{ fontSize: 24, fontWeight: 'bold', color: color.textColor, paddingBottom: 10 }}
          >
            Bạn tên gì?
          </Text>
          <Text style={{ fontSize: 16, color: color.textColor }}>
            Nhập tên bạn sử dụng trong đời thực.
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10
            }}
          >
            <BaseInputText mode='outlined' label='Họ' style={{ width: 165 }} name='firstname' />
            <BaseInputText mode='outlined' label='Tên' style={{ width: 165 }} name='lastname' />
          </View>
        </BaseForm>
        <BaseButton style={{ marginTop: 20 }} onPress={handleSubmit(onPressNextButton)}>
          Tiếp
        </BaseButton>
      </ScrollView>
    </WraperAuthScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10
  },
  avatarContainer: {
    width: 225,
    height: 225,
    borderRadius: 125,
    backgroundColor: color.borderBottom,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: color.white,
    borderWidth: 5
  },
  wrapAvatar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 225,
    height: 225,
    borderRadius: 125,
    borderColor: color.white,
    borderWidth: 5
  },
  nameContainer: {
    marginBottom: 20,
    paddingTop: 20,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});

export default ChangeInfoAfterSignUpScreen;
