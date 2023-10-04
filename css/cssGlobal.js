'use strict';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/theme'

export default StyleSheet.create({
    buttonFullPrimary: {
        backgroundColor: COLORS.primary,
        height: 28,
        borderRadius: 12,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    buttonFullPrimaryText: {
        color: COLORS.white,
        textAlign: "center"
    }
});
