import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { deleteFeel, setFeel } from '../../../api/post/like';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getListPosts } from '../../../api/post/post';

export default SetFeel = ({item, count}) => {
    const dispatch = useDispatch();
    const [typeFeel, setTypeFeel] = useState("-1");  
    const [isFeel, setIsFeel] = useState('-1');
    const [is_felt, setIs_felt] = useState(item.is_felt);
    const [modalVisible, setModalVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [requestData, setRequestData] = useState({      
        in_campaign: "1",
        campaign_id: "1",
        latitude: "1.0",
        longitude: "1.0",
        index: "0",
        count: "20",
    });

    const buttonRef = useRef(null);

    const openModal = () => {
        if (buttonRef.current) {
            buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
                setModalVisible(true);
                setPosition({ top: pageY - 90, left: pageX + 10 });
            });
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleIsFeelLike = () =>{
        setIsFeel("1");
        setTypeFeel('1');
        handleFeel();
        setIs_felt('1');
        closeModal();
    }
    const handleIsFeelSad= () =>{
        setIsFeel("0");
        setTypeFeel('0');
        handleFeel();
        setIs_felt('0');
        closeModal();
    }
    const handleIsFeelFalse = () =>{
        setIsFeel('-1');
        handleDeleteFeel();
        setIs_felt('-1');
        closeModal(); 
    }

    const handleFeel = async() => {
        const feelData = {
            id: item.id,
            type: typeFeel 
            
        }
        console.log(feelData.type);
        if (typeFeel === '1' || typeFeel === '0') {
            try {
                await setFeel(feelData);
                await getListPosts(requestData, dispatch); 

                setTypeFeel('-1');
                console.log("Feel: Successfully");
            } catch (error) {
                console.error('Error setting mark for comment:', error);
            }
        } else {
            console.log('Invalid typeFeel:', typeFeel);
        }
    }

    const handleDeleteFeel = async() => {
        const feelData = {
            id: item.id,
        }
        try {
            await deleteFeel(feelData);
            await getListPosts(requestData, dispatch); 
            
            console.log("delete Feel: Successfully");
        } catch (error) {
          console.error('Error setting mark for comment:', error); 
            
        }
    }

    useEffect(() => {
        // Kiểm tra xem typeFeel có thay đổi không
        if (typeFeel !== '-1') {
            handleFeel();
            setTypeFeel('-1'); // Đặt lại giá trị typeFeel sau khi xử lý
        }
    }, [typeFeel]); 

    return(
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1} // Ngăn chặn sự kiện onPress được chuyển đến các phần tử bên dưới
                    onPress={closeModal}
                >
                <View style={[styles.modalContainer, { top: position.top, left: position.left }]}>
                    <TouchableOpacity onPress={handleIsFeelLike}>
                        <Image
                            source={require('../../../assets/images/home/like-blue1.png')}
                            style = {{height: 30, width: 30, borderRadius:30, padding: 5, margin:5}}
                        />                        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleIsFeelSad}>
                        <Image
                            source={require('../../../assets/images/home/sad.png')}
                            style = {{height: 30, width: 30, borderRadius:30, padding: 5, margin: 5}}
                        />                        
                    </TouchableOpacity>
                </View>
                </TouchableOpacity>
            </Modal>

            {item.is_felt == "1" || isFeel == '1' ? (
                <TouchableOpacity 
                    ref={buttonRef} 
                    style = {{flexDirection: 'row', }} 
                    onPress={handleIsFeelFalse} 
                    onLongPress={openModal}
                > 
                    <Image
                        source={require('../../../assets/images/home/like-blue.png')}
                        style = {{height: 30, width: 30, marginLeft: "20%"}}
                    />
                    <Text style = {{marginTop: 7, marginLeft: 7, color: "#0866FF"}}>
                        Like 
                    </Text>                    
                </TouchableOpacity>  
            ) : item.is_felt == "0" || isFeel == "0" ? (  
                <TouchableOpacity 
                    ref={buttonRef} 
                    style = {{flexDirection: 'row', }} 
                    onPress={handleIsFeelFalse} 
                    onLongPress={openModal}
                > 
                    <Image
                        source={require('../../../assets/images/home/sad.png')}
                        style = {{height: 30, width: 30, marginLeft: "20%"}}
                    />
                    <Text style = {{marginTop: 7, marginLeft: 7, color: "#F7B125"}}>
                        Sad
                    </Text>                    
                </TouchableOpacity> 
            ) : item.is_felt == "-1" || isFeel == "-1" ? (
                <TouchableOpacity 
                    ref={buttonRef} 
                    style = {{flexDirection: 'row',}} 
                    onPress={handleIsFeelLike} 
                    onLongPress={openModal}
                > 
                    <Image
                        source={require('../../../assets/images/home/like.png')}
                        style = {{height: 30, width: 30, marginLeft: "20%",}}
                    />
                    <Text style = {{marginTop: 7, marginLeft: 7, color: "#65676B"}}>
                        Like
                    </Text>                    
                </TouchableOpacity>                
            ):("")}
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        backgroundColor: "#fff",
        flexDirection:"row",
        borderRadius: 10,
        paddingTop: 2,
        height: "auto",
        justifyContent: 'center',
        alignItems: 'center',
        width: "auto",
        zIndex: 10,
    },
    closeModal: {
        height: 10,
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền vùng overlay
        justifyContent: 'center',
        alignItems: 'center',
    },
})