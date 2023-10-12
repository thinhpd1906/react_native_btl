'use strict';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/theme'

export default StyleSheet.create({
    buttonFullPrimary: {
        backgroundColor: COLORS.primary,
        height: 46,
        borderRadius: 12,
        display:'flex',
        flexDirection:'column',
        // alignItems:'center'
        justifyContent: 'center'
    },
    buttonFullPrimaryText: {
        color: COLORS.white,
        textAlign: "center"
    },
    buttonFullSecondary: {
        backgroundColor: COLORS.white,
        height: 46,
        borderRadius: 12,
        display:'flex',
        flexDirection:'column',
        // alignItems:'center'
        justifyContent: 'center'
    },
    buttonFullSecondaryText: {
        color: COLORS.black,
        textAlign: "center"
    },
    inputHaft: {
        color: '#696969',
        padding: 14,
        paddingLeft: 12,
        borderWidth: 1,
        borderStyle: 'solid',
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        borderRadius: 12,
    },
});
