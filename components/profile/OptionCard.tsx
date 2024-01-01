import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from './style/color';

export interface OptionProp {
  icon: string;
  title: string;
}
const OptionCard = (props: OptionProp) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconCard}>
        <Icon name={props.icon} size={32} color={color.textColor} />
      </View>
      <Text style={styles.textCard}>{props.title}</Text>
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginRight: 20
  },
  textCard: {
    fontWeight: 'bold',
    fontSize: 16
  }
});
