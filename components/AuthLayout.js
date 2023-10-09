import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { COLORS } from '../constants/theme'; 
import { Link, router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonPrimary } from './ButtonPrimary';
const AuthLayout = ({ showBackButton = true, ...props }) => {
  const handleImageClick = () => {
    router.back()
  }
  const routerBottom = !props.isLogin? '/auth/login': '/auth/signup/'
  return (
  <View style={[styles.container, props.customStyle]}>
    <View style={styles.headerTitle}>
      <View style={{flexDirection: 'row'}}>
        {/* {showBackButton ? (
          <TouchableOpacity onPress={handleImageClick}>
            <Image
                source={require('../assets/images/backArrow/backArrow.png')}
                style={styles.icon}
              />
          </TouchableOpacity>
              
        ) : null} */}
        <Text style={[styles.headerText]}>{props.title}</Text>
      </View>
    </View>
    <View style={styles.content}>{props.children}</View>
    {!props.notHaveBottomNavigation && (
      // <Link href={!props.isLogin? '/auth/login': '/auth/signup/'} style={styles.end}>{!props.isLogin? 'Already have an account?': 'Create new accout'}</Link>
      <ButtonPrimary customStyleText= {{color: COLORS.primary}} onPress = {() => router.push(routerBottom)} style={styles.end} text= {!props.isLogin? 'Already have an account?': 'Create new accout'}/>
    )}
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerTitle: {
    marginTop: 10,
    // paddingHorizontal: 20,
    paddingVertical: 5,
    // flex: 1,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0,
    justifyContent: 'flex-start',
  },
  content: {
    // backgroundColor: '#fff',
    flex: 4,
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
  },
  icon: {
    width: 21,
    height: 18,
    justifyContent: 'flex-start',
    marginRight: 20,
    color: "#000000"
  },
  end: {
    marginBottom: 24,
    alignSelf: 'center'
  },
  backButton: {alignSelf: 'center', padding: 5, paddingLeft: 0},
});

export default AuthLayout;