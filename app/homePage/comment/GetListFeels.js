import { useEffect, useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getListFeels } from "../../../api/post/like";

export default GetListFeels = ({visible, onClose, post_Id}) => {
 
    const [showLike, setShowlike] = useState(false);
    const [showSad, setShowSad] = useState(false);
    const [showFeel, setShowFeel] = useState(true);
    const [data1, setData] = useState([]);
    const [feelData, setFeelData] = useState ({
        id: post_Id,
        index: "0",
        count: "30"
    })

    const dataFeel0 = data1.length > 0 ? data1.filter(item => item.feel.type === "0") : [];
    const dataFeel1 = data1.length > 0 ? data1.filter(item => item.feel.type === "1") : [];

    const handleFell = () =>{
        setShowFeel(true);
        setShowSad(false);
        setShowlike(false)
    }

    const handleLike = () =>{
        setShowFeel(false);
        setShowSad(false);
        setShowlike(true)
    }

    const handleSad = () =>{
        setShowFeel(false);
        setShowSad(true);
        setShowlike(false)
    }

    const handleGetListFeels = async() => {

        try {
            const result = await getListFeels(feelData);
            setData([...data1,...result]);
            // console.log("Success", result);
        } catch (error) {
            console.error('Error get feels:', error);
        }
    }
    
    useEffect(() => {
        handleGetListFeels();
    },[feelData])

    return (
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
                            source={require('../../../assets/images/home/dash.png')}
                            style={styles.closeModal}
                        />                        
                    </View>
                </TouchableOpacity>
                <View style = {styles.headerTotal}>
                    <TouchableOpacity onPress={handleFell}>
                        {showFeel ? (
                            <Text style = {styles.textTotal1}>All</Text> 
                        ): (
                           <Text style = {styles.textTotal}>All</Text> 
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLike}>
                        {showLike ? (
                            <Text style = {styles.textTotal1}>Like</Text>
                        ): (
                           <Text style = {styles.textTotal}>Like</Text> 
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSad}>
                        {showSad ? (
                            <Text style = {styles.textTotal1}>Sad</Text>
                        ): (
                           <Text style = {styles.textTotal}>Sad</Text> 
                        )}
                    </TouchableOpacity>
                </View>
                {showFeel &&
                    <FlatList
                        data={data1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.feelContainer}>
                                <Image
                                    source={{ uri: item.feel.user.avatar || 'https://example.com/default-image.jpg'}}
                                    style={styles.avatar}
                                />
                                <Text style={styles.posterName}>{item.feel.user.name}</Text>
                                {item.feel.type == '0' ? (
                                    <Image
                                        source={require('../../../assets/images/home/sad.png')}
                                        style = {{height: 30, width: 30, marginLeft: "auto"}}
                                    />
                                ):(
                                    <Image
                                        source={require('../../../assets/images/home/like-blue1.png')}
                                        style = {{height: 30, width: 30, marginLeft: "auto", borderRadius: 15}}
                                    />
                                )}
                            </View>
                        )}
                    />                
                }

                {showLike &&
                    <FlatList
                        data={dataFeel1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.feelContainer}>
                                <Image
                                    source={{ uri: item.feel.user.avatar || 'https://example.com/default-image.jpg'}}
                                    style={styles.avatar}
                                />
                                <Text style={styles.posterName}>{item.feel.user.name}</Text>
                                {item.feel.type == '0' ? (
                                    <Image
                                        source={require('../../../assets/images/home/sad.png')}
                                        style = {{height: 30, width: 30, marginLeft: "auto"}}
                                    />
                                ):(
                                    <Image
                                        source={require('../../../assets/images/home/like-blue1.png')}
                                        style = {{height: 30, width: 30, marginLeft: "auto", borderRadius: 15}}
                                    />
                                )}
                            </View>
                        )}
                    />                 
                }

                {showSad &&
                    <FlatList
                        data={dataFeel0}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.feelContainer}>
                                <Image
                                    source={{ uri: item.feel.user.avatar || 'https://example.com/default-image.jpg'}}
                                    style={styles.avatar}
                                />
                                <Text style={styles.posterName}>{item.feel.user.name}</Text>
                                {item.feel.type == '0' ? (
                                    <Image
                                        source={require('../../../assets/images/home/sad.png')}
                                        style = {{height: 30, width: 30, marginLeft: "auto"}}
                                    />
                                ):(
                                    <Image
                                        source={require('../../../assets/images/home/like-blue1.png')}
                                        style = {{height: 30, width: 30, marginLeft: "auto", borderRadius: 15}}
                                    />
                                )}
                            </View>
                        )}
                    />                 
                }

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingTop: 2,
        height: "95%",
        marginTop: "14%"
    },
    feelContainer:{
        flex:1,
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 15,
        marginTop: 10,
        width: "90%",
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10,
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
    posterName: {
        // marginTop: 5,
        fontWeight: "bold",
        fontSize: 17,
        padding: 5
    },
    headerTotal: {
        flexDirection:"row",
        justifyContent: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "#ccc",
        borderTopWidth: 0.5,
        borderTopColor: "#ccc",
    },
    textTotal:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: "bold",
        fontSize: 16,
        color:"#333",
    },
    textTotal1:{
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: "bold",
        fontSize: 16,
        color: "green",
        borderBottomColor: "green",
        borderBottomWidth: 1,
    },
})