import { useState } from "react";
import { 
    Image, StyleSheet, Text, View, TouchableOpacity, TextInput
}from "react-native";


export default CreatePost = () => {
    const imageUrl = 'https://scr.vn/wp-content/uploads/2020/08/Con-g%C3%A1i-che-m%E1%BA%B7t-1024x1024.jpg';
    const [textTitle, setTextTitle] = useState('');
    const [textDescribed, setTextDescribed] = useState('');
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                 <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />
                <Text style = {styles.text}>
                    Nguyễn Văn An    
                </Text>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.textButton}>POST</Text>
                </TouchableOpacity>                               
            </View>

            <View style = {styles.slider}>
                {/* <Text style = {{fontSize: 15, fontWeight: 500, marginRight: "85%"}}>
                    Title
                </Text> */}
                <TextInput 
                    style = {styles.textInput}
                    multiline={true}
                    numberOfLines={4} // Số dòng mặc định hiển thị (tùy chọn)
                    placeholder="How are you feeling?"
                    placeholderStyle={styles.placeholder}
                    value={textTitle}
                    onChangeText={(inputText) => setTextTitle(inputText)}
                />
                {/* <Text style = {{fontSize: 15, fontWeight: 500, marginRight: "75%"}}>
                    Described
                </Text> */}
                <TextInput 
                    style = {styles.textInputs}
                    multiline={true}
                    numberOfLines={4} 
                    placeholder="What's on your mind?"
                    placeholderStyle={styles.placeholder}
                    value={textDescribed}
                    onChangeText={(inputText) => setTextDescribed(inputText)}
                />               
                    
            </View>

            <View style = {styles.footter}>
                <View style = {styles.footterLeft}>
                    <Image
                        source={require('../../../assets/images/home/album.png')}
                        style={{
                            width: 45,
                            height: 45,
                            margin: 7,
                            marginRight: 80
                        }}
                    />                    
                </View>
                <View style = {styles.footterRight}>
                    <Image
                        source={require('../../../assets/images/home/video.png')}
                        style={{
                            width: 45,
                            height: 45,
                            margin: 7,
                            marginLeft: 80
                        }}
                    />                   
                </View>

            </View>

        </View>        
    )

};

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
    button: {
        width: 60,
        backgroundColor: "#1B74E4",
        padding: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 7,
        marginLeft: "auto",
        marginRight: 10,
    },
    textButton: {
        color: "#fff",
        fontWeight: "600",
        
    },
    slider: {
        flex: 1,
        alignItems: 'center',
    },    
    textInput: {
        width: "95%",
        height: 35,
    },
    placeholder: {
        fontSize: 30, 
        color: 'gray', 
    },
    textInputs: {
        width: "95%",
        // borderWidth: 1
    },
    footter: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ddd",
    },
    footterLeft: {
        borderRightWidth: 1,
        borderRightColor: "#fff",
    },
    footterRight: {

    }

})