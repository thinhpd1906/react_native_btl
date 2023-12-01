import { router } from "expo-router";
import { 
    FlatList, Image, StyleSheet, Text, TouchableOpacity, View 
} from "react-native"
import PostItem from "./getPost/PostItem";

export default home = () => {
    const ListPost = [
        {
            name : "Minh Nguyễn",
            imageAvatar: "https://scr.vn/wp-content/uploads/2020/08/Con-g%C3%A1i-che-m%E1%BA%B7t-1024x1024.jpg",
            created: "2023-11-21T04:58:10.288Z",
            title: "Đa nền tảng",
            described: "This is text\nThis is https://chat.zalo.me\nThis is 😀 😞 🙂\nThis is #hashtag\n",
            image: [
                {
                    "id": "1",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
                {
                    "id": "2",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
                {
                    "id": "3",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
            ],
            video: {
                // "url": "https://it4788.catan.io.vn/files/video-1701153345274-798896164.mp4"
            },
            like: "2",
            comment: "500",         
        },
        {
            name : "Minh Phạm",
            imageAvatar: "https://scr.vn/wp-content/uploads/2020/08/Con-g%C3%A1i-che-m%E1%BA%B7t-1024x1024.jpg",
            created: "2023-11-21T04:58:10.288Z",
            title: "Đa nền tảng",
            described: "This is text\nThis is https://chat.zalo.me\nThis is 😀 😞 🙂\nThis is #hashtag\n",
            image: [
                {
                    "id": "1",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
                {
                    "id": "2",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
                {
                    "id": "3",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
                {
                    "id": "4",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
                {
                    "id": "5",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                }
            ],
            video: {
                // "url": "https://it4788.catan.io.vn/files/video-1701153345274-798896164.mp4"
            },
            like: "2",
            comment: "5",         
        },
        {
            name : "Minh Ngô Văn",
            imageAvatar: "https://scr.vn/wp-content/uploads/2020/08/Con-g%C3%A1i-che-m%E1%BA%B7t-1024x1024.jpg",
            created: "2023-11-21T04:58:10.288Z",
            title: "Đa nền tảng",
            described: "This is text\nThis is https://chat.zalo.me\nThis is 😀 😞 🙂\nThis is #hashtag\n",
            image: [
                {
                    "id": "1",
                    "url": "https://it4788.catan.io.vn/files/image-1700721206218-638107588.jpg"
                },
            ],
            video: {
                // "url": "https://it4788.catan.io.vn/files/video-1701153345274-798896164.mp4"
            },
            like: "2",
            comment: "5",         
        },
        {
            name : "Minh Nguyễn",
            imageAvatar: "https://scr.vn/wp-content/uploads/2020/08/Con-g%C3%A1i-che-m%E1%BA%B7t-1024x1024.jpg",
            created: "2023-11-21T04:58:10.288Z",
            title: "Đa nền tảng",
            described: "This is text\nThis is https://chat.zalo.me\nThis is 😀 😞 🙂\nThis is #hashtag\n",
            image: [
                {
                    "id": "1",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
                {
                    "id": "2",
                    "url": "https://recmiennam.com/wp-content/uploads/2018/01/hinh-nen-sieu-xe-dep-12.jpg"
                },
            ],
            video: {
                // "url": "https://it4788.catan.io.vn/files/video-1701153345274-798896164.mp4"
            },
            like: "2",
            comment: "500",         
        },
    ]

    const imageUrl = 'https://scr.vn/wp-content/uploads/2020/08/Con-g%C3%A1i-che-m%E1%BA%B7t-1024x1024.jpg';
    
    const handlePress = () => {
        router.push('/homePage/createPost/createPost')
        
    };

    return (  
        <View style={styles.container}>
            <View style = {styles.header}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.avatar}
                />
                <TouchableOpacity onPress={handlePress} style={styles.button}>
                    <Text style={styles.buttonText}>What's on your mind?</Text>
                </TouchableOpacity>
                <Image
                    source={require('../../assets/images/album.png')}
                    style={{
                        width: 36,
                        height: 36,
                    }}
                />         
            </View>

            <View style = {styles.content}>
                <FlatList
                    data={ListPost}
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={({ item }) => <PostItem item={item} />}
                />  
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    header: {
        padding: 12,
        flexDirection: 'row', 
        alignItems: 'center',
        borderBottomWidth: 8,
        borderBottomColor: '#ddd',
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 50,
      marginRight: 10,
    },
    button: {
        marginRight: 12,
        width: "70%",
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        borderColor: '#ddd', 
        borderWidth: 1,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 10,
    },
    content: {
        flex: 1,
    },
  });
 
