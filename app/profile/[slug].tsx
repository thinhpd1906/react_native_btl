import { View, Text, ScrollView, Image, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import styles from '../../components/profile/style/style';
import FriendField from '../../components/profile/FriendField';
import OptionCard from '../../components/profile/OptionCard';
import Modal from 'react-native-modal';
import CreatePostCard from '../../components/profile/CreatePostCard';
import { color } from '../../components/profile/style/color';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RouteProp, useRoute } from '@react-navigation/native';
// import { useAppSelector } from 'src/redux';
// import { selectAuth } from 'src/redux/slices/authSlice';
import { ProfileNavigationName } from '../../components/profile/constants/nameScreen';
import { IUser } from '../../components/profile/interfaces/common.interface';
import { getAvatarUri, getCoverUri } from '../../components/profile/utils/helper';
import { getUserInfoApi, setUserInfor } from '../../api/profile/profile';
import ButtonField0 from '../../components/profile/ButtonField0';
import ButtonField1 from '../../components/profile/ButtonField1';
import ButtonField2 from '../../components/profile/ButtonField2';
import ButtonField3 from '../../components/profile/ButtonField3';
import InforDetail from '../../components/profile/InforDetail';
import { IGetUserFriends, IUserFriends } from '../../components/profile/interfaces/friends.interface';
import { getUserFriendsApi } from '../../api/profile/profile';
import { useDispatch, useSelector } from 'react-redux';
import {router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker';
import { loginSuccess, setAvatar } from '../../store/auth';


function ProfileScreen() {
  const dispatch = useDispatch()
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalCoverVisible, setModalCoverVisible] = useState(false);
  const [profile, setProfile] = useState<IUser | null>(null);
  const [listFriends, setListFriends] = useState<IUserFriends[]>([]);
  const [totalFriend, setTotalFriend] = useState('');
  const [isFocus, setIsFocus] = useState(false)
  // useFocusEffect(() => {
  //   console.log('Hello')
  //   const fetchUserData = async (data: { user_id: string | string[] }) => {
  //     try {
  //       await getUserInfoApi(data)
  //       .then((res: any) => {
  //         console.log("res", res.data)
  //         setProfile(res.data);
  //       })
  //       .catch((err) => {
  //         console.log("err profile api")
  //       })
  //     } catch (error) {
  //       console.log({ message: 'sever availability' });
  //     }
  //   };
  
  // fetchUserData({ user_id }).catch(console.error);
  // const fetchData = async (data: IGetUserFriends) => {
  //   try {
  //     const result = await getUserFriendsApi(data);
  //     setTotalFriend(result.data.total);
  //     setListFriends(result.data.friends);
  //     return result;
  //   } catch (error) {
  //      console.log({ message: 'sever availability' });
  //   }
  // };

  // fetchData({
  //   index: 0,
  //   count: 6,
  //   user_id: !user_id ? '' : user_id
  // }).catch(console.error);
  // })

  // listen for isFocused, if useFocused changes 
  // call the function that you use to mount the component.
  useFocusEffect(()=> {
    setIsFocus(true)
  }, )
  // useEffect(() => {
  //   console.log("hello")
  // }, [isFocus])

  const auth = useSelector((state: any) => state.auth.userInfor)
  // const user_id = route.params.user_id;
  const params = useLocalSearchParams();
  const user_id: string | string[] = params.userId;
  const isOwnProfile = auth?.userId === user_id;
  // const test = useCallback(() => {
  //   console.log("test fun")
  //   const fetchUserData = async (data: { user_id: string | string[] }) => {
  //     try {
  //       await getUserInfoApi(data)
  //       .then((res: any) => {
  //         setProfile(res.data);
  //       })
  //       .catch((err) => {
  //         console.log("err profile api")
  //       })
  //     } catch (error) {
  //       console.log({ message: 'sever availability' });
  //     }
  //   };
  
  // fetchUserData({ user_id }).catch(console.error);
  // const fetchData = async (data: IGetUserFriends) => {
  //   try {
  //     const result = await getUserFriendsApi(data);
  //     setTotalFriend(result.data.total);
  //     setListFriends(result.data.friends);
  //     return result;
  //   } catch (error) {
  //      console.log({ message: 'sever availability' });
  //   }
  // };

  // fetchData({
  //   index: 0,
  //   count: 6,
  //   user_id: !user_id ? '' : user_id
  // }).catch(console.error);
  // }, [])
  useEffect(() => {
    // if (isOwnProfile) {
    //   setProfile(auth.user);
    // } else {
      const fetchUserData = async (data: { user_id: string | string[] }) => {
        try {
          await getUserInfoApi(data)
          .then((res: any) => {
            setProfile(res.data);
            dispatch(setAvatar(res.data));
          })
          .catch((err) => {
            console.log("err profile api")
          })
        } catch (error) {
          console.log({ message: 'sever availability' });
        }
      };
    
    fetchUserData({ user_id }).catch(console.error);
    const fetchData = async (data: IGetUserFriends) => {
      try {
        const result = await getUserFriendsApi(data);
        setTotalFriend(result.data.total);
        setListFriends(result.data.friends);
        return result;
      } catch (error) {
         console.log({ message: 'sever availability' });
      }
    };

    fetchData({
      index: 0,
      count: 6,
      user_id: !user_id ? '' : user_id
    }).catch(console.error);
  }, [isFocus]);
  const isFriend = profile?.is_friend;

  const navigateEditProfileScreen = () => {
    router.push({
      pathname: '/profile/EditProfile',
      params: {
        userId: user_id
      }
    });
    setIsFocus(false)
  }

  /*
   * isFirend =
   * *0: chưa gửi/nhận lời mời kết bạn với tài khoản này
   * *1: là bạn bè với tài khoản này
   * *2: đang gửi lời mời kết bạn với tài khoản này
   * *3: đang nhận lời mời kết bạn với tài khoản này
   */

  const showModalAvatar = () => {
    setModalAvatarVisible(true);
  };
  const hideModalAvatar = () => {
    setModalAvatarVisible(false);
  };
  const showModalCover = () => {
    setModalCoverVisible(true);
  };
  const hideModalCover = () => {
    setModalCoverVisible(false);
  };

  const optionsAvatar = [
    {
      icon: 'account-circle',
      title: 'Xem ảnh đại diện'
    },
    {
      icon: 'photo-library',
      title: 'Chọn ảnh đại diện'
    }
  ];
  const optionsCover = [
    {
      icon: 'account-circle',
      title: 'Xem ảnh bìa'
    },
    {
      icon: 'photo-library',
      title: 'Chọn ảnh bìa'
    }
  ];
  const selectAvatar = async (imageType: string) => {
    // if (Platform.OS === 'android') {
    //   try {
    //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
    //       title: 'App Camera Permission',
    //       message: 'App needs access to your camera ',
    //       buttonNeutral: 'Ask Me Later',
    //       buttonNegative: 'Cancel',
    //       buttonPositive: 'OK'
    //     });
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log('Camera permission given');
    //     } else {
    //       console.log('Camera permission denied');
    //     }
    //   } catch (err) {
    //     console.warn(err);
    //   }
    // }
    const options = {
      mediaType: MediaTypeOptions.Images,
      // includeBase64: true,
      quality: 0.4,
      aspect: null, 
      allowsEditing: true,
      // maxWidth: 800,
      // maxHeight: 800
    };
    // try {
    //   console.log("test chose")
    //   const result = await launchImageLibraryAsync({
    //     mediaTypes: MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: null, 
    //     quality: 1,
    //   });
    //   console.log("test", result)

    //   // if (!result.canceled) {
    //   //     console.log("videoData" ,result.assets[0])
    //   //     setImage([]);
    //   //     setVideo(result.assets[0]);  
    //   // }
    // } catch (error) {
    //   console.error('Error choosing video:', error);
    // }
    let response = await launchImageLibraryAsync(options)
    const srcUri = response && response?.assets ? response?.assets[0]?.uri : profile.avatar;
    let newProfile;
    if(imageType == "avatar") {
      let avatar = srcUri? srcUri: profile.avatar
       newProfile = {
        ...profile,
        avatar
      }
      setProfile(newProfile)
      hideModalAvatar()
    } else if (imageType == "cover") {
      let cover_image = srcUri? srcUri: profile.cover_image
       newProfile = {
        ...profile,
        cover_image
      }
      setProfile(newProfile)
      hideModalCover()     
    }
    const formData = new FormData();
    if(newProfile.username){
      formData.append('username', newProfile.username);
    }
    if(newProfile.avatar){
      formData.append('avatar' , {
        uri: newProfile.avatar,
        type: 'image/png',
        name: 'avatar'
      } as never);      
    }
    if(newProfile.address){
      formData.append('address', newProfile.address);
    }
    if(newProfile.city){
      formData.append('city', newProfile.city);
    }
    if(newProfile.country){
      formData.append('country', newProfile.country);
    }
    if(newProfile.cover_image){
      formData.append('cover_image', {
        uri: newProfile.cover_image,
        type: 'image/png',
        name: 'cover'
      } as never);      
    }
    if(newProfile.link){
      formData.append('link', newProfile.link);
    }
    
    await setUserInfor(formData)
      .then((res) => {
        console.log("set image profile")
        console.log("res change image", res)
        dispatch(loginSuccess(res.data))
      })
      .catch((err) => {
        console.log("err set image profile", err.message)
      })

    
  };

  const totalHeight = 2 * 25;
  return (
    <ScrollView style={styles.container}>
      {/* <HeaderWithSearch title={profile?.username as string} titleIsCenter={true} /> */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.coverPhoto} onPress={showModalCover} activeOpacity={0.8}>
          <Image style={styles.coverPhoto} source={getCoverUri(profile?.cover_image as string)} />
        </TouchableOpacity>
        {isOwnProfile && <View style={styles.cameraIconWrapper}>
          <TouchableOpacity style={styles.cameraIcon} onPress={showModalCover} activeOpacity={0.8}>
            <IconButton
              icon='camera'
              mode='contained'
              iconColor='black'
              containerColor='#E6E6EF'
              size={28}
              onPress={showModalCover}
            />
          </TouchableOpacity>
        </View>}
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={showModalAvatar}
          activeOpacity={0.8}
        >
          <Image style={styles.avatar} source={getAvatarUri(profile?.avatar as string)} />
        </TouchableOpacity>
        {isOwnProfile && <TouchableOpacity
          style={styles.cameraIconAvatar}
          onPress={showModalAvatar}
          activeOpacity={0.8}
        >
          <IconButton
            icon='camera'
            mode='contained'
            iconColor={color.textColor}
            containerColor='#E6E6EF'
            size={32}
            onPress={showModalAvatar}
          />
        </TouchableOpacity>}
        <View style={[styles.infomation, !isOwnProfile && {marginTop: 104}]}>
          <Text style={styles.name}>{profile?.username}</Text>
          {profile?.description !== '' ? (
            <Text style={styles.bio}>{profile?.description}</Text>
          ) : (
            <></>
          )}
        </View>
      </View>
      {/* Button Field */}
      {isOwnProfile ? (
        <View style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={navigateEditProfileScreen}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      ) : !isOwnProfile && isFriend === '0' ? (
        <ButtonField0 user_id= {user_id} username={profile.username}/>
      ) : !isOwnProfile && isFriend === '1' ? (
        <ButtonField1 user_id= {user_id} username={profile.username}/>
      ) : !isOwnProfile && isFriend === '2' ? (
        <ButtonField2 user_id= {user_id} username={profile.username}/>
      ) : !isOwnProfile && isFriend === '3' ? (
        <ButtonField3 user_id= {user_id} username={profile.username}/>
      ) : null}
      {/* Infor Detail */}
      <InforDetail address={profile?.address} city={profile?.city} isOwnProfile={isOwnProfile} id={user_id} />
      {/* Friend Field */}
      <View style={styles.section}>
        <FriendField
          friends={listFriends}
          totalFriend={totalFriend}
          isOwnProfile={isOwnProfile}
        ></FriendField>
      </View>
      {/* Post Field */}
      {isOwnProfile && 
      <View style={styles.section}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginLeft: 20 }}>
        Bài viết
      </Text>
      <CreatePostCard avatar={profile?.avatar as string} />
    </View>}
      <Modal
        isVisible={modalAvatarVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={hideModalAvatar}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {/* {optionsAvatar.map((option, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => console.log(`Selected: ${option.title}`)}
            >
              <View style={[styles.option, { height: totalHeight }]}>
                <OptionCard icon={option.icon} title={option.title} />
              </View>
            </TouchableOpacity>
          ))} */}
          <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                hideModalAvatar()
                router.push({
                  pathname: "/profile/ViewImage",
                  params: {url: profile.avatar}
                })
              }}
            >
              <View style={[styles.option, { height: totalHeight }]}>
                <OptionCard icon={optionsAvatar[0].icon} title={optionsAvatar[0].title} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => selectAvatar("avatar")}
            >
              <View style={[styles.option, { height: totalHeight }]}>
                <OptionCard icon={optionsAvatar[1].icon} title={optionsAvatar[1].title} />
              </View>
            </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        isVisible={modalCoverVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={hideModalCover}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                hideModalCover()
                router.push({
                  pathname: "/profile/ViewImage",
                  params: {url: profile.cover_image}
                })
              }}
            >
              <View style={[styles.option, { height: totalHeight }]}>
                <OptionCard icon={optionsCover[0].icon} title={optionsCover[0].title} />
              </View>
            </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
          <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => selectAvatar("cover")}
            >
              <View style={[styles.option, { height: totalHeight }]}>
                <OptionCard icon={optionsCover[1].icon} title={optionsCover[1].title} />
              </View>
            </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default ProfileScreen;