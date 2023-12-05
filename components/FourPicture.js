import { StyleSheet, View, Image, Dimensions } from "react-native";

export default function FourPicture({ selectedImages }) {
  return (
    <View style={styles.container}>
      <View style={styles.groupPicture1}>
        <Image source={{ uri: selectedImages[0] }} style={styles.picture1} />
      </View>
      <View style={styles.groupPicture2}>
        <Image source={{ uri: selectedImages[1] }} style={styles.picture2} />
        <Image source={{ uri: selectedImages[2] }} style={styles.picture3} />
        <Image source={{ uri: selectedImages[3] }} style={styles.picture4} />
      </View>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);
const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  groupPicture1: {
    width: 0.68 * SCREEN_WIDTH,
    // marginTop: 5,
    height: 340,
  },
  groupPicture2: {
    width: 0.29 * SCREEN_WIDTH,
    // marginTop: 5,
  },
  picture1: {
    marginRight: 0.01 * SCREEN_WIDTH,
    width: 0.702 * SCREEN_WIDTH,
    height: 339,
    overflow: "hidden",
  },
  picture2: {
    width: 0.29 * SCREEN_WIDTH,
    height: 111,
    overflow: "hidden",
    marginBottom: 3,
  },
  picture3: {
    width: 0.29 * SCREEN_WIDTH,
    height: 111,
    overflow: "hidden",
    marginBottom: 3,
  },
  picture4: {
    width: 0.29 * SCREEN_WIDTH,
    height: 111,
    overflow: "hidden",
  },
});
