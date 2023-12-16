import { router } from "expo-router"
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default Menu = ({visible, onClose}) => {

    const handleOpenSetting = () => {
        router.push('/setting/settings');
    }

    return(
        <Modal 
            animationType="slide" 
            transparent={true}
            isVisible={visible} 
            onBackdropPress={onClose}
            onRequestClose={onClose}
        >
            <View style={styles.overlay} />
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={onClose}>
                    <View style = {styles.closeModalContainer}>
                        <Image 
                            source={require('../assets/images/home/dash.png')}
                            style={styles.closeModal}
                        />                        
                    </View>

                </TouchableOpacity> 
                <TouchableOpacity onPress={handleOpenSetting}>
                    <Text style = {styles.textSetting}>Setting</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: "#fff",
      borderRadius: 10,
    //   padding: 15,
      paddingTop: 2,
      height: "85%",
      marginTop: "30%"
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    closeModalContainer:{
        justifyContent: "center", 
        alignItems: "center",        
    },
    closeModal: {
        height: 10,
        marginBottom: 10,

    },
    textSetting: {
        fontSize: 20,
        fontWeight: "600",
        color: "black",
        padding: 5,
        marginRight: 20,
    },
})