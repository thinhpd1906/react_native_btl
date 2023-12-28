import { Image, Text, TouchableOpacity, View } from 'react-native'
import { deleteFeel, setFeel } from '../../../api/post/like';
import { useState } from 'react';

export default SetFeel = ({item, count}) => {
    const [typeFeel, setTypeFeel] = useState("1");
    const [isFeel, setIsFeel] = useState(false);
    const [is_felt, setIs_felt] = useState(item.is_felt)

    const handleIsFeelTrue = () =>{
        setIsFeel(true);
        handleFeel();
        setIs_felt('1');
    }

    const handleIsFeelFalse = () =>{
        setIsFeel(false);
        handleDeleteFeel();
        setIs_felt('-1');
    }

    const handleFeel = async() => {
        const feelData = {
            id: item.id,
            type: typeFeel
        }
        try {
            await setFeel(feelData);
            console.log("Feel: Successfully");
        } catch (error) {
          console.error('Error setting mark for comment:', error); 
            
        }
    }

    const handleDeleteFeel = async() => {
        const feelData = {
            id: item.id,
        }
        try {
            await deleteFeel(feelData);
            console.log("delete Feel: Successfully");
        } catch (error) {
          console.error('Error setting mark for comment:', error); 
            
        }
    }

    return(
        <View>
            {item.is_felt == "1" || isFeel == true ? (
                <TouchableOpacity style = {{flexDirection: 'row', }} onPress={handleIsFeelFalse}> 
                    <Image
                        source={require('../../../assets/images/home/like-blue.png')}
                        style = {{height: 30, width: 30, marginLeft: "20%"}}
                    />
                    <Text style = {{marginTop: 7, marginLeft: 7, color: "#0866FF"}}>
                        Like
                    </Text>                    
                </TouchableOpacity> 
            ) : item.is_felt == "0" ? ( 
                <TouchableOpacity style = {{flexDirection: 'row', }} onPress={handleFeel}> 
                    <Image
                        source={require('../../../assets/images/home/sad.png')}
                        style = {{height: 30, width: 30, marginLeft: "20%"}}
                    />
                    <Text style = {{marginTop: 7, marginLeft: 7, color: "#F7B125"}}>
                        Sad
                    </Text>                    
                </TouchableOpacity> 
            ) : item.is_felt == "-1" || isFeel == false ? (
                <TouchableOpacity style = {{flexDirection: 'row',}} onPress={handleIsFeelTrue}> 
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