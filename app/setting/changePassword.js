import { useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { changePass, logOut } from "../../api/post/log_out"
import { router } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default changePassword = () => {
    const [passOld, setPassOld] = useState('')
    const [passNew, setPassNew] = useState('')

    const handleChangePass = async()=>{
        const data = {
            "password": passOld,
            "new_password": passNew
        }
        try {
            const result =  await changePass(data)
            await AsyncStorage.setItem('token',"Bearer " + result.token);
            Alert.alert(
                "Success",
                "Change Password successfully",
                [{
                    text: 'OK',
                    onPress: () => {
                        try {
                            
                            router.push("/homePage/home")
                        } catch (routerError) {
                            console.error('Error navigating to login:', routerError);
                        }
                    },
                }],
            );
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <View style = {styles.container}>
            <View style = {styles.inputContainers}>
                <Text style = {{fontSize:17, fontWeight:"500"}}>
                    Mật khẩu cũ:
                </Text>
                <TextInput
                    style = {styles.TextInput}
                    multiline = {true}
                    numberOfLines={1}
                    placeholder="Nhập mật khẩu cũ"
                    value={passOld}
                    onChangeText={(inputText) => setPassOld(inputText)}
                />
            </View>

            <View style = {styles.inputContainers}>
                <Text style = {{fontSize:17, fontWeight:"500"}}>
                    Mật khẩu mới:
                </Text>
                <TextInput
                    style = {styles.TextInput}
                    multiline = {true}
                    numberOfLines={1}
                    placeholder="Nhập mật khẩu mới"
                    value={passNew}
                    onChangeText={(inputText) => setPassNew(inputText)}
                />
            </View>

            <TouchableOpacity onPress={handleChangePass}>
                <View style = {styles.button}>
                    <Text style = {{color:"#fff", fontSize:17, fontWeight:"500"}}>
                        Save
                    </Text>
                </View>                
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 40
    },
    TextInput: {
        width: "100%",
        height: "auto",
        marginTop:5,
        borderRadius: 5,
        padding: 10,
        borderWidth: 1.5,
        borderColor:"#ccc"
    },
    TextInputs: {
        width: "100%",
        height: "auto",
        marginTop:5,
        borderRadius: 5,
        padding: 10,
        borderWidth: 1.5,
        borderColor:"#0866FF"
    },
    inputContainers:{
        paddingBottom:20,
    },
    button:{
        backgroundColor:"#0866FF",
        padding:10,
        width:"100%",
        alignItems:"center",
        borderRadius:10
    }
})