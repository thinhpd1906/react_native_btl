import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"

export default Settings = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const imageUrl = user.avatar;
    return(
        <View style = {styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />
                <View>
                    <Text style = {styles.text}>
                        {user.username}    
                    </Text> 
                    {/* {showState && 
                        <Text style={{marginLeft:8}}>
                            is feelling {status}
                        </Text>
                    }                */}
                </View>
                {/* <TouchableOpacity 
                    style={styles.button}
                    onPress={handeleCreatePost} 
                >
                    <Text style={styles.textButton}>POST</Text>
                </TouchableOpacity>                                */}
            </View>
        </View>        
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 12,
        flexDirection: 'row', 
        alignItems: 'center',
 
    },
    text: {
        color: "#000",
        fontWeight: "600",
        fontSize: 20,
        marginLeft: 5
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10,
    },
})