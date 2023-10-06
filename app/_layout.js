import { Stack } from "expo-router";
import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",

};

const Layout = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Medium': require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    'Poppins-SemiBold': require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  // return (
  //   <Stack initialRouteName="index">
  //     <Stack.Screen name="index" />
  //   </Stack>
  // )
  return <Stack 
    screenOptions={{
      headerTitle: '',
      headerStyle: {
          backgroundColor: '#f0f2f5',
          // marginHorizontal: 0,
      },
      headerTitleStyle: {
        marginLeft: 0,
        paddingLeft: 0,
      },
    }}
  />;
};

export default Layout;
