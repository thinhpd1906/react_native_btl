import { StyleSheet } from 'react-native';
import { color } from './color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    alignItems: 'center'
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.textColor
  },
  bio: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    marginBottom: 20
  },
  section: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  coverPhoto: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  avatarWrapper: {
    display: 'flex',
    position: 'absolute',
    top: 150,
    borderRadius: 105,
    borderWidth: 5,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: 10,
    // backgroundColor:"red"
  },
  infomation: {
    marginTop: 48
  },
  cameraIconWrapper: {
    position: 'absolute',
    top: 200,
    right: 0
  },
  cameraIcon: {
    padding: 10
  },
  cameraIconAvatar: {
    position: 'relative',
    top: 40,
    left: 70
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black'
  },
  detailsContainer: {
    marginTop: 20,
    marginLeft: 20
  },
  detailLabel: {
    fontSize: 18,
    marginRight: 5,
    marginLeft: 10
  },
  detailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.textColor
  },
  editPublicButton: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#E9F1FE',
    padding: 10,
    borderRadius: 7
  },
  editPublicButtonText: {
    color: color.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  option: {
    paddingVertical: 0
  }
});
export default styles;
