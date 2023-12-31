import { Video } from "expo-av"
import moment from "moment"
import { useState } from "react"
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"
import GetListFeels from "../comment/GetListFeels"
import SetFeel from "../comment/SetFeel"
import CommentPost from "../comment/CommentPost"

export default getPost = () => {
    const user = useSelector((state) => state.auth.login.currentUser)
    const post = useSelector((state) => state.post.is_post.post);
    console.log(post)

    const [showFeel, setShowFeel] = useState(false);
    const [showComment, setShowComment] = useState(false);

    const feel = parseInt(post.disappointed, 10) + parseInt(post.kudos, 10);

    const getFormattedTimeAgo = (createdAt) => {
        const now = moment();
        const postTime = moment(createdAt);
        const duration = moment.duration(now.diff(postTime));
      
        const years = duration.years();
        const months = duration.months();
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();
      
        if (years > 0) {
          return `${years} năm trước`;
        } else if (months > 0) {
          return `${months} tháng trước`;
        } else if (days > 0) {
          return `${days} ngày trước`;
        } else if (hours > 0) {
          return `${hours} giờ trước`;
        } else {
          return `${minutes} phút trước`;
        }
    };

    return(
        <View style = {styles.postItem}>
            <ScrollView>
                <View style = {{marginLeft: 10, marginRight: 10}}>
                    <View style = {styles.author}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: post.author.avatar || 'https://example.com/default-image.jpg'}}
                        />
                        <View>
                            <View style = {{width:250,}}>
                                {post.state == "" ? (
                                    <Text style = {{fontWeight: 600, fontSize: 17}}>
                                        {post.author.name}
                                    </Text>                            
                                ):(
                                    <Text style = {{}}>
                                        <Text style = {{fontWeight: 600, fontSize: 17,}}>
                                            {post.author.name}
                                        </Text> is feelling {post.state}
                                    </Text>                             
                                )}
                            </View>
                            <Text style = {{fontSize: 13, color: "#65676B"}}>{getFormattedTimeAgo(post.created)}</Text>                      
                        </View> 
                    </View>
                    {post.described ? (
                        <View style = {{ height:"auto"}}>
                            <Text 
                                style = {{
                                    fontWeight: 400,
                                    fontSize: 16,
                                    marginBottom: 7,
                                }}>
                                {post.described}
                            </Text>                        
                        </View>
                    ):('')}
                </View>
                {post.video && post.video.url ? (
                    <View>
                        <Video
                        source={{ uri: post.video.url }}
                        rate={1.0}
                        volume={0.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={{ width: "100%", height: 350 }}
                        />            
                    </View>
                    ) : (
                    <View>
                        {post.image.map((item) => {
                            return (
                                <View key={item.id} style={{marginBottom:0, borderBottomWidth:10, borderBottomColor:"#ccc"}}>
                                    <Image
                                        source={{
                                        uri: item.url,
                                        }}
                                        style={styles.picture}
                                    /> 
                                </View>
                            )
                        })}
                    
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
                <TouchableOpacity onPress={()=>setShowFeel(true)}>
                    <View style = {{flexDirection:"row", alignContent:"center", marginLeft: 30, position: 'relative',}}>
                        <Image
                            source={require('../../../assets/images/home/like-blue1.png')}
                            style = {{
                                width: 20, height:20, borderRadius: 15, 
                                borderColor:"#fff", borderWidth:2,
                                position: 'absolute',
                                left:-15,
                                zIndex:5,
                            }}
                        />
                        <Image
                            source={require('../../../assets/images/home/sad.png')}
                            style = {{width: 18, height:18, borderRadius: 10, }}
                        />
                        <Text style = {{paddingLeft: 5, color: "#65676B"}}>
                            {feel}
                        </Text>                     
                    </View>
                </TouchableOpacity>
                {showFeel && 
                    <GetListFeels
                        visible={showFeel}
                        onClose={() => setShowFeel(false)}
                        post_Id = {post.id}
                    />
                }
                <Text style = {{marginLeft: "50%", color: "#65676B"}}>
                    {/* {post.comment_mark} comments */}
                </Text>                
            </View>
            <View style = {{
                    flexDirection: 'row',
                    padding: 8,
                }}>
                
                <SetFeel
                    item={post}
                    // count = {count}
                />

                <View style ={{marginBottom:10}}>
                    <TouchableOpacity 
                        style = {{flexDirection: 'row',}}
                        onPress={() => setShowComment(true)}
                    >
                        <Image
                            source={require('../../../assets/images/home/comment.png')}
                            style = {{height: 30, width: 30, marginLeft: "40%",}}
                        />
                        <Text style = {{marginTop: 7, marginLeft: 7, color: "#65676B"}}>
                            Comment
                        </Text>                    
                    </TouchableOpacity>
                    {showComment && (
                    <CommentPost
                        visible={showComment}
                        onClose={() => setShowComment(false)}
                        post_Id = {post.id}
                    />                     
                    )}
                                
                </View>
            </View>                 
            </ScrollView>
           
        </View>
    )
}

const styles = StyleSheet.create({
    postItem: {
        flex:1,
        paddingTop: 10,
    },
    author: {
        flexDirection: 'row',
        marginBottom: 10
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10,
    },
    picture: {
        width: "100%",
        height: 500,
        overflow: "hidden",
    },

})