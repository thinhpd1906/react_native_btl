import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import { color } from '../../components/profile/style/color';
import { getAvatarUri, getCoverUri } from '../../components/profile/utils/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUserInfoApi, setUserInfor } from '../../api/profile/profile';
import { useSelector } from 'react-redux';
import { IUser } from '../../components/profile/interfaces/common.interface';
import { useLocalSearchParams } from 'expo-router';

interface auth {
  user: IUser
}
function EditProfile() {
  const [avatar, setAvatar] = useState('https://placekitten.com/200/200');
  const [cover, setCover] = useState('https://placekitten.com/350/200');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [link, setLink] = useState('');

  const [auth, setAuth] = useState<auth>({
    user: {
      id: "",
      username: "",
      avatar: "",
      active: "",
      coin: "",
      email: "",
      description: "",
      cover_image: "",
      link: "",
      address: "",
      city: "",
      country: "",
      listing: "",
      is_friend: "",
      online: "",
      created: new Date(),
    }
  })
  const params = useLocalSearchParams();
  const user_id: string | string[] = params.userId;
  const own_id = useSelector((state: any) => state.auth.userInfor.userId)
  const isOwn = (own_id === user_id)
  const changeProfile = (formData) => {
    setUserInfor(formData)
    .then((res) => {
      // console.log("set image profile")
    })
    .catch((err) => {
      console.log("err set image profile")
    })
  }
  useEffect(() => {
    const fetchUserData = async (data: { user_id: string | string[] }) => {
      try {
        await getUserInfoApi(data)
        .then((res: any) => {
          console.log("res", res.data)
          setAuth({user: res.data});
          setAvatar(res.data.avatar)
          setCover(res.data.cover_image)
          setUsername(res.data.username)
          setDescription(res.data.description)
          setAddress(res.data.address)
          setCity(res.data.city)
          setCountry(res.data.country)
          setLink(res.data.link)
        })
        .catch((err) => {
          console.log("err profile api")
        })
      } catch (error) {
        console.log({ message: 'sever availability' });
      }
    };
  
  fetchUserData({ user_id }).catch(console.error);
  }, [])
  useEffect(() => {
    setAvatar(auth.user?.avatar as string);
    setCover(auth.user?.cover_image as string);
    setUsername(auth.user?.username as string);
    setDescription(auth.user?.description as string);
    setAddress(auth.user?.address as string);
    setCity(auth.user?.city as string);
    setCountry(auth.user?.country as string);
    setLink(auth.user?.link as string);
  }, []);

  const openImagePickerAvatar = async () => {
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
      mediaType: 'photo' as MediaTypeOptions,
      includeBase64: true,
      quality: 0.4,
      maxWidth: 800,
      maxHeight: 800
    };
    let response = await launchImageLibraryAsync(options)
    const src = response && response?.assets ? response?.assets[0]?.uri : avatar;
    setAvatar(src ? src : '');
    confirmChangeAvatar(src as string);
  };
  const openImagePickerCover = async () => {
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
      mediaType: 'photo' as MediaTypeOptions,
      includeBase64: true,
      quality: 0.4,
      maxWidth: 800,
      maxHeight: 800
    };
    let response = await launchImageLibraryAsync(options)
    const src = response && response?.assets ? response?.assets[0]?.uri : cover;
      setCover(src ? src : '');
      confirmChangeCover(src as string);
  };


  const confirmChangeAvatar = (src: string) =>
    Alert.alert('Xác nhận', 'Bạn có muốn thay đổi ảnh đại diện?', [
      {
        text: 'Hủy',
        onPress: () => setAvatar(auth.user?.avatar as string),
        style: 'cancel'
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          console.log('ok');
          onChangeAvatar(src);
        }
      }
    ]);
  const confirmChangeCover = (src: string) =>
    Alert.alert('Xác nhận', 'Bạn có muốn thay đổi ảnh bìa?', [
      {
        text: 'Hủy',
        onPress: () => setCover(auth.user?.cover_image as string),
        style: 'cancel'
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          console.log('ok');
          onChangeCover(src);
        }
      }
    ]);
  const confirmChangeDescription = (description: string) =>
    Alert.alert('Xác nhận', 'Bạn có muốn thay đổi mô tả bản thân?', [
      {
        text: 'Hủy',
        onPress: () => setDescription(auth.user?.description as string),
        style: 'cancel'
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          console.log('ok');
          onChangeDescription(description);
        }
      }
    ]);
  const confirmChangeInfoDetail = () =>
    Alert.alert('Xác nhận', 'Bạn có muốn thay đổi mô tả bản thân?', [
      {
        text: 'Hủy',
        onPress: () => {
          setAddress(auth.user?.address as string);
          setCity(auth.user?.city as string);
          setCountry(auth.user?.country as string);
        },
        style: 'cancel'
      },
      {
        text: 'Đồng ý',
        onPress: () => {
          console.log('ok');
          onChangeInfoDetail();
        }
      }
    ]);
  const onChangeAvatar = (avatar: string) => {
    const formData = new FormData();
    if (avatar !== '') {
      formData.append('avatar', {
        uri: avatar,
        type: 'image/png',
        name: 'avatar.jpg'
      } as never);
    }
    formData.append('cover_image', auth.user?.cover_image as string);
    formData.append('username', username as string);
    formData.append('description', auth.user?.description as string);
    formData.append('address', auth.user?.address as string);
    formData.append('city', auth.user?.city as string);
    formData.append('country', auth.user?.country as string);
    formData.append('link', auth.user?.link as string);
    changeProfile(formData)
  };
  const onChangeCover = (cover: string) => {
    const formData = new FormData();
    formData.append('avatar', auth.user?.avatar as string);
    if (cover !== '') {
      formData.append('cover_image', {
        uri: cover,
        type: 'image/png',
        name: 'cover.jpg'
      } as never);
    }
    formData.append('username', username as string);
    formData.append('description', auth.user?.description as string);
    formData.append('address', auth.user?.address as string);
    formData.append('city', auth.user?.city as string);
    formData.append('country', auth.user?.country as string);
    formData.append('link', auth.user?.link as string);
    changeProfile(formData)
  };

  const onChangeDescription = (description: string) => {
    const formData = new FormData();
    formData.append('avatar', auth.user?.avatar as string);
    formData.append('cover_image', auth.user?.cover_image as string);
    formData.append('username', username as string);
    formData.append('description', description);
    formData.append('address', auth.user?.address as string);
    formData.append('city', auth.user?.city as string);
    formData.append('country', auth.user?.country as string);
    formData.append('link', auth.user?.link as string);
    changeProfile(formData)
  };
  const onChangeInfoDetail = () => {
    const formData = new FormData();
    formData.append('avatar', auth.user?.avatar as string);
    formData.append('cover_image', auth.user?.cover_image as string);
    formData.append('username', username as string);
    formData.append('description', auth.user?.description as string);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('country', country);
    formData.append('link', auth.user?.link as string);
    changeProfile(formData)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapTexta}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>
          Ảnh đại diện
        </Text>
        <TouchableOpacity
          onPress={() => {
            isOwn && openImagePickerAvatar();
          }}
        >
          {isOwn && <Text style={{ fontSize: 18, color: color.primary }}>Chỉnh sửa</Text>}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.wrapAvatar}>
        <Image source={getAvatarUri(avatar)} style={styles.avatar}></Image>
      </TouchableOpacity>
      <View style={styles.wrapText}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>Ảnh bìa</Text>
        <TouchableOpacity
          onPress={() => {
            isOwn && openImagePickerCover();
          }}
        >
          {isOwn && <Text style={{ fontSize: 18, color: color.primary }}>Chỉnh sửa</Text> }
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.wrapAvatar} activeOpacity={0.8}>
        <Image source={getCoverUri(cover)} style={styles.cover}></Image>
      </TouchableOpacity>
      <View style={styles.wrapText}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>Tiểu sử</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            isOwn && confirmChangeDescription(description);
          }}
        >
          {isOwn && <Text style={{ fontSize: 18, color: color.primary }}>Thêm</Text> }
        </TouchableOpacity>
      </View>
      <View style={styles.wrapAvatar}>
        <TextInput
          style={{ fontSize: 18 }}
          placeholder={isOwn? "Mô tả bản thân": ""}
          onChangeText={text => {
            setDescription(text);
          }}
          editable = {isOwn}
          defaultValue={description}
        ></TextInput>
      </View>
      <View style={styles.wrapText}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>
          Thông tin chi tiết
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            isOwn && confirmChangeInfoDetail();
          }}
        >
          {isOwn && <Text style={{ fontSize: 18, color: color.primary }}>Thêm</Text> }
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <View style={{ alignItems: 'center', flex: 1, maxWidth: 20 }}>
            <Icon name='home' size={20} color='black' />
          </View>
          <Text style={styles.detailLabel}>Sống tại</Text>
          <TextInput
            style={styles.detailText}
            placeholder={'Địa chỉ'}
            onChangeText={text => {
              setAddress(text);
            }}
            editable = {isOwn}
            defaultValue={address}
          ></TextInput>
        </View>
        <View style={styles.detailRow}>
          <View style={{ alignItems: 'center', flex: 1, maxWidth: 20 }}>
            <Icon name='map-marker' size={20} color='black' />
          </View>
          <Text style={styles.detailLabel}>Đến từ</Text>
          <TextInput
            style={styles.detailText}
            placeholder={'Thành phố'}
            onChangeText={text => setCity(text)}
            defaultValue={city}
            editable = {isOwn}
          ></TextInput>
        </View>
        <View style={styles.detailRow}>
          <View style={{ alignItems: 'center', flex: 1, maxWidth: 20 }}>
            <Icon name='flag' size={20} color='black' />
          </View>
          <Text style={styles.detailLabel}>Quốc gia</Text>
          <TextInput
            style={styles.detailText}
            placeholder={'Quốc gia'}
            onChangeText={text => setCountry(text)}
            defaultValue={country}
            editable = {isOwn}
          ></TextInput>
        </View>
      </View>
      <View style={styles.wrapText}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>Liên kết</Text>
        {isOwn && <TouchableOpacity activeOpacity={0.8}>
          <Text style={{ fontSize: 18, color: color.primary }}>Thêm</Text>
        </TouchableOpacity> }
      </View>
      <View style={styles.wrapAvatar}>
        <TextInput
          style={{ fontSize: 18 }}
          placeholder={isOwn?'Thêm liên kết': ""}
          onChangeText={text => setLink(text)}
          value={link}
          defaultValue={link}
        ></TextInput>
      </View>
      <View style={{ height: 200 }}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 50,
    backgroundColor: color.white
  },
  detailsContainer: {
    marginLeft: 20
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailLabel: {
    fontSize: 18,
    marginRight: 5,
    marginLeft: 10
  },
  detailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.textColor,
    width: '50%'
  },
  wrapTexta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  wrapText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 10
  },
  wrapAvatar: {
    alignItems: 'center',
    marginTop: 20
  },
  cover: {
    height: 200,
    width: '100%',
    borderRadius: 10
  }
});

export default EditProfile;
