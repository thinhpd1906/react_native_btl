import { Video } from "expo-av";
import { 
    Image, StyleSheet, Text, TouchableOpacity, View, Modal
} from "react-native";
import { useState } from "react";
import ThreePicture from "../../../components/ThreePicture";
import TwoPicture from "../../../components/TwoPicture";
import FourPicture from "../../../components/FourPicture";
import FivePicture from "../../../components/FivePicture";

export default PostItem = ({ item }) => {
    const imageUrl = 'https://scr.vn/wp-content/uploads/2020/08/Con-g%C3%A1i-che-m%E1%BA%B7t-1024x1024.jpg';
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };

    return(
    <View style = {styles.postItem}>
        <View style = {{paddingLeft: 10, paddingRight:10}}>
            <View style = {styles.author}>
                <Image
                    style={styles.avatar}
                    source={{ uri: imageUrl }}
                />
                <View>
                    <Text style = {{fontWeight: 600, fontSize: 20}}>
                        {item.name}
                    </Text>
                    <Text style = {{fontSize: 13, color: "#65676B"}}>{item.created}</Text>                      
                </View>                
                <TouchableOpacity 
                    onPress={openModal}
                    style={styles.menu}
                >
                    <Image
                        style={styles.menuImg}
                        source={require('../../../assets/images/menu1.png')}
                    />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.overlay} />
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={closeModal}>
                            <Text style={styles.closeModalText}>Close Modal</Text>
                        </TouchableOpacity>
                        <Text>Edit</Text>
                        <Text>Delete</Text>
                        <Text>Report</Text>
                    </View>
                </Modal>               
            </View>
            
            <Text 
                style = {{
                    fontWeight: 500,
                    fontSize: 16,
                }}>
                {item.described}
            </Text>                
        </View>

        {item.video && item.video.url ? (
        <View>
            <Video
            source={{ uri: item.video.url }}
            rate={1.0}
            volume={0.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: "100%", height: 200 }}
            />            
            <View>
                {item.image.length > 4 ?(
                <FivePicture 
                    selectedImages={item.image.slice(0, 4).map(img => img.url)} 
                    extraImagesCount={item.image.length - 4} 
                />
                ) : item.image.length === 3 ? (
                <ThreePicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 2 ? (
                <TwoPicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 4 ? (
                <FourPicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 1 ? (
                <Image
                    source={{
                    uri: item.image[0].url,
                    }}
                    style={styles.picture}
                />
                ) : (
                ""
                )}
            </View>
        </View>
        ) : (
            <View>
                {item.image.length > 4 ?(
                <FivePicture 
                    selectedImages={item.image.slice(0, 4).map(img => img.url)} 
                    extraImagesCount={item.image.length - 4} 
                />
                ) : item.image.length === 3 ? (
                <ThreePicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 2 ? (
                <TwoPicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 4 ? (
                <FourPicture selectedImages={item.image.map(img => img.url)} />
                ) : item.image.length === 1 ? (
                <Image
                    source={{
                    uri: item.image[0].url,
                    }}
                    style={styles.picture}
                />
                ) : (
                ""
                )}
            </View>

        )}

        <View style = {{
            flexDirection: 'row', 
            alignItems: 'center',
            // justifyContent: 'center',
            padding: 10,
            borderBottomWidth: 0.6,
            borderBottomColor: "#8D949E",
        }}>
            <Text style = {{paddingLeft: 10, color: "#65676B"}}>
                Feel: {item.like}
            </Text>
            <Text style = {{marginLeft: "50%", color: "#65676B"}}>
                {item.comment} comments
            </Text>                
        </View>
        <View style = {{
                flexDirection: 'row',
                padding: 8,
            }}>
            <TouchableOpacity style = {{flexDirection: 'row',}}>
                <Image
                    source={require('../../../assets/images/like.png')}
                    style = {{height: 30, width: 30, marginLeft: "20%",}}
                />
                <Text style = {{marginTop: 7, marginLeft: 7, color: "#65676B"}}>
                    Like
                </Text>                    
            </TouchableOpacity>
            <TouchableOpacity style = {{flexDirection: 'row',}}>
                <Image
                    source={require('../../../assets/images/comment.png')}
                    style = {{height: 30, width: 30, marginLeft: "40%",}}
                />
                <Text style = {{marginTop: 7, marginLeft: 7, color: "#65676B"}}>
                    Comment
                </Text>                    
            </TouchableOpacity>
        </View>

    </View>
    )
};

const styles = StyleSheet.create({
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginRight: 10,
    },
    menu: {
        marginLeft: "auto",
        marginTop: 5,
        marginRight: 10,
    },
    menuImg: {
        width: 25,
        height: 27,        
    },
    postItem: {
        flex:1,
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 8,
        borderBottomColor: '#ddd',
    },
    author: {
        flexDirection: 'row',
        marginBottom: 10
    },
    picture: {
        width: "100%",
        height: 350,
        overflow: "hidden",
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: "20%",
        marginTop: "auto"
    },
    
    closeModalText: {
        color: 'black',
        fontSize: 20,
        marginBottom: 10,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});