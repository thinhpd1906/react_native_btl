import { Video } from "expo-av"
import moment from "moment";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CommentPost from "../comment/CommentPost";
import SetFeel from "../comment/SetFeel";
import GetListFeels from "../comment/GetListFeels";
import { BlurView } from "expo-blur";

export default getListVideos = ({item}) => {

    const [showComment, setShowComment] = useState(false);
    const [commentData, setCommentData] = useState([]);
    const [isFeel, setIsFeel] = useState('');
    const [shouldPlay, setShouldPlay] = useState(false);
    const [showFeel, setShowFeel] = useState(false);

    const handleFell = () => {
        console.log("like")
    }

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
        <View style = {{borderBottomWidth: 8, borderBottomColor: '#ddd',}}>
            <View style = {styles.author}>
                <Image
                    style={styles.avatar}
                    source={{ uri: item.author.avatar || 'https://example.com/default-image.jpg'}}
                />
                <View>
                    <View style = {{flexDirection:"row"}}>
                        <Text style = {{fontWeight: 600, fontSize: 20}}>
                            {item.author.name}
                        </Text>
                        {item.state == "" ? (
                            ""
                        ):(
                            <Text style = {{marginLeft: 5, marginTop:5}}>
                                is feeling {item.state}
                            </Text>                             
                        )}
                    </View>
                    <Text style = {{fontSize: 13, color: "#65676B"}}>{getFormattedTimeAgo(item.created)}</Text>                      
                </View>                
            </View>
            
            <TouchableOpacity onPress={() => {
                setShouldPlay(!shouldPlay);
              }}>
                {/* <BlurView
                    style={{ flex: 1 }}
                    intensity={50} // Điều chỉnh mức độ mờ, tăng giảm giá trị theo nhu cầu
                    tint="default"    // Chọn kiểu mờ, có thể là "light", "default", "dark"
                > */}
                    <Video
                    source={{ uri: item.video.url }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay = {shouldPlay}
                    isLooping = {false}
                    style={{ width: "100%", height: 450 ,}}
                    />                    
                {/* </BlurView> */}
 
                {!shouldPlay &&
                    <Image
                        source={require('../../../assets/images/home/play.png')}
                        style= {{
                            width:40, height:40, position: 'absolute', top:"45%" , left:"45%"
                        }}
                    />
                }           
            </TouchableOpacity>


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
                            {item.feel}
                        </Text>                     
                    </View>
                </TouchableOpacity>
                {showFeel && 
                    <GetListFeels
                        visible={showFeel}
                        onClose={() => setShowFeel(false)}
                        post_Id = {item.id}
                    />
                }
                <Text style = {{marginLeft: "50%", color: "#65676B"}}>
                    {item.comment_mark} comments
                </Text>                
            </View>

            <View style = {{
                    flexDirection: 'row',
                    padding: 8,
                }}>
                <SetFeel
                    item={item}
                    // count = {count}
                />
                    <View>
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
                        comments={commentData}
                        post_Id = {item.id}
                    />                     
                    )}
                                
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    author: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 10,
      
    },
})