import { useLocalSearchParams } from "expo-router";
import { Image, View } from "react-native"


const ViewImage = () => {
    const params = useLocalSearchParams();
    const url = params.url;
    return (
        <View  style= {{flex: 1, backgroundColor: "black", justifyContent: "center", alignItems: "center"}}>
            <Image style={{resizeMode: "contain", flex: 1, height: "100%", width: "100%"}} source={{
                uri: url
            }}/>
        </View>
    )
}
export default ViewImage