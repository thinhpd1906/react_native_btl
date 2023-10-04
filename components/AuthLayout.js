import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { COLORS } from '../constants/theme'; 
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
const AuthLayout = ({ showBackButton = true, ...props }) => {
  const handleImageClick = () => {
    router.back()
  }
  return (
  <View style={styles.container}>
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
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    marginTop: 0,
    paddingHorizontal: 20,
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
    backgroundColor: '#fff',
    // flex: 4,
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
  backButton: {alignSelf: 'center', padding: 5, paddingLeft: 0},
});

export default AuthLayout;