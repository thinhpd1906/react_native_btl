import { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { useSelector } from "react-redux"
import BuyCoins from "./buyCoins";
import { buyCoins } from "../../api/post/log_out"

export default Settings = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const [showBuy, setShowBuy] = useState(false);
    const [showItem, setShowItem] = useState({});
    const [coins, setCoins] = useState('');

    const fake = [
        {
            id:'1',
            coins:"500",
            money:"100.000 VND"
        },
        {
            id:'2',
            coins:"1000",
            money:"200.000 VND"
        },
        {
            id:'3',
            coins:"2000",
            money:"395.000 VND"
        },
        {
            id:'4',
            coins:"5000",
            money:"950.000 VND"
        },
    ]

    const [userDataLoaded, setUserDataLoaded] = useState(true);


    const handleBuyCoins = async() => {
        const req = {
            code: "12345",
            coins: showItem.coins
        }
        try {
            const result = await buyCoins(req);
            setCoins(result.coins);
            setShowBuy(false);
            console.log("buy success");
        } catch (error) {
            console.error(error)
        }
    }

    const handleShowBuy =(item) =>{
        setShowBuy(true);
        setShowItem(item)
        setCoins('');
    }

    const closeModal = ()=>{
        setShowBuy(false);
    }

    return(
        <View style = {styles.container}>
            {userDataLoaded && 
                <View style={styles.header}>
                    <Image
                        source={{ uri: user.avatar }}
                        style={styles.image}
                    />
                    <View>
                        <Text style = {styles.text}>
                            {user.username}    
                        </Text> 
                    </View>
                    <View style = {styles.coins}>
                        <Image
                            source={require('../../assets/images/home/coins.png')}
                            style = {{width:30, height:30}}
                        />
                        {coins ? (
                        <Text style ={{margin:5, color:"#FF8F6B", fontWeight:"bold", fontSize: 17}}>
                            {coins} coins
                        </Text>
                        ):(
                        <Text style ={{margin:5, color:"#FF8F6B", fontWeight:"bold", fontSize: 17}}>
                            {user.coins} coins
                        </Text>                        
                        )}

                    </View>                             
                </View>            
            }

            <View style = {{padding:10, marginLeft:5}}>
                {fake.map((item) => {
                    return(
                        <View key={item.id}>
                            <TouchableOpacity  onPress = {()=>handleShowBuy(item)}>
                                <View  style = {styles.borderBuyCoins} >
                                    <View style = {{flexDirection:"row"}}>
                                        <Image
                                            source={require('../../assets/images/home/coins.png')}
                                            style = {{width:30, height:30}}
                                        />
                                        <Text style ={{padding:5, fontSize:16, fontWeight:"bold"}}>
                                            X{item.coins} coins
                                        </Text>                                
                                    </View>
                                    <View style={{
                                        // backgroundColor:"red", 
                                        alignItems:"center", 
                                        flexDirection:"row", 
                                        padding:5,
                                        borderRadius:7,
                                        // paddingLeft:50,
                                        }}>
                                        <Text style={{marginRight:20, color:"#333", fontWeight:"bold", fontSize:17}}>
                                            Price
                                        </Text>
                                        <Text style= {{padding:7, backgroundColor:"red",color:"#fff", borderRadius:7, fontWeight:"500"}}>
                                            {item.money}
                                        </Text>                                
                                    </View>
                                    {showBuy && 
                                        <BuyCoins
                                            visible = {showBuy}
                                            onClose = {closeModal} 
                                            item = {showItem} 
                                            handleBuyCoins = {handleBuyCoins}
                                        />
                                    }                                     
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
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
        marginTop:40
    },
    text: {
        color: "#000",
        fontWeight: "600",
        fontSize: 18,
        marginLeft: 5
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10,
    },
    coins:{
        marginLeft:"auto" ,
        marginRight: 0,
        padding: 5,
        flexDirection:"row",
        // backgroundColor: "#ddd"
    },
    borderBuyCoins:{
        margin: 20,
        backgroundColor:"#ddd",
        alignItems:"center",
        borderRadius: 10,
        borderWidth:1,
        borderColor:"#F75521",
    },

})