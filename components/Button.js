import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { withTheme } from '../utils/theme/themeProvider';
import { COLORS } from '../constants/theme';




const Button =(props) => {
  const {theme} = props;
  return (
    <TouchableOpacity style={[styles.button,{borderColor:theme.backgroundColor}, { backgroundColor: props.isSelect ? 'yellow' : '#8CC33F' }]} {...props}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};
export default withTheme(Button)
const styles = StyleSheet.create({
  button: {
    // borderColor: {props.isSelect} ? 'yellow' : '#8CC33F',
    borderWidth: 2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 35,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
});