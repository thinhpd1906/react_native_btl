import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"


export default BuyCoins = ({visible, onClose, item, handleBuyCoins}) => {

    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay} />
            <View style={styles.modalContainer}>
                <View style = {{
                        padding: 10, borderRadius: 35,
                    }}>
                    <Text style = {{fontWeight:"500", fontSize: 20, color:"#333"}}>
                        Payment
                    </Text>
                </View>
                <Text style={{fontSize:15}}>Money: {item.money}</Text>
                <View style = {{flexDirection:"row"}}>
                    <TouchableOpacity onPress={handleBuyCoins}>
                        <Text style = {styles.button}>
                            Yes
                        </Text>                                            
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose}>
                        <Text style = {styles.buttons}>
                            No
                        </Text>                                            
                    </TouchableOpacity>
                </View>
            </View>
        </Modal> 
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#fff',
        height: "21%",
        marginTop: "70%",
        width:"84%",
        alignItems:"center",
        marginLeft:"8%",
        borderRadius: 20,
        borderWidth: 5,
        borderColor:"#ccc"
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    button:{
        padding: 10,
        paddingLeft: 25,
        paddingRight:25,
        backgroundColor:"#339AF0",
        margin: 20,
        borderRadius: 18,
        fontSize: 17,
        fontWeight:"500",
        color:"#fff"
    },
    buttons:{
        padding: 10,
        paddingLeft: 25,
        paddingRight:25,
        backgroundColor:"#ccc",
        margin: 20,
        borderRadius: 18,
        fontSize: 17,
        fontWeight:"500",
        color:"#333"
    },
})