import Modal, { ModalProps } from 'react-native-modal';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { color } from '../profile/style/color';
export type BaseModalErrorProps = Partial<Omit<ModalProps, 'children'>> & { title: string };
function BaseModalError(props: BaseModalErrorProps) {
  const { isVisible, onBackdropPress, title, ...remainProps } = props;
  return (
    <Modal
      {...remainProps}
      isVisible={isVisible}
      animationIn='zoomIn'
      animationOut='zoomOut'
      backdropOpacity={0.5}
      animationInTiming={800}
      animationOutTiming={800}
      onBackdropPress={onBackdropPress}
      style={{ justifyContent: 'center', margin: 0 }}
    >
      <View
        style={{
          backgroundColor: color.white,
          paddingHorizontal: 20,
          paddingVertical: 40,
          marginHorizontal: 30,
          borderRadius: 4
        }}
      >
        <Text
          variant='bodyLarge'
          style={{
            color: color.activeOutlineColor,
            fontSize: 18,
            fontWeight: '300',
            textAlign: 'center'
          }}
        >
          {title}
        </Text>
      </View>
    </Modal>
  );
}

export default BaseModalError;
