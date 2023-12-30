import { router } from "expo-router"
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { logOut } from "../api/post/log_out";
import { useState } from "react";

export default Menu = ({visible, onClose}) => {

    const [warning, setWarning] = useState(false);

    const handleOpenSetting = () => {
        router.push('/setting/settings');
        onClose();
    }

    const handleOpenBlock = () => {
        router.push('/friends/ListBlock');
        onClose();
    }

    const handleLogOut = async() => {
        try {
            await logOut();
            router.push('/auth/login')
            console.log("Log out success")
        } catch (error) {
            console.error(error)
        }
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
                <View style = {{paddingLeft: 20}}>
                    <TouchableOpacity onPress={handleOpenSetting}>
                        <View style = {{flexDirection:"row", padding:5, marginBottom:10, marginTop: 5}}>
                            <Image
                                source={require('../assets/images/home/buy-coins.png')}
                                style = {styles.img}                        
                            />
                            <Text style = {styles.textSetting}>Buy coins</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {{flexDirection:"row", padding:5, marginBottom:10}}>
                            <Image
                                source={require('../assets/images/home/change-password.png')}
                                style = {styles.img}                        
                            />
                            <Text style = {styles.textSetting}>Change Password</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOpenBlock}>
                        <View style = {{flexDirection:"row", padding:5, marginBottom:10}}>
                            <Image
                                source={require('../assets/images/home/block-friend.png')}
                                style = {styles.img}                        
                            />
                            <Text style = {styles.textSetting}>List of blocked profiles</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style = {{flexDirection:"row", padding:5, marginBottom:10}}>
                            <Image
                                source={require('../assets/images/home/disable.png')} 
                                style = {styles.img}                       
                            />
                            <View>
                                <Text style = {styles.textSetting}>Deactivate your account</Text>
                                {warning && 
                                    <View>

                                        <TouchableOpacity>

                                        </TouchableOpacity>                                        
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={handleLogOut}>
                        <View style = {{flexDirection:"row", padding:5, marginBottom:10}}>
                            <Image
                                source={require('../assets/images/home/log-out.png')} 
                                style = {styles.img}                       
                            />
                            <Text style = {styles.textSetting}>Log out</Text>
                        </View>
                    </TouchableOpacity>                    
                </View>

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
      height: "50%",
      marginTop: "auto"
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
        fontSize: 18,
        fontWeight: "500",
        color: "black",
        padding: 5,
        marginLeft: 10,
    },
    img:{
        width:25,
        height:25,
        marginTop: 5,    
    }
})