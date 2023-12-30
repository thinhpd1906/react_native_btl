import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Menu from "./menu";

export default Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const handleWatch = () => {
        router.push("homePage/getVideos/getVideos")
    }

    const handleHome = () =>{
        router.push('/homePage/home')
    }

    const handleNotifications = () => {
        router.push('notifications/notification')
    }

    const handleSearch = () => {
        router.push('search/Search')
    }
    return (
        <View style = {styles.navbar}>
            <TouchableOpacity onPress={handleHome}>
                <View style={styles.iconContainer}>
                    <Ionicons name="home" size={32} color="#333" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleWatch}>
                <View style={styles.iconContainer}>
                    <Ionicons name="tv" size={32} color="#333" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.iconContainer}>
                    <Ionicons name="people" size={32} color="#333" />
                </View>                    
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.iconContainer} onPress={handleSearch}>
                    <Ionicons name="search" size={32} color="#333" />
                </View>                    
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNotifications}>
                <View style={styles.iconContainer}>
                    <Ionicons name="notifications" size={32} color="#333" />
                </View>                    
            </TouchableOpacity>
            <View>
                <TouchableOpacity onPress={()=> setShowMenu(true)}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="menu" size={32} color="#333" />
                    </View>                     
                </TouchableOpacity>
                {showMenu && (
                    <Menu
                        visible={showMenu}
                        onClose={() => setShowMenu(false)}
                    />                         
                )} 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar:{
        flexDirection: "row", 
        paddingTop: 10, 
        paddingLeft: 20, 
        paddingRight:20,
        paddingBottom: 5, 
        justifyContent: "center",
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.7,
    },
    iconContainer:{
        paddingLeft: 15,
        paddingRight: 15,
    },
})