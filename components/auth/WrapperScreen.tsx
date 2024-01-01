import { PropsWithChildren } from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color } from '../profile/style/color';
import { View } from 'react-native';
export type WrapperScreenProps = PropsWithChildren<{
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
  spaceBetween?: boolean;
  linnerGradient?: boolean;
}>;
const defaultProps: WrapperScreenProps = {
  paddingHorizontal: 20,
  paddingBottom: 8,
  spaceBetween: false,
  linnerGradient: false
};
function WrapperScreen(props: WrapperScreenProps): JSX.Element {
  const insets = useSafeAreaInsets();
  return props.linnerGradient ? (
    <LinearGradient
      colors={color.linearBackgroundColor}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View
        style={{
          paddingTop: insets.top + (props.paddingTop ?? 0),
          paddingBottom: insets.bottom + (props.paddingBottom ?? 0),
          paddingLeft: insets.left + (props.paddingHorizontal ?? 0),
          paddingRight: insets.right + (props.paddingHorizontal ?? 0),
          flex: 1,
          justifyContent: props.spaceBetween ? 'space-between' : 'flex-start',
          gap: 10
        }}
      >
        {props.children}
      </View>
    </LinearGradient>
  ) : (
    <View
      style={{
        paddingTop: insets.top + (props.paddingTop ?? 0),
        paddingBottom: insets.bottom + (props.paddingBottom ?? 0),
        paddingLeft: insets.left + (props.paddingHorizontal ?? 0),
        paddingRight: insets.right + (props.paddingHorizontal ?? 0),
        flex: 1,
        justifyContent: props.spaceBetween ? 'space-between' : 'flex-start',
        gap: 10
      }}
    >
      {props.children}
    </View>
  );
}
WrapperScreen.defaultProps = defaultProps;
export default WrapperScreen;
