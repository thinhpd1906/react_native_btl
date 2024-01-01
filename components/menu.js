import { router } from "expo-router"
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Deactivate, logOut } from "../api/post/log_out";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            onClose();

            // Xóa token từ AsyncStorage
            await AsyncStorage.removeItem('token');
            // Xóa user thông tin từ AsyncStorage (nếu có)
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('userId');

            router.push('/auth/login');
            // await AsyncStorage.setItem('user', '')
            console.log("Log out success")
        } catch (error) {
            console.error(error)
        }
    }
    const handleDeactivate = async () => {
        try {
            await Deactivate();
            Alert.alert(
                "Success",
                "Account deactivated successfully",
                [{
                    text: 'OK',
                    onPress: () => {
                        try {
                            router.push('/auth/login');
                        } catch (routerError) {
                            console.error('Error navigating to login:', routerError);
                        }
                    },
                }],
            );
            console.log("Deactivate success");
        } catch (error) {
            console.error(error);
        }
    };
    

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
                <View style = {{paddingLeft: 17}}>
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
                    <TouchableOpacity onPress={()=>setWarning(true)}>
                        <View style = {{flexDirection:"row", padding:5, marginBottom:10}}>
                            <Image
                                source={require('../assets/images/home/disable.png')} 
                                style = {styles.img}                       
                            />
                            <View>
                                <Text style = {styles.textSetting}>Deactivate your account</Text>
                                {warning && 
                                    <View>
                                        <Text style = {{color:"red",}}>
                                            Are you sure you want to deactivate your account?
                                        </Text>
                                        <View style ={{flexDirection:"row"}}>
                                            <TouchableOpacity onPress={handleDeactivate}>
                                                <View style = {{backgroundColor:"#56A6E8", marginTop: 5, marginLeft: 20, borderRadius:5}}>
                                                    <Text style = {styles.yes}>
                                                        Yes
                                                    </Text>                                                   
                                                </View>
                                            </TouchableOpacity>    
                                            <TouchableOpacity onPress={()=>setWarning(false)}>
                                                <View style = {{backgroundColor:"#ccc", marginTop: 5, marginLeft: 20, borderRadius:5}}>
                                                    <Text style={styles.no}>No</Text>
                                                </View>
                                            </TouchableOpacity>                                         
                                        </View>
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
    },
    yes:{
        padding: 5,
        paddingLeft: 15,
        paddingRight:15,
        color: "#fff"
    },
    no:{
        padding: 5,
        paddingLeft: 15,
        paddingRight:15
    }
})